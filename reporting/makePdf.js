const fs = require('fs');
const PDF = require('pdfkit');
const convertDate = require('../modules/convertTime').convertWithHour;
const convertToHours = require('../modules/convertTime').convertToHours;


let doc = new PDF();

let emergency = [];
let critical = [];
let major = [];
let medium = [];
let low = [];


let open = [];
let inProgress = [];
let resolved = [];
let closed = [];
let inCodeReview = [];
let inQa = [];
let readyQa = [];
let reopen = [];
let blocked = [];



function buildIt(data){
  return new Promise((resolve, reject) => {
    // console.log(data.prod);
    let totalIssues = data.prod.length;

    doc.pipe(fs.createWriteStream('./week_report.pdf'));

    doc.image('./real.png', {align: 'center', width: 500});

    doc.fontSize(25);
    doc.moveDown();
    doc.text('Weekly report of the issues created', {align: 'center'});

    doc.fontSize(20);
    doc.moveDown();
    doc.text(convertDate(new Date()), {align: 'center'});

    doc.fontSize(20);
    if(totalIssues ===1){
      doc.moveDown()
      doc.text('This week there was ' + totalIssues + ' jira case created', {align: 'center'});
    }else{
      doc.moveDown()
      doc.text('This week there were ' + totalIssues + ' jira cases created', {align: 'center'});
    }

    for(let i = 0; i < data.prod.length; i++){
      // console.log(data.prod[i]);
      doPriority(data.prod[i]);
      doStatus(data.prod[i]);

    }


    // doc.text('-----------------------------------------------', {align: 'center'});

    // # draw bounding rectangle
    // doc.rect(doc.x, 290, 510, doc.y).stroke()
    doc.lineJoin('round')
      .rect(140, 390, 350, 250)
      .stroke()

    doc.lineJoin('round')
      .rect(120, 370, 390, 293)
      .stroke()

    doc.fontSize(25);
    // doc.text('Emergency cases = ' + emergency.length, {align: 'center'});
    // doc.text('Critical cases = ' + critical.length, {align: 'center'});
    // doc.text('Major cases = ' + major.length, {align: 'center'});
    // doc.text('Medium cases = ' + medium.length, {align: 'center'});
    // doc.text('Low cases = ' + low.length, {align: 'center'});
    doc.text(emergency.length, 200,410);
    doc.text('Emergency cases', 240, 410);
    doc.text(critical.length, 200, 450);
    doc.text('Critical cases', 240, 450);
    doc.text(major.length, 200, 490);
    doc.text('Major cases', 240, 490);
    doc.text(medium.length, 200, 530);
    doc.text('Medium cases', 240, 530);
    doc.text(low.length, 200, 570);
    doc.text('Low cases', 240, 570);

    doc.addPage()

    doc.fontSize(35);
    doc.text('Details:', {align: 'center'});

    doc.fontSize(20);
    if(open.length > 0){
      if(open.length == 1){
        doc.text(open.length + ' case created this last week is still open', {align: 'left'});
      }else{
        doc.text(open.length + ' cases created this last week are still open ', {align: 'left'});
      }
    }
    if(inProgress.length > 0){
      if(inProgress.length == 1){
        doc.text(inProgress.length + ' case In Progress', {align: 'left'});
      }else{
        doc.text(inProgress.length + ' cases In Progress', {align: 'left'});
      }
    }
    if(resolved.length > 0){
      if(resolved.length == 1){
        doc.text(resolved.length + ' case resolved but not closed', {align: 'left'});
      }else{
        doc.text(resolved.length + ' cases resolved but not closed', {align: 'left'});
      }
    }
    if(closed.length > 0){
      if(closed.length == 1){
        doc.text(closed.length + ' case closed', {align: 'left'});
      }else{
        doc.text(closed.length + ' cases closed', {align: 'left'});
      }

    }
    if(inCodeReview.length > 0){
      if(inCodeReview == 1){
        doc.text(inCodeReview.length + ' case In code review', {align: 'left'});
      }else{
        doc.text(inCodeReview.length + ' cases In code review', {align: 'left'});
      }

    }
    if(inQa.length > 0){
      if(inQa.length == 1){
        doc.text(inQa.length + ' case in QA', {align: 'left'});
      }else{
        doc.text(inQa.length + ' cases in QA', {align: 'left'});
      }

    }
    if(readyQa.length > 0){
      if(readyQa.length == 1){
        doc.text(readyQa.length + ' case ready for QA', {align: 'left'});
      }else{
        doc.text(readyQa.length + ' cases ready for QA', {align: 'left'});
      }

    }
    if(reopen.length > 0){
      if(reopen.length == 1){
        doc.text(reopen.length + ' case reopened', {align: 'left'});
      }else{
        doc.text(reopen.length + ' cases reopened', {align: 'left'});
      }

    }
    if(blocked.length > 0){
      if(blocked.length == 1){
        doc.text(blocked.length + ' case blocked', {align: 'left'});
      }else{
        doc.text(blocked.length + ' cases blocked', {align: 'left'});
      }

    }


    doEmergency();
    doCritical();
    doMajor();
    doMedium();
    doLow();



    doc.end();
    resolve();
  });
}

