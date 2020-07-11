const axios = require("axios");
const bot = require("../controllers/Bot.js")


loginApi = () =>{
  return new Promise((resolve, reject) => {
    options = {
        email:"email" ,
        password: "passw"
    };

    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
   resolve (axios.post('http://localhost/v1/users/auth', options,config))
  })
}

exports.sendBzlToClient = (options) => {
  
  return new Promise((resolve, reject) => {
    options = [options]
    options[0]['from'] = "BMZYgSy2qiiT91aPsmh2ZfSQH3tQuHHHZs";
    console.log(options[0])
     loginApi()
     .then((auth)=>{
      const token = auth.data.token
      var config = {
        headers: {
          'Authorization':`Bearer ${ token }`,
          'Content-Type': 'application/json'
        }
      };
      resolve ( axios.post('http://localhost/v1/transactions', options[0],config)
      .catch(err => {
        throw new Error(err);
      }))
    })
  })
}


exports.notifyClient = (options) => {


}