var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');


module.exports = function(req, res){
<<<<<<< HEAD
  console.log("person said", res.body);
  var result = utils.getResult(req.body);
  console.log(result);

  var lastQuestion = calls.getCallerInfo(result.callId);

  console.log("caller question: ", lastQuestion.ID);

  var tropo = new tropowebapi.TropoWebAPI();

  var say = new Say(questions.Food.Text);
  
  var choices = new Choices(_.map(questions.Food.choices, "options").join(','));
=======
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
>>>>>>> 4d58ddcfde75aec1b23449729e5370fc13508556
  
  // Action classes can be passes as parameters to TropoWebAPI class methods.
  tropo.ask(choices, 3, false, null, "foo", null, true, say, 5, null);

  tropo.on("continue", null, states.next, true);
  tropo.on("error", null, states.end, true);

  calls.addCallerInfo(result.callId, currentQuestion);
  res.end(TropoJSON(tropo));
};