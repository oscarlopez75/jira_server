const requestJira = require('./requestJira');

function processReport(data){
  return new Promise(async (resolve, reject) => {
    let filters = Object.keys(data);
    let i = 0;
    let report = [];
    let reportJson = {};

    for(i = 0; i < filters.length; i++){
      filterNumber = filters[i];
      filterName = data[filterNumber].name;
      filterLink = data[filterNumber].link;
      filterHours = data[filterNumber].hours;
      // console.log(filterNumber + " " + filterName);
      await requestJira.getJiraResults(filterNumber, filterName)
        .then(result => {
        // console.log(filterName + " " + filterLink + " has " + result.amount);
        let reportIssue = {filterName: filterName, filterLink: filterLink, filterAmount: result.amount, filterHours: filterHours, filterNumber: filterNumber};
        report.push(reportIssue);
        })
        .catch(err => {
          console.log('err');
        })

    }
    // console.log(report);
    reportJson['report'] = report;
    resolve(reportJson);
  });
}

module.exports.processReport = processReport;
