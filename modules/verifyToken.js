const axios = require('axios');


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
      resolve(posts.data)
    })
    .catch(err =>{
      // console.log(err.response.data.error.userMessage);
      reject(err.response.data.error.userMessage)
    })


  });
}


module.exports.verifyToken = verifyToken;
