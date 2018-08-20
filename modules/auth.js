var jwt = require('jsonwebtoken');


// var checkToken = function(token, callback){
//   try {
//     jwt.verify(token, process.env.JWT_SECRET, function(error, decoded){
//         if(error){
//           callback(error.message, false);
//         }else{
//           callback(decoded, true);
//         }
//     });
//   } catch (err) {
//     callback("Error verifying the token", false);
//   }
// };

var checkToken = function(token){  
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET, function(error, decoded){
          if(error){
            reject(error.message);
          }else{
            resolve(decoded);
          }
      });
    } catch (err) {
      reject("Error verifying the token");
    }
  });
}
module.exports.checkToken = checkToken;
