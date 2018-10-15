// include modules
const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const routes = require('./routes');


// routes
app.use('/', routes);

 
// setup server
var server = app.listen(port, () => console.log(`Server is listening on port ${port}!`));

