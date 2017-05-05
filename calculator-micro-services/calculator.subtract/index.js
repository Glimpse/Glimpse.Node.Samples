var glimpseAgent = require('@glimpse/glimpse-agent-node');
glimpseAgent.agent.init({
    metadataUri: 'http://localhost:5000/glimpse/metadata'
});

var express = require('express')
var app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    var a = parseInt(req.query.a) || 1;
    var b = parseInt(req.query.b) || 1;
    var result = a * b;

    console.log('Subtract: a(%d) - b(%d) = %d', a, b, result);

    res.json({ result: result, a: a, b: b, operation: '-' });
})

app.listen(4075, function () {
    console.log('Calculator Subtract ~ 4075')
})