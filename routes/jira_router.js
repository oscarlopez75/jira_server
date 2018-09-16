var express = require('express');

const readFilters = require('../modules/readFilters');
const requestJira = require('../modules/requestJira');
const findIssues = require('../modules/find_issues');
const processRecords = require('../modules/process_records');
const verifyToken = require('../modules/verifyToken');

// var jwt = require('jsonwebtoken');



var router = express.Router();

router.get('/', function(req, res){
  res.json({message:"Welcome to the Jira api"});
});

router.post('/getFiltersPriority', (req, res) => {
  var filterName = '';
  var filterNumber = '';

  readFilters.getFilters('../files/priority.txt')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    })


});

router.post('/getTotal', (req, res) => {
  filterNumber = req.body.filternumber;
  filterName = req.body.filtername;
    requestJira.getJiraResults(filterNumber, filterName)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      })
});

router.post('/getTotalAsia', (req, res) => {
  filterNumber = req.body.filternumber;
  filterName = req.body.filtername;
  token = req.body.token;

  verifyToken.verifyToken(token)
    .then(decoded => {
      let access = ['admin'];
      if(access.includes(decoded.message.body.role)){
        requestJira.getJiraResults(filterNumber, filterName)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            // console.log(err);
            res.status(400).send(err);
          })
      }else{
        res.status(403).json({message: 'User has no access'});
      }

    })
    .catch((err) => {
      res.status(401).json({message: err});
    })


});

router.post('/getIssues', function(req, res){
  readFilters.getFilters('../files/priority.txt')
    .then(data => {
      findIssues.getIssues(data)
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(400).send(err);
        })
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    })

});


router.get('/getReport', function(req, res){
  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')){
    verifyToken.verifyToken(req.headers['authorization'])
      .then(function(decoded){
        readFilters.getFilters('../files/priority.txt')
          .then(data => {
            processRecords.processReport(data)
              .then(result => {
                res.status(200).json(result);
              })
              .catch(err =>{
                res.status(400).send(err);
              })
          })
          .catch(err => {
            console.log(err);
            res.status(400).send(err);
          })
      })
      .catch((err) => {
        res.status(401).json({message: err});
      })
  }else{
    res.status(401).json({message: "No Token"});
    return;
  }


});

router.get('/getResolved', function(req, res){
  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')){
    verifyToken.verifyToken(req.headers['authorization'])
      .then(function(decoded){
        readFilters.getFilters('../files/resolved.txt')
          .then(data => {
            processRecords.processReport(data)
              .then(result => {
                res.status(200).json(result);
              })
              .catch(err =>{
                res.status(400).send(err);
              })
          })
          .catch(err => {
            console.log(err);
            res.status(400).send(err);
          })
      })
      .catch((err) => {
        res.status(401).json({message: err});
      })
  }else{
    res.status(401).json({message: "No Token"});
    return;
  }
});


router.get('/getAsian', function(req, res){
  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')){
    verifyToken.verifyToken(req.headers['authorization'])
      .then(function(decoded){
        let access = ['admin'];
        if(access.includes(decoded.message.body.role)){
          readFilters.getFilters('../files/asians.txt')
            .then(data => {
              processRecords.processReport(data)
                .then(result => {
                  res.status(200).json(result);
                })
                .catch(err =>{
                  res.status(400).send(err);
                })
            })
            .catch(err => {
              console.log(err);
              res.status(400).send(err);
            })
        }else{
          res.status(403).json({message: 'User has no access'});
        }

      })
      .catch((err) => {
        res.status(401).json({message: err});
      })
  }else{
    res.status(401).json({message: "No Token"});
    return;
  }
});

router.get('/getAsianIssues', function(req, res){
  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')){
    verifyToken.verifyToken(req.headers['authorization'])
      .then(function(decoded){
        readFilters.getFilters('../files/asians.txt')
          .then(data => {
            processRecords.processReport(data)
              .then(result => {
                res.status(200).json(result);
              })
              .catch(err =>{
                res.status(400).send(err);
              })
          })
          .catch(err => {
            console.log(err);
            res.status(400).send(err);
          })
      })
      .catch((err) => {
        res.status(401).json({message: err});
      })
  }else{
    res.status(401).json({message: "No Token"});
    return;
  }
});


module.exports = router;
