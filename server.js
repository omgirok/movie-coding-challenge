// include modules
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// routes
app.use('/', routes);

 
// setup server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

