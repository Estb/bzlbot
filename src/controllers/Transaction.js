const bot = require ('../Controllers/Bot');
const bzlgateway = require ('../Controllers/Bzlgateway');
const transactionsModels = require('../Models/Transaction');

exports.createTx = (req, res, next ) => {

  const amountUsd = req.body.amountUsd
  const amountBzl = req.body.amountBzl
  const bzlAddress = req.body.bzlAddress
  const currency1 = req.body.currency1
  const currency2 = req.body.currency2
  const buyer_email = req.body.buyer_email
  const telegramId = req.body.buyer_telegram_id
  const item_name = req.body.item_name
  const item_number = req.body.item_number
  const custom = req.body.custom
  const invoice = req.body.invoice

 if (amountUsd > 0 || !currency1 || !currency2 || telegramId) {
  
    options = {
      currency1:currency1,
      currency2: currency2,
      amount:amountUsd,
      buyer_email:buyer_email,
      buyer_name:telegramId,
      item_name:item_name,
      item_number:item_number,
      invoice:invoice,
      custom:custom
    }
        
    bzlgateway.createTransaction(options)
    .then((trx)=>{
      if(trx.data){
        const  amounttopay = trx.data.amount
        const  gateway_txn_id = trx.data.txn_id
        const  addresstopay = trx.data.address
        const  confirms_needed = trx.data.confirms_needed
        const  timeout = trx.data.timeout
        
        transactionsModels.create({
          amountUsd : amountUsd,
          amountBzl: amountBzl,
          bzlAddress : bzlAddress,
          currency1 : currency1,
          currency2 : currency2,
          item_name : item_name,
          item_number : item_number,
          custom : custom,
          invoice : invoice,
          buyer_email : buyer_email,
          telegramId : telegramId,
          gateway_txn_id  : gateway_txn_id,
          addresstopay : addresstopay,
          amounttopay : amounttopay,
          confirms_needed : confirms_needed,
          timeout : timeout
          })
          .then((transaction)=>{
            const id = transaction.id;
            if (transaction) {
                  res.status(201).send({id:id, addresstopay:addresstopay, amounttopay:amounttopay, cointopay:currency2, confirms_needed:confirms_needed, timeout:timeout , statusCode: 201});
                } else {
                  res.status(500).send({sucess: false, message: 'We had an error saving the registry, please try again.' , statusCode: 500})
                }
              })
          .catch (error => next (error))
      } else {
        res.status(500).send({sucess: false, message: 'We had an error saving the registry, please try again.' , statusCode: 500})
      }
    })
    .catch((error) => next(error))
  } else {
    res.status(500).send({sucess: false, message: 'Amount, currency1 y currency2 they are required and cannot be empty' , statusCode: 500})
  }
}


exports.atualizaTx = (req, res, next) => {

if(req.body.gateway_txn_id && req.body.status) {

  const gateway_txn_id = req.body.gateway_txn_id
  const status = req.body.status

  transactionsModels.findOne({gateway_txn_id, where: {gateway_txn_id:gateway_txn_id}})
  .then(tx => {
    if(tx) {
      if(tx.dataValues.send==0 && tx.dataValues.status==0 && tx.gateway_txn_id==req.body.gateway_txn_id && tx.amounttopay ==req.body.amounttopay){
      transactionsModels.update(
        {
           status : req.body.status
        },
        {where: {gateway_txn_id:gateway_txn_id}}
      )
      .then((update) =>{
        if(update){
          if(req.body.status ==100) {
          var  options = {
              to: {
                address:tx.bzlAddress,
                amount: tx.amountBzl
              }
            }
          bot.sendBzlToClient(options)
          .then( (a) => {
            if(a) {
            const txid = a.data.transactionHash
            transactionsModels.update(
              {
                send : 1,
                txid : txid
              },
              {where: {txn_id:txn_id}}
            )
            .then( () => {
              bot.notifyClient(options)
            })
            .catch((error) => next(error))
          } else {
            return next(new Error(`Error sending BZl`));
          }
          })
          .catch((error) => next(error))
        } else if (req.body.status ==-1) {
          bot.notifyClient(options)
          .then( () => next() )
          .catch((error) => next(error))
        } else {
          next() 
        }
      }
      })
      .catch(error => next(error)) 
    } else {
      return next(new Error(`Invalid request`));
    }
  } else {
    console.log("txn_id dont match")
    return next(new Error(`Invalid request`));
  }
  })
  .catch(error => next(error))
  } else {
    return next(new Error(`datos mismistake`));
  }
}
