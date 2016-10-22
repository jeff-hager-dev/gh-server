var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');
var config = require('./config');


module.exports = function(req, res){
 // console.log("person said", req.body);
  var result = utils.getResult(req.body);
 // console.log(result);

  var lastQuestion = calls.getCallerInfo(result.callId);
  var currentQuestion = utils.getNextQuestion(lastQuestion.ID, result);


  var tropo = new tropowebapi.TropoWebAPI();
  if(currentQuestion.ID === "End" || !currentQuestion){
    console.log('end');
    tropo.on("continue", null, states.end, true);
    tropo.on("error", null, states.end, true);

    res.end(TropoJSON(tropo));
    return;
  }


  var say = new Say(currentQuestion.Text);
  
  var choices = new Choices(_.map(currentQuestion.Choices, "option").join(','));
  
  console.log("currentQuestion ", currentQuestion);
  
  // Action classes can be passes as parameters to TropoWebAPI class methods.
  tropo.ask(choices, 3, false, null, "choice", null, true, say, 5, config.voice);

  tropo.on("continue", null, states.next, true);
  tropo.on("error", null, states.end, true);

  calls.addCallerInfo(result.callId, currentQuestion);
  res.end(TropoJSON(tropo));
};