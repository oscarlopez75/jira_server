require('dotenv').config({path: '../files/.env'})

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');


// var swaggerTools = require('swagger-tools');
// var YAML = require('yamljs');
// var swaggerDoc = YAML.load('openapi.yaml');



var routes = require('../routes/jira_router.js');

var port = process.env.JIRA_PORT || 4900;        // set our port

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);


// swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
//   // Serve the Swagger documents and Swagger UI
//   app.use(middleware.swaggerUi());
// });


app.listen(port);
console.log('Magic happens on port ' + port);
