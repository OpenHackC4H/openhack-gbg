var option, index;
var button = document.getElementsByClassName("button")[0];
var items=[];

fetchDb();
console.log(items);
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
            displaySlides(items);
            console.log(response);
        },
        error: function(){
            console.log("error");
        }
        
    });
}

function displaySlides(slides) {
    console.log(slides);
    for (i = 0; i < slides.length; i++) {
        console.log(i);
        var slideholder = document.getElementsByClassName("slideholder")[0];

        var tr = document.createElement("tr");

        var td0 = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        
        var ipt_img = document.createElement("input")
        ipt_img.type = "text"
        ipt_img.disabled = true;
        
        var ipt_sound = document.createElement("input")
        ipt_sound.type = "text"
        ipt_sound.disabled = true;

        var ipt = document.createElement("input");
        ipt.type = "radio";
        ipt.name = "radio";

        ipt_img.value = slides[i][0].image;
        ipt_sound.value = slides[i][1].sound;

        td0.appendChild(ipt_img);
        td1.appendChild(ipt_sound);
        td2.appendChild(ipt);

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);

        slideholder.appendChild(tr);
    }

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