function doPriority(data){
  if(data.priority === "Emergency"){
    emergency.push(data);
  }
  if(data.priority === "Critical"){
    critical.push(data);
  }
  if(data.priority === "Major"){
    major.push(data);
  }
  if(data.priority === "Medium"){
    medium.push(data);
  }
  if(data.priority === "Low"){
    low.push(data);
  }
}

function doStatus(data){
  if(data.status === "Open"){
    open.push(data);
  }

  if(data.status === "In Progress"){
    inProgress.push(data);
  }

  if(data.status === "Resolved"){
    resolved.push(data);
  }

  if(data.status === "Closed"){
    closed.push(data);
  }

  if(data.status === "In Code Review"){
    inCodeReview.push(data);
  }

  if(data.status === "in QA"){
    inQa.push(data);
  }

  if(data.status === "Ready for QA"){
    readyQa.push(data);
  }

  if(data.status === "Reopen"){
    reopen.push(data);
  }

  if(data.status === "Blocked"){
    blocked.push(data);
  }


}


function doEmergency(){
  // console.log(emergency);
  if(emergency.length > 0){
    doc.fontSize(20);
    doc.fillColor('red');
    if(emergency.length === 1){
      doc.moveDown()
      doc.text(emergency.length + ' Emergency case created:', {align: 'center'});
    }else{
      doc.moveDown()
      doc.text(emergency.length + ' Emergency cases created:', {align: 'center'});
    }

    for(let i = 0; i < emergency.length; i++){
      doc.moveDown();
      doc.fontSize(18);
      doc.fillColor('black');
      doc.text('Case ' + (i + 1) + ":")
      doc.fontSize(15);
      doc.text(emergency[i].summary , {align: 'left'});
      doc.fontSize(10);
      doc.moveDown()
      doc.fillColor('blue');
      doc.text(emergency[i].link , {align: 'left'});
      doc.fillColor('black');
      doc.text('Created on ' + convertDate(emergency[i].created) , {align: 'left'});
      doc.text('Updated on ' + convertDate(emergency[i].updated) , {align: 'left'});
      doc.text('Currently assigned to ' + emergency[i].assignee + ' Email: ' + emergency[i].assigneeEmail, {align: 'left'});
      doc.text('Reported by ' + emergency[i].reporter + ' Email: ' + emergency[i].reporterEmail, {align: 'left'});
      doc.moveDown()
      doc.fontSize(15);
      if(emergency[i].status != 'Closed'){
        doc.text('Current Status ' + emergency[i].status + " (Created " + convertToHours(emergency[i].created) + ")", {align: 'left'});
      }else{
        doc.text('Current Status ' + emergency[i].status, {align: 'left'});
      }


    }
  }

}


function doCritical(){
  // console.log(critical);
  if(critical.length > 0){
    doc.fontSize(20);
    doc.fillColor('orange');
    if(critical.length === 1){
      doc.moveDown()
      doc.text(critical.length + ' critical case created:', {align: 'center'});
    }else{
      doc.moveDown()
      doc.text(critical.length + ' critical cases created:', {align: 'center'});
    }

    for(let i = 0; i < critical.length; i++){
      doc.moveDown();
      doc.fontSize(18);
      doc.fillColor('black');
      doc.text('Case ' + (i + 1) + ":")
      doc.fontSize(15);
      doc.text(critical[i].summary , {align: 'left'});
      doc.fontSize(10);
      doc.moveDown()
      doc.fillColor('blue');
      doc.text(critical[i].link , {align: 'left'});
      doc.fillColor('black');
      doc.text('Created on ' + convertDate(critical[i].created) , {align: 'left'});
      doc.text('Updated on ' + convertDate(critical[i].updated) , {align: 'left'});
      doc.text('Currently assigned to ' + critical[i].assignee + ' Email: ' + critical[i].assigneeEmail, {align: 'left'});
      doc.text('Reported by ' + critical[i].reporter + ' Email: ' + critical[i].reporterEmail, {align: 'left'});
      doc.moveDown()
      doc.fontSize(15);
      if(critical[i].status != 'Closed'){
        doc.text('Current Status ' + critical[i].status + " (Created " + convertToHours(critical[i].created) + ")" , {align: 'left'});
      }else{
        doc.text('Current Status ' + critical[i].status, {align: 'left'});
      }


    }
  }

}

