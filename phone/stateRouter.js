"use strict";

var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');
var config = require('./config');
var httpStatusCode = require('http-status');
var _processDynamicQuestion = require('./processDynamicQuestion');

var _processStaticQuestion = function (result, currentQuestion) {
  var tropo = new tropowebapi.TropoWebAPI();

  var say = new Say(currentQuestion.Text);

  var choices = new Choices(_.map(currentQuestion.Choices, "option").join(','));

  // Action classes can be passes as parameters to TropoWebAPI class methods.
  tropo.ask(choices, 3, false, null, "choice", null, true, say, 5, config.voice);

  tropo.on("continue", null, states.next, true);
  tropo.on("error", null, states.end, true);

  calls.addCallerInfo(result.callId, currentQuestion);

  return tropo;
};


var _processEnd = function () {

  var tropo = new tropowebapi.TropoWebAPI();
  tropo.on("continue", null, states.end, true);
  tropo.on("error", null, states.end, true);

  return tropo;
};

var _processCall = function(result, question){
  var phoneNumber = _.find(question.Choices, function(elt) {
    return elt.option == result.actions.value;
  }).phoneNumber;

  var tropo = new tropowebapi.TropoWebAPI();
  tropo.transfer(phoneNumber);
  return tropo;
};

module.exports = function (req, res) {
  var result = utils.getResult(req.body);

  var lastQuestion = calls.getCallerInfo(result.callId);
  console.log('Last Question ====> ', lastQuestion);
  var currentQuestion = utils.getNextQuestion(lastQuestion.ID, result);

  var tropo = null;
  if (currentQuestion.Type === 'dynamic') {
    return _processDynamicQuestion(result, currentQuestion, function(err, tObj){
      res.status(httpStatusCode.OK).end(TropoJSON(tObj));
    });
  }

  if (currentQuestion.Type === 'static') {
    tropo = _processStaticQuestion(result, currentQuestion);
  }

  if (currentQuestion.Type === 'call') {
    tropo = _processCall(result, lastQuestion);
  }
  if (currentQuestion.Type === 'end') {
    tropo = _processEnd();
  }

  return res.status(httpStatusCode.OK).end(TropoJSON(tropo));
};