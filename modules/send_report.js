var fs = require('fs');
const requestJira = require('./requestJira');

var sendReport = function(data){
  return new Promise(async (resolve, reject) => {
    let filters = Object.keys(data);
    let i = 0;
    let report = [];

    for(i = 0; i < filters.length; i++){
      filterNumber = filters[i];
      filterName = data[filterNumber].name;
      filterLink = data[filterNumber].link;
      //console.log(filterName + " " + filterLink);
      await requestJira.getJiraResults(filterNumber, filterName)
        .then(result => {
          // console.log(filterName + " " + filterLink + " has " + result.amount);
        let reportIssue = {filterName: filterName, filterLink: filterLink, filterAmount: result.amount}
        report.push(reportIssue);
        })
        .catch(err => {
          console.log(err);
        })

    }
    sendReport2(report)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })

  });
}

var sendReport2 = async function(dataArray){
  return new Promise(async(resolve, reject) => {
    for(var x = 0; x < dataArray.length; x++){
      let body = "";
      body = "\n************** " + dataArray[x].filterName + " ***********************\n";
      body = body + dataArray[x].filterLink + "\n";
      body = body + "Has " + dataArray[x].filterAmount + " overdue issues that need to be handled\n";
      await writeBody(body)
        .then()
        .catch(err =>{
          console.log(err);
          reject(err);
        })
    }
    resolve()
  });
}



function writeBody(body){
  return new Promise((resolve) => {
    fs.appendFile('../files/report.txt', body, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve();
    });
  });
}



module.exports.sendReport = sendReport;
