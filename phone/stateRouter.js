"use strict";

var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');
var config = require('./config');
var httpStatusCode = require('http-status');

var _processStaticQuestion = function (result, currentQuestion) {
  var tropo = new tropowebapi.TropoWebAPI();


  var say = new Say(currentQuestion.Text);

  var choices = new Choices(_.map(currentQuestion.Choices, "option").join(','));

  console.log("currentQuestion ", currentQuestion);

  // Action classes can be passes as parameters to TropoWebAPI class methods.
  tropo.ask(choices, 3, false, null, "choice", null, true, say, 5, config.voice);

  tropo.on("continue", null, states.next, true);
  tropo.on("error", null, states.end, true);

  calls.addCallerInfo(result.callId, currentQuestion);

  return tropo;
};


var _processDynamicQuestion = function (result, question) {
};

var _processEnd = function () {

  var tropo = new tropowebapi.TropoWebAPI();
  tropo.on("continue", null, states.end, true);
  tropo.on("error", null, states.end, true);

  return tropo;
};

var _processCall = function(res, question){};

module.exports = function (req, res) {
  var result = utils.getResult(req.body);

  var lastQuestion = calls.getCallerInfo(result.callId);
  var currentQuestion = utils.getNextQuestion(lastQuestion.ID, result);
  var tropo = null;

  if (currentQuestion.Type === 'static') {
    tropo = _processStaticQuestion(result, res, currentQuestion);
  }

  if (currentQuestion.Type === 'dynamic') {
    tropo = _processStaticQuestion(result, res, currentQuestion);
  }
  if (currentQuestion.Type === 'call') {
    tropo = _processCall(result, res, currentQuestion);
  }
  if (currentQuestion.Type === 'end') {
    tropo = _processEnd();
  }

  res.status(httpStatusCode.OK).end(TropoJSON(tropo));
};