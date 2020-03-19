//dependencies
//Old work
var express = require('express');
var router = express.Router();

//get models:

var Status = require('../models/status');

//routes
Status.methods(['get', 'post', 'put', 'delete']);
Status.register(router,'/status');

module.exports = router;