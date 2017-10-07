var option, index;
var button = document.getElementsByClassName("button")[0];
var items = [];


button.addEventListener("click", addSlide);



function addSlide() {
    
    
    var img = document.getElementsByClassName("image")[0];
    var snd = document.getElementsByClassName("sound")[0];
    var arr = [{image: img.value}, {sound: snd.value}]; 
    
    var json = JSON.stringify(arr);
    
    items.push(JSON.parse(json));
    
    console.log(JSON.stringify(items));
        
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/ADD_SLIDE',
        datatype: "json",
        data: {s: JSON.stringify(items)},
        success: function (response) {
        },
        error: function(){
            
        }
        
    });
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