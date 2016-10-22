var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');

module.exports = function(req, res){

  var session = utils.getResult(req.body);

  calls.removeCaller(session.callId);
  console.log('Hanging up on caller: ', session.callId);

  var tropo = new tropowebapi.TropoWebAPI();

  tropo.hangup();

  res.end(TropoJSON(tropo));
};