var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');

module.exports = function(req, res){
  console.log("person said", res.body);
  var session = utils.getResult(req.body);
  var caller = calls.getCaller(session.callId);

  var tropo = new tropowebapi.TropoWebAPI();

};