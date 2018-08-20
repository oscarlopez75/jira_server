const sendEmail = require('./send_email');


var date = new Date().toISOString();

var processRecords = function(data){
  return new Promise((resolve, reject) => {
    let issues = Object.keys(data);

    for(var x = 0; x < issues.length; x++){
      for(var t = 0; t < data[issues[x]].length; t++){
        let info = {
          "summary": data[issues[x]][t].summary,
          "link": data[issues[x]][t].link,
          "lastUpdated": data[issues[x]][t].lastUpdated,
          "assignee": data[issues[x]][t].assignee,
          "assigneeEmail": data[issues[x]][t].assigneeEmail,
          "reporter": data[issues[x]][t].reporter,
          "reporterEmail": data[issues[x]][t].reporterEmail
        }
        // console.log(issues[x]);
        sendEmail.sendEmail(info);
        // console.log(info);
        // forkedEmails.send(info);
      }
    }
    console.log('Email sent to all parties');
    
    msg = '\nProcessed on ' + date + " for " + issues;
    resolve(msg);
  });
}


module.exports.processRecords = processRecords;
