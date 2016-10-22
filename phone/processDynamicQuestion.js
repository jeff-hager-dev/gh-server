
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

    var cursor = clients.find({$or: [ { Type: 'Housing Assistance' }, { Type: 'Shelter' } ]},{_id: 0, Name: 1, Phone: 1, Subtype: 1}).sort({Name:1}).limit(2);
    cursor.toArray(function(err, docs){
      var choices = [];
      var text = "";
      for(var i  = 0; i < docs.length; i++){
        var doc = docs[i];
        text+= (i+1)+'. '+ doc.Name+' for '+doc.Subtype+', ';
        choices.push( {"option": i+1, "nextState": "call", "phoneNumber": doc.Phone});
      }
      done(null, text, choices);
    });
  });
};

var buildTropoObject = function(result, currentQuestion, text, choices, done){

  var tropo = new tropowebapi.TropoWebAPI();

  var say = new Say(text);

  var choices = new Choices(_.map(choices, "option").join(','));


  // Action classes can be passes as parameters to TropoWebAPI class methods.
  tropo.ask(choices, 3, false, null, "choice", null, true, say, 5, config.voice);

  tropo.on("continue", null, states.next, true);
  tropo.on("error", null, states.end, true);

  currentQuestion.Text = text;
  currentQuestion.Choices = choices;
  console.log("currentQuestion ", currentQuestion);
  calls.addCallerInfo(result.callId, currentQuestion);

  return done(null, tropo);
};

module.exports = function(result, currentQuestion,done){
  getQuestionInfo(currentQuestion.ID, function(err, text, choices){
    buildTropoObject(result, currentQuestion, text, choices, done);
  });
};



