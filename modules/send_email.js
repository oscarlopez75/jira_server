var fs = require('fs');


//We send an email to everone
var sendEmail = function (data){
  // console.log(data);
  let emailText = data.summary + " " + data.link + " emails to: " + data.assigneeEmail + " and " + data.reporterEmail + "\n";

  fs.appendFile('../files/emails.txt', emailText, function (err) {
    if (err) throw err;
  });


}


module.exports.sendEmail = sendEmail;
