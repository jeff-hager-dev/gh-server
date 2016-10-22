var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');
var config = require('./config');

module.exports = function(req, res){
    console.log('test');
    var tropo = new tropowebapi.TropoWebAPI();

    var session = utils.getSession(req.body);
    console.log('Caller ', session.callId, ' starting at the welcome state');

    calls.addCallerInfo(session.callId, questions[0]);

    tropo.say(config.Greeting, null, null, "greeting", true, config.voice);
    // Demonstrates how to use the base Tropo action classes.
    var say = new Say(questions[0].Text);
    var choiceStr = _.map(questions[0].Choices, "options").join(',');
    var choices = new Choices("[1 DIGITS]");

    // Action classes can be passes as parameters to TropoWebAPI class methods.
    //       (choices, attempts, bargein, minConfidence, name, recognizer, required, say, timeout, voice);
    tropo.ask(choices, 3,        true,    null,       "choice", null, true, say, 5, config.voice, 4.0, config.sensitivity);

    tropo.on("continue", null, states.next, true);
    tropo.on("error", null, states.end, true);

	  res.end(TropoJSON(tropo));
};