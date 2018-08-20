const axios = require('axios');
require('dotenv').config({path: '../files/.env'})


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


var getJiraResults = function(filterNumber, filterName){
  // console.log(filterNumber + " " + filterName);
  return new Promise((resolve, reject) => {
    //**************************************get the information from Jira *********************************************************************************
    var username = process.env.USER2;
    var password = process.env.PASSWORD2;

    var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Authorization": auth
      }
    }
    var linkToSearch = 'https://jira.realtimegaming.com/rest/api/2/search?jql=filter=' + filterNumber + '&maxResults=1000'
    // console.log(linkToSearch);
    // axios.get("https://jira.realtimegaming.com/rest/api/latest/search?fields=key&maxResults=5000&jql=filter=" + filterNumber,axiosConfig)
    axios.get(linkToSearch,axiosConfig)
    .then(posts => {
      //res.status(200).json(posts.data);
      // console.log(posts.data);
      //*************************************************************************************************
      //if you need the reporter and assignee from issues array fields.assignee.name or fields.reporter.name
      var objectJson = {'number': filterNumber, 'name': filterName, 'amount': posts.data.total, 'issues': posts.data.issues};
      resolve(objectJson);
    })
    .catch((err) => {
      // console.log(err);
      //res.status(500).send(err);
      reject(err);
    })
    //**************************************get the information from Jira *********************************************************************************
  });

}

// var getJiraResults2 = function(){
//   var username = process.env.USER2;
//   var password = process.env.PASSWORD2;
//   //console.log('por aqui');
//   var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
//
//   let axiosConfig = {
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "Accept": "application/json",
//       "Authorization": auth
//     }
//   }
//   //https://jira.realtimegaming.com/rest/api/2/search?jql=filter%3D11983&maxResults=1000
//   var linkToSearch = 'https://jira.realtimegaming.com/rest/api/2/search?jql=filter=' + filterNumber + '&maxResults=1000'
//   axios.get(linkToSearch,axiosConfig)
//   .then(posts => {
//     //res.status(200).json(posts.data);
//     console.log(posts.data.issues[0].fields.assignee.displayName);
//     console.log(posts.data.issues[1].fields.assignee.displayName);
//     console.log(posts.data.issues[2].fields.assignee.displayName);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }

module.exports.getJiraResults = getJiraResults;
