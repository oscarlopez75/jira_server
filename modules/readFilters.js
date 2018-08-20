
var fs = require('fs');
var lineReader = require('line-reader');




var getFilters = function(file){  
  var filters = [];
  var jsonFilters = {};
  return new Promise((resolve, reject) => {
    try{
      lineReader.eachLine(file, function(line, last) {
        filters.push(line.split(','));
        // do whatever you want with line...
        if(last){
          // or check if it's the last one
          for(i = 0; i < filters.length; i++){
            // console.log(filters[i][0]);
            // console.log(filters[i][1]);
            jsonFilters[filters[i][0]] = {'name': filters[i][1], 'link': filters[i][2], 'hours':filters[i][3]};
          }
          resolve(jsonFilters);
        }
      });
    } catch (err){
      console.log(err);
      reject(err);
    }

  });

}


module.exports.getFilters = getFilters;
