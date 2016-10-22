var express = require('express');
var app = express();
var mongoUtil = require('./utilities/mongoUtil');

mongoUtil.connect();

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});