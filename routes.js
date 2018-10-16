const express = require('express');
const app = express();
const db = require('./db');

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/movies/:id', db.findMovie);
app.get('/tv_show/:id', db.findShow);
app.get('/db/search/', db.search);

module.exports = app;


