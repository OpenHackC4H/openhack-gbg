var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(8080);
console.log('server started at ' + Date());