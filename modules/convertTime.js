
var dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function convertWithHour(date){
  let dateMili = new Date(date);
  let dayOfWeek = dayArray[dateMili.getUTCDay()];
  let day = dateMili.getUTCDate();
  let dayString = "";
  let month = monthArray[dateMili.getUTCMonth()];
  let year = dateMili.getFullYear();
  let hour = dateMili.getUTCHours();
  let hourString = "";
  let minute = dateMili.getUTCMinutes();
  let minuteString = "";

  if(day < 10){
    dayString = "0" + day;
  }else{
    dayString = day;
  }

  if(hour < 10){
    hourString = "0" + hour;
  }else{
    hourString = hour;
  }

  if(minute < 10){
    minuteString = "0" + minute;
  }else{
    minuteString = minute;
  }

  let coolDate = dayOfWeek + " " + dayString + " of " + month + " " + year + " at " + hourString + ":" + minuteString;

  return coolDate;


}

function convertToHours(date){
  let updatedLast = Date.parse(date);
  let today = new Date();
  let todayToGMT = today.toUTCString();
  let todayGmt = Date.parse(todayToGMT);
  let s = todayGmt - updatedLast;
  // console.log(updatedLast + " " + today + " " + diff)

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

  if(hrs < 48){
    return hrs + " hours ago";
  }else{
    return Math.trunc(hrs/24) + " days ago";
  }


}




module.exports.convertWithHour = convertWithHour;
module.exports.convertToHours = convertToHours;
