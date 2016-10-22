var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');


module.exports = function(req, res){
 // console.log("person said", req.body);
  var result = utils.getResult(req.body);
 // console.log(result);

  var lastQuestion = calls.getCaller(result.callId);
  var currentQuestion = utils.getNextQuestion(lastQuestion.ID, result);
 // console.log("caller question: ", lastQuestion.ID);

  var tropo = new tropowebapi.TropoWebAPI();

  var say = new Say(currentQuestion.Text);
  
  var choices = new Choices(_.map(currentQuestion.Choices, "option").join(','));
  
  console.log("currentQuestion ", currentQuestion);
  
  // Action classes can be passes as parameters to TropoWebAPI class methods.
  tropo.ask(choices, 3, false, null, "foo", null, true, say, 5, null);

  tropo.on("continue", null, states.next, true);
  tropo.on("error", null, states.end, true);

  res.end(TropoJSON(tropo));
};