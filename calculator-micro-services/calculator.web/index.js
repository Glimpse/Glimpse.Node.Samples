var glimpse = require('@glimpse/glimpse-node');
glimpse.init();

var path = require('path');
var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index');
})

app.listen(5000, function () {
    console.log('Calculator Web ~ 5000')
})