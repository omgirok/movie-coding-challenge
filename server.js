// include modules
const express = require('express');
const app = express();
const port = 8000;
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

// routes
app.use('/', routes);

 
// setup server
var server = app.listen(port, () => console.log(`Server is listening on port ${port}!`));

