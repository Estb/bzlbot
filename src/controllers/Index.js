const crypto = require('crypto');


exports.verifyHmac = (req, res, next) => {
  
  const pubkey = req.body.pubkey
  const sign = req.headers['signature']

  if(pubkey==pub){
      const secret_key = priv
      const hmac = crypto.createHmac('sha512', secret_key)
      const result = JSON.stringify(req.body)
      hmac.update(result)
      const signature = hmac.digest('hex')

      if(signature != sign) {
        return res.status(401).send({ auth: false, message: 'Failed to authenticate HMAC.1' })
      } else {
      next()
      }
    } else {
      res.status(401).send({ auth: false, message: 'Failed to authenticate HMAC.2' })
  }
}