var fs = require('fs');
const readFilters = require('../modules/readFilters');
const findIssues = require('../modules/find_issues');
const processRecords = require('../modules/reminders_process_records').processRecords;
const sendReport = require('../modules/send_report').sendReport;

async function cleanFiles(){
  console.log('Cleaning files');
  await cleanFile('../files/emails.txt')
    .then(async () => {
      await cleanFile('../files/report.txt')
        .then(() =>{
          getFilters();
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })


}



function cleanFile(file){
  return new Promise((resolve, reject) => {

    if (fs.existsSync(file)) {
      fs.unlink(file, function (err) {
        if (err) {
          console.log(err);
          reject();
        }else {
          console.log("File " + file + " deleted");
          resolve();
        }
      });
    }else {
      resolve();
    }

  });
}

function getFilters(){
  readFilters.getFilters('../files/reminders_who.txt')
    .then(data => {
      findIssues.getIssues(data)
        .then(result => {                                      //we get all the issues for each filter
          processRecords(result)
            .then(message => {
              fs.appendFile('../files/reminders.txt', message, function (err) {
                if (err) throw err;
                // console.log('Saved!');
              });
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })
        sendReport(data);
    })
    .catch(err => {
      console.log(err);
    })
}


cleanFiles();
