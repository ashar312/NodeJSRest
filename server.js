//dependices
var port = process.env.PORT || 1000;
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//connecting to mongoDB
mongoose.connect('mongodb+srv://Ashar:Jupitar6@restdb-fnklo.mongodb.net/test?retryWrites=true&w=majority');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/api',require('./routes/api'));

app.listen(port);
console.log('Server is running on port 3000');