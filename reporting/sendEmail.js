const buildPdf = require('./makePdf').buildIt;

let header1 = "";

function getRecords(data){
  // console.log(data);
  return new Promise((resolve, reject) => {
    buildPdf(data)
      .then(() => {
        sendEmail()
          .then(() => {
            resolve('All emails sent, feature not yet activated');
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  });

}

function sendEmail() {
  return new Promise((res, rej) => {
    console.log('Sending emails, feature not yet activated');
    res();
  });


}

module.exports.getRecords = getRecords;
