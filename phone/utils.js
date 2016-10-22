var questions = require("./questions");
var _ = require('lodash');

var util  = {};

util.getSession =  function(body){
    var session = {};
    session.sessionId = body.session.id;
    session.callId = body.session.callId;
    session.UserType = body.session.UserType;
    session.applicationId = body.session.applicationId;
    session.timestamp = body.session.timestamp;
    session.to = body.session.to;
    session.from = body.session.from;
    session.headers = body.session.headers;
    return session;
};

util.getResult = function(body) {
    var result = {};
    result.sessionId = body.result.sessionId;
    result.callId = body.result.callId;
    result.state = body.result.state;
    result.sessionDuration = body.result.sessionDuration;
    result.sequence = body.result.sequence;
    result.complete = body.result.complete;
    result.error = body.result.error;
    result.userType = body.result.userType;
    result.actions = body.result.actions;
    return result;
    
};

util.getNextQuestionID = function(lastId, result) {
   // console.log("lastId " + lastId);
    console.log("result ", result.actions.value);
    var choices = _.find(questions, function(elt) {
        return elt.ID === lastId;
    }).Choices;
    
    console.log("choices ", choices);
    
    return _.find(choices, function(elt) {
       return elt.option == result.actions.value;
    }).nextState;
};

util.getNextQuestion = function(lastId, result) {
    var ID = util.getNextQuestionID(lastId, result);
    return _.find(questions, function(elt) {
        return elt.ID == ID;
    })
}

module.exports = util;