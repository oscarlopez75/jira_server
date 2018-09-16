const axios = require('axios');
// var Base64 = require('js-base64').Base64;


var verifyToken = function(token){
  return new Promise((resolve, reject) => {

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Authorization": token
      }
    }

    let linkToSearch = 'http://localhost:8080/login/checkToken'

    axios.get(linkToSearch,axiosConfig)
    .then(posts => {
      // var payLoadUrl = token.split('.')[1];
      // var payLoadBase64 = payLoadUrl.replace('-', '+').replace('_', '/');
      // var payLoad = JSON.parse(Base64.decode(payLoadBase64));
      // console.log(payLoad);
      // console.log(posts.data);
      resolve(posts.data)
    })
    .catch(err =>{
      // console.log(err.response.data.error.userMessage);
      reject(err.response.data.error.userMessage)
    })


  });
}


module.exports.verifyToken = verifyToken;
