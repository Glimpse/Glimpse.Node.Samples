var glimpseAgent = require('@glimpse/glimpse-agent-node');
glimpseAgent.agent.init({
    metadataUri: 'http://localhost:5000/glimpse/metadata'
});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var rp = require('request-promise');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/', function (req, res) {
    var promises = [];

    // setup each request
    var requests = JSON.parse(req.query.requests);
    for (var i = 0; i < requests.length; i++) {
        var request = requests[i];

        var options = {
            uri: 'http://localhost:' + request.port,
            qs: {
                title: request.title,
                a: request.a,
                b: request.b
            },
            json: true
        };
        promises.push(rp(options));
    }

    // waiting for all responses
    Promise.all(promises)
        .then(function(values) {
            res.json(values);
        });
})

app.listen(5050, function () {
    console.log('Calculator Batch ~ 5050')
})