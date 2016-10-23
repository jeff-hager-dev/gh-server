var express = require('express');
var app = express();
var mongoUtil = require('./utilities/mongoUtil');
const bodyParser = require('body-parser');
var phone = require('./phone');

mongoUtil.connect();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

phone(app);

app.get("/resource/:type", function (req, res) {
    mongoUtil.resources().find({Type: req.params.type},
        {fields: {_id: 0}})
        .toArray(function (err, docs) {
            var resources = docs.map(function (resource) {
                return resource;
            });
            res.send(resources);
        });
});

app.get("/resource/:type/:subType", function (req, res) {
    mongoUtil.resources()
        .find({
                Type: req.params.type,
                SubType: req.params.subType
            },
            {fields: {_id: 0}})
        .toArray(function (err, docs) {
            var resources = docs.map(function (resource) {
                return resource;
            });
            res.send(resources);
        });
});

app.get("/client", function (req, res) {
    mongoUtil.clients()
        .find(searchObject(req.query), {fields: {_id: 0}})
        .toArray(function (err, docs) {
            var clients = docs.map(function (client) {
                return client;
            });
            res.send(clients);
        });
});

app.post("/client", function (req, res) {
    var client = req.body;
    mongoUtil.clients()
        .insertOne(client);
    res.statusCode = 200;
    res.send();
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

function GetRegex(val) {
    var value = (val == undefined ? '' : val);
    return new RegExp(".*" + value + ".*", 'i');
}

function searchObject(query) {
    return {
        firstName: GetRegex(query.firstName),
        lastName: GetRegex(query.lastName),
        ssn: GetRegex(query.ssn),
        username: GetRegex(query.username),
    }
}