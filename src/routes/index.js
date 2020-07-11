const Express = require('express');
const Router = Express.Router();
const Transaction = require('../Controllers/Transaction');
const Hmac = require('../Controllers/index');



Router.post('/v1/transaction', Transaction.createTx);


Router.post('/v1/ipn', Hmac.verifyHmac, Transaction.atualizaTx);



module.exports = Router