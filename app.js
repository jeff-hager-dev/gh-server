var express = require('express');
var app = express();
var mongoUtil = require('./utilities/mongoUtil');

mongoUtil.connect();

app.get("/resource/:type", function(req, res) {
    mongoUtil.resources().find({ type: req.params.type },
        {fields: {_id: 0}})
        .toArray(function(err, docs){
        var resources = docs.map(function(resource){
            return resource;
        });
        res.send(resources);
    });
});

app.get("/resource/:type/:subType", function(req, res) {
    mongoUtil.resources()
        .find({ type: req.params.type,
                subTypes: req.params.subType },
            {fields: {_id: 0}})
        .toArray(function(err, docs){
        var resources = docs.map(function(resource){
            return resource;
        });
        res.send(resources);
    });
});

app.get("/client", function(req, res){
   mongoUtil.clients()
       .find({
           firstName: new RegExp(".*"+nullCoalese(req.query.firstName) +".*"),
           lastName: new RegExp(".*"+nullCoalese(req.query.lastName)+".*"),
           ssn: new RegExp(".*"+nullCoalese(req.query.ssn)+".*"),
       }, {fields: {_id: 0}})
       .toArray(function (err, docs) {
           var clients = docs.map(function(client){
              return client;
           });
           res.send(clients);
       });
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

function nullCoalese(val){
    var value = (val == undefined ? '' : val);
    return value;
}