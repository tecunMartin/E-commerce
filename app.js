const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./src/routes/index.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
Router(app);

module.exports = app;
