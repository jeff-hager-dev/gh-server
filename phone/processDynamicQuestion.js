
"use strict";

var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');
var config = require('./config');
var mongo = require('mongodb');
var client = mongo.MongoClient;

var getClientConnection = function(done){
  client.connect("mongodb://45.55.36.252:27017/ServiceSTL", function (err, db) {
    if (err) {
      console.log(err);
      console.log("Connection to mongo failed. Check for running server");
      process.exit(1);
      return;
    }
    return done(db.collection("resource"));
  })
};

var getQuestionInfo  = function(type, done){
  getClientConnection(function(clients){
    var cursor = [];

    var cursor = clients.find({$or: [ { Type: 'Housing Assistance' }, { Type: 'Shelter' } ]},{_id: 0, Name: 1, Phone: 1, Subtype: 1, "Resources Available": 1}).sort({Name:1}).limit(2);
    cursor.toArray(function(err, docs){
      var choices = [];
      var text = "";
      for(var i  = 0; i < docs.length; i++){
        var doc = docs[i];
        var optionNumber = i+1;
        text+= optionNumber+'. '+ doc.Name+' for '+doc.Subtype+' with ' + doc["Resources Available"] + ' resources available' ;
        console.log("doc ", doc);
        choices.push( {"option": optionNumber, "nextState": "Call", "phoneNumber": doc.Phone, "resourcesAvailable": doc["Resources Available"]});
      }
      done(null, text, choices);
    });
  });
};

var buildTropoObject = function(result, currentQuestion, text, choices, done){

  var tropo = new tropowebapi.TropoWebAPI();

  var say = new Say(text);

  var choicesStr = new Choices(_.map(choices, "option").join(','));


  // Action classes can be passes as parameters to TropoWebAPI class methods.
  tropo.ask(choicesStr, 3, false, null, "choice", null, true, say, 5, config.voice);

  tropo.on("continue", null, states.next, true);
  tropo.on("error", null, states.end, true);

  currentQuestion.Text = text;
  currentQuestion.Choices = choices;
  calls.addCallerInfo(result.callId, currentQuestion);

  return done(null, tropo);
};

module.exports = function(result, currentQuestion,done){
  getQuestionInfo(currentQuestion.ID, function(err, text, choices){
    buildTropoObject(result, currentQuestion, text, choices, done);
  });
};



