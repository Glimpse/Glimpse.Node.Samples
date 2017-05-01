var glimpseAgent = require('@glimpse/glimpse-node-agent');
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
    var result = a + b;

    console.log('Addition: a(%d) + b(%d) = %d', a, b, result);

    res.json({ result: result, a: a, b: b, operation: '+' });
})

app.listen(4050, function () {
    console.log('Calculator Addition ~ 4050')
})
