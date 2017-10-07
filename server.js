var bodyParser=require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public'));
 app.use(bodyParser());
  app.use(bodyParser.urlencoded({
  extended: true
  }));


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(bodyParser.json());
app.post('/ADD_SLIDE', function(req, res) {
    
    console.log(req.body.s);
    console.log('SLIDE ADDED ' + Date());
    res.value = "updated";
    
    // Run your LED toggling code here
});

//write to file.
var fs = require('fs');
fs.writeFile("public/js/dc.json", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});


app.listen(8080);
console.log('server started at ' + Date());