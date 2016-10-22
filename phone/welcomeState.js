var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');

module.exports = function(req, res){
    console.log('test');
    var tropo = new tropowebapi.TropoWebAPI();

    var session = utils.getSession(req.body);
    console.log('Caller ', session.callId, ' starting at the welcome state');

    calls.addCaller(session.callId, questions.Welcome);


    // Demonstrates how to use the base Tropo action classes.
    var say = new Say(questions.Welcome.Text);
    var choiceStr = _.map(questions.Welcome.Choices, "options").join(',');
    var choices = new Choices("[1 DIGITS]");

    // Action classes can be passes as parameters to TropoWebAPI class methods.
    //       (choices, attempts, bargein, minConfidence, name, recognizer, required, say, timeout, voice);
    tropo.ask(choices, 3,        false,    null,       "choice", null, true, say, 5, 'allison', 4.0, 0.1);

    tropo.on("continue", null, states.next, true);
    tropo.on("error", null, states.end, true);

	  res.end(TropoJSON(tropo));
};