function doMajor(){
  // console.log(major);
  if(major.length > 0){
    doc.fontSize(20);
    doc.fillColor('yellow');
    if(major.length === 1){
      doc.moveDown()
      doc.text(major.length + ' major case created:', {align: 'center'});
    }else{
      doc.moveDown()
      doc.text(major.length + ' major cases created:', {align: 'center'});
    }

    for(let i = 0; i < major.length; i++){
      doc.moveDown();
      doc.fontSize(18);
      doc.fillColor('black');
      doc.text('Case ' + (i + 1) + ":")
      doc.fontSize(15);
      doc.text(major[i].summary , {align: 'left'});
      doc.fontSize(10);
      doc.moveDown()
      doc.fillColor('blue');
      doc.text(major[i].link , {align: 'left'});
      doc.fillColor('black');
      doc.text('Created on ' + convertDate(major[i].created) , {align: 'left'});
      doc.text('Updated on ' + convertDate(major[i].updated) , {align: 'left'});
      doc.text('Currently assigned to ' + major[i].assignee + ' Email: ' + major[i].assigneeEmail, {align: 'left'});
      doc.text('Reported by ' + major[i].reporter + ' Email: ' + major[i].reporterEmail, {align: 'left'});
      doc.moveDown()
      doc.fontSize(15);
      if(major[i].status != 'Closed'){
        doc.text('Current Status ' + major[i].status + " (Created " + convertToHours(major[i].created) + ")" , {align: 'left'});
      }else{
        doc.text('Current Status ' + major[i].status, {align: 'left'});
      }


    }
  }

}

function doMedium(){
  // console.log(medium);
  if(medium.length > 0){
    doc.fontSize(20);
    doc.fillColor('brown');
    if(medium.length === 1){
      doc.moveDown()
      doc.text(medium.length + ' medium case created:', {align: 'center'});
    }else{
      doc.moveDown()
      doc.text(medium.length + ' medium cases created:', {align: 'center'});
    }

    for(let i = 0; i < medium.length; i++){
      doc.moveDown();
      doc.fontSize(18);
      doc.fillColor('black');
      doc.text('Case ' + (i + 1) + ":")
      doc.fontSize(15);
      doc.text(medium[i].summary , {align: 'left'});
      doc.fontSize(10);
      doc.moveDown()
      doc.fillColor('blue');
      doc.text(medium[i].link , {align: 'left'});
      doc.fillColor('black');
      doc.text('Created on ' + convertDate(medium[i].created) , {align: 'left'});
      doc.text('Updated on ' + convertDate(medium[i].updated) , {align: 'left'});
      doc.text('Currently assigned to ' + medium[i].assignee + ' Email: ' + medium[i].assigneeEmail, {align: 'left'});
      doc.text('Reported by ' + medium[i].reporter + ' Email: ' + medium[i].reporterEmail, {align: 'left'});
      doc.moveDown()
      doc.fontSize(15);
      if(medium[i].status != 'Closed'){
        doc.text('Current Status ' + medium[i].status + " (Created " + convertToHours(medium[i].created) + ")" , {align: 'left'});
      }else{
        doc.text('Current Status ' + medium[i].status, {align: 'left'});
      }


    }
  }

}

function doLow(){
  // console.log(low);
  if(low.length > 0){
    doc.fontSize(20);
    doc.fillColor('purple');
    if(low.length === 1){
      doc.moveDown()
      doc.text(low.length + ' low case created:', {align: 'center'});
    }else{
      doc.moveDown()
      doc.text(low.length + ' low cases created:', {align: 'center'});
    }

    for(let i = 0; i < low.length; i++){
      doc.moveDown();
      doc.fontSize(18);
      doc.fillColor('black');
      doc.text('Case ' + (i + 1) + ":")
      doc.fontSize(15);
      doc.text(low[i].summary , {align: 'left'});
      doc.fontSize(10);
      doc.moveDown()
      doc.fillColor('blue');
      doc.text(low[i].link , {align: 'left'});
      doc.fillColor('black');
      doc.text('Created on ' + convertDate(low[i].created) , {align: 'left'});
      doc.text('Updated on ' + convertDate(low[i].updated) , {align: 'left'});
      doc.text('Currently assigned to ' + low[i].assignee + ' Email: ' + low[i].assigneeEmail, {align: 'left'});
      doc.text('Reported by ' + low[i].reporter + ' Email: ' + low[i].reporterEmail, {align: 'left'});
      doc.moveDown()
      doc.fontSize(15);
      if(low[i].status != 'Closed'){
        doc.text('Current Status ' + low[i].status + " (Created " + convertToHours(low[i].created) + ")" , {align: 'left'});
      }else{
        doc.text('Current Status ' + low[i].status, {align: 'left'});
      }


    }
  }

}



module.exports.buildIt = buildIt;
