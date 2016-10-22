var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var config = require('./config');

module.exports = function(req, res){

  var session = utils.getResult(req.body);

  calls.removeCaller(session.callId);
  console.log('Hanging up on caller: ', session.callId);

  var tropo = new tropowebapi.TropoWebAPI();

  tropo.say(config.Farewell, null, null, "greeting", true, config.voice);

  res.end(TropoJSON(tropo));
};