var express = require('express');
var app = express();
var mongoUtil = require('./utilities/mongoUtil');
var phone = require('./phone');

mongoUtil.connect();

phone(app);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});