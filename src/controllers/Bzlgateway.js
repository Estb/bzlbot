const crypto = require('crypto');
const moment = require('moment');
const https = require('https');
const axios = require("axios");


exports.createTransaction = (options) =>{

  return new Promise((resolve, reject) => {
      options = [options]
      options[0]['pubkey'] = pubkey;

      const hmac = crypto.createHmac('sha512', privkey);
      const result = JSON.stringify(options[0]);
      hmac.update(result);
      const signature = hmac.digest('hex');

      var config = {
        headers: {
          'Content-Type': 'application/json',
          'signature':signature
        }
      };
     resolve ( axios.post('http://localhost/api/v1/transactions', options[0],config))
  })
}

