var welcomeState = require('./welcomeState');
var states = require('./states');
var httpStatusCode = require('http-status');
var stateRouter = require('./stateRouter');
var endState = require('./endState');

var phone = function(app){
    app.get(states.health, function(req, res){
        res.status(httpStatusCode.OK).json({"message": "Running"});
    });
    app.post(states.next, stateRouter);
    app.post(states.welcome, welcomeState);
    app.post(states.end, endState);
};

module.exports = phone;