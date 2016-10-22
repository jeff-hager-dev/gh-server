var express = require('express');
var app = express();
var mongoUtil = require('./utilities/mongoUtil');
const bodyParser = require('body-parser');
var phone = require('./phone');

mongoUtil.connect();

app.use(bodyParser.json());

phone(app);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});