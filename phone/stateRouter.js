var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');


module.exports = function(req, res){
  console.log("person said", res.body);
  var result = utils.getResult(req.body);
  console.log(result);

  var lastQuestion = calls.getCaller(result.callId);

  console.log("caller question: ", lastQuestion.ID);

  var tropo = new tropowebapi.TropoWebAPI();

  var say = new Say(questions.Food.Text);
  
  var choices = new Choices(_.map(questions.Food.choices, "options").join(','));
  
  // Action classes can be passes as parameters to TropoWebAPI class methods.
  tropo.ask(choices, 3, false, null, "foo", null, true, say, 5, null);

  tropo.on("continue", null, states.next, true);
  tropo.on("error", null, states.end, true);

  res.end(TropoJSON(tropo));
};