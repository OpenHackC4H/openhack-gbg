var bodyParser=require('body-parser');
var fs = require('fs');
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
app.post('/FETCH', function(req, res) {
    console.log("FETCH called... fetching from db.json")
    fs.readFile('public/js/db.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var items = data;
    res.send(data);
    });
});


app.post('/ADD_SLIDE', function(req, res) {
    
    console.log("adding slide " +req.body.s + " to db.json");
    fs.writeFile("public/js/db.json", req.body.s, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    var msg = "updated current ";
    res.send(msg);
});
    
    console.log('SLIDE ADDED ' + Date());
    
    
    // Run your LED toggling code here
});




function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}



app.listen(8080);
console.log('server started at ' + Date());