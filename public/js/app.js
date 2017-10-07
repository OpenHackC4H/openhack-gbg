
var action, url, option, index;

var button = document.getElementsByClassName("button")[0];
var items = [];


button.addEventListener("click", addSlide);


function run() {
    
    switch (action) {
        case 0:
            // ADD
            //populateQuestion();
            break;
        case 1:
            // MODIFY
            //generateUsers();
            break;
        default:
            break;
    }
}

function setAction(action) {
    this.action = action;
}


function addSlide() {
   
    var img = document.getElementsByClassName("image")[0];
    var snd = document.getElementsByClassName("sound")[0];
    var arr = [{image: img.value}, {sound: snd.value}]; 
    
    var json = JSON.stringify(arr);
    
    items.push(JSON.parse(json));
    
    console.log(JSON.stringify(items));
}

function writeJSON() {
    
}

function fetchDb() {
    url = "js/db.json";
    loadJSON(function (response) {
        survey = JSON.parse(response);
        fetchUsers();
    });
}

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