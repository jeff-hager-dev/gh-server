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
    console.log('Caller ', session.callId);

    calls.addCaller(session.callId, {});
	    	
	  tropo.say("");

    // Demonstrates how to use the base Tropo action classes.
    var say = new Say(questions.Welcome.Text);
    var choices = new Choices(_.map(questions.Welcome.Choices, "options").join(','));

    // Action classes can be passes as parameters to TropoWebAPI class methods.
    // choices, attempts, bargein, minConfidence, name, recognizer, required, say, timeout, voice, interdigitTimeout, sensitivity, speechCompleteTimeout, speechIncompleteTimeout
    tropo.ask(choices, 3, false, null, "choice", null, true, say, 5, 'Allison', 5.0, 0.1);
    tropo.on("continue", null, states.next, true);

	  res.end(TropoJSON(tropo));
};