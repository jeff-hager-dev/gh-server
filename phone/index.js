var welcomeController = require('./welcomeState');
var states = require('./states');
var httpStatusCode = require('http-status');

var phone = function(app){
    app.get(states.health, function(req, res){
        res.status(httpStatusCode.OK).json({"message": "Running"});
    });

    app.post(states.welcome, welcomeController);
};

module.exports = phone