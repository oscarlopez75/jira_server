const requestJira = require('./requestJira');

var results = {};
var counter = 0;


var getIssues = function(data){  
  let filters = Object.keys(data);
  let i = 0;
  counter = 0;

  return new Promise((resolve, reject) => {
    for(i = 0; i < filters.length; i++){

      filterNumber = filters[i];
      filterName = data[filterNumber].name;
      filterLink = data[filterNumber].link;
      filterHours = data[filterNumber].hours;

      getByFilter(filterNumber,filterName, filterHours, filters.length)
        .then(() => {
          // console.log('Done finding issues');
          resolve(results);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
    }
  });
}

//******************************************************************************************************************
function getByFilter(filterNumber, filterName, filterHours, total) {

  return new Promise(async(resolve, reject) =>{
    await requestJira.getJiraResults(filterNumber, filterName)
      .then((result) => {
        counter = counter + 1;
        // console.log('xx' + filterNumber + " " + filterName + " counter: " + counter + " total: " + total);
        processRec(result, filterNumber, filterName, filterHours);
        if(counter >= total){
          // console.log('count == total');
          resolve()
        }
      })
      .catch((err) => {
        console.log(err);
      })
  });

}

function processRec(result, filterNumber, filterName, filterHours){

  let issueLink = 'https://jira.realtimegaming.com/browse/'
  let date = new Date().toISOString();
  var itemObject = [];
  var assignee = "";
  var assigneeEmail = "";

  for(i = 0; i < result.amount; i++){
    // console.log(filterName + " " + filterHours + " " + issueLink + result.issues[i].key + " " + result.issues[i].fields.summary);
    // console.log(filterName + " " + filterHours + " " + " " + issueLink + result.issues[i].key + " " + result.issues[i].fields.summary);
    // console.log(result.issues[i].fields.summary + " " + result.issues[i].fields.created + " // " + date);


    // console.log(msToTime(diff) + " " + filterHours);
    // console.log(filterName + " " + result.issues[i].fields.updated + " " + date);
    // console.log(result.issues[i].fields.summary + " " + msToTime(diff));

    try{
      assignee = result.issues[i].fields.assignee.name;
    }catch(err){
      assignee = 'Unassigned'
    }

    try{
      assigneeEmail = result.issues[i].fields.assignee.emailAddress;
    }catch (err){
      assigneeEmail = 'oguerrero@techona.com'
    }


    itemObject.push({
      summary: result.issues[i].fields.summary,
      link: issueLink + result.issues[i].key,
      lastUpdated: result.issues[i].fields.updated,
      assignee: assignee,
      assigneeEmail: assigneeEmail,
      reporter: result.issues[i].fields.reporter.name,
      reporterEmail: result.issues[i].fields.reporter.emailAddress
    });

  }
  // console.log(filterNumber + " " + filterName);
  results[filterName] = itemObject;



}

function msToTime(s) {

  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 5;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) //+ ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}

//******************************************************************************************************************


module.exports.getIssues = getIssues;
