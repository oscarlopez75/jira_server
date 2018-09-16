var fs = require('fs');
const readFilters = require('../modules/readFilters');
const findIssues = require('../modules/find_issues');
const sendEmails = require('./sendEmail').getRecords;

function startAll(){
  readFilters.getFilters('../files/weekIssues.txt')
    .then(data => {
      findIssues.getIssues(data)
        .then(result => {
          // console.log(result.prod);
          sendEmails(result)
            .then(message => {
              console.log(message);
            })
            .catch(err => {

            })
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })
}

startAll();
