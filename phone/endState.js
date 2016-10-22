var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');

module.exports = function(req, res){

  var session = utils.getSession(req.body);

  calls.removeCaller(session.callId);

  var tropo = new tropowebapi.TropoWebAPI();

  tropo.say("... ... Good Bye");

  res.end(TropoJSON(tropo));
};