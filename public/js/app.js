var option, index;
var button = document.getElementsByClassName("button")[0];
var items=[];

fetchDb();
//console.log(items);

button.addEventListener("click", addSlide);

function fetchDb() {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/FETCH',
        datatype: "json",
        data: {s: JSON.stringify(items)},
        success: function (response) {
            items = JSON.parse(response);
            console.log(response);
        },
        error: function(){
            console.log("error");
        }
        
    });
}


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
            console.log(response);
        },
        error: function(){
            console.log("error");
        }
        
    });
}





