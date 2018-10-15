var express = require('express');
var app = express();
var db = require('./db');

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/movies/:id', db.findMovie);
app.get('/show/:id', db.findShow);



module.exports = app;


