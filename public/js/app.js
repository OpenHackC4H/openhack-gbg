var ip_address = 'http://172.4.163.208:8080';
var database = 'db.json'
var option, index;
var button = document.getElementsByClassName("button")[0];
var btn_up = document.getElementsByClassName("btn-up")[0];
var btn_down = document.getElementsByClassName("btn-down")[0];
var btn_remove = document.getElementsByClassName("btn-remove")[0];
var items = {slides:[]};

fetchDb(database);
console.log(items);

button.addEventListener("click", addSlide);
btn_up.addEventListener("click", move_up);
btn_down.addEventListener("click", move_down);
btn_remove.addEventListener("click", remove);


function selected_radio(){
    var radios = document.getElementsByName('radio');
    var radio_value;
    for(var i = 0; i < radios.length; i++){
        if(radios[i].checked){
            radio_value = i;
        }
    }
    return radio_value;
}

function remove(){
    var radio_value = selected_radio();
    
    var new_list={slides:[]};
    for (var k = 0; k < items.slides.length; k++){
        if( k != radio_value){
            new_list.slides.push(items.slides[k]);
        }
    }
    items = new_list;
    write_db();
}

function move_up(){
    console.log("up pressed");
    var radio_value = selected_radio();
    
    var new_list={slides:[]};
    for (var k = 0; k < items.slides.length; k++){
        if(radio_value == 0){
            return;
        }
        else if( k == radio_value - 1){
            new_list.slides.push(items.slides[k+1]);
        }
        else if (k == radio_value){
            new_list.slides.push(items.slides[k-1]);
        }
        else{
            new_list.slides.push(items.slides[k]);
        }

    }
    items = new_list;
    write_db();
}

function move_down(){
    console.log("down pressed");
    var radio_value = selected_radio();
    var new_list={slides:[]};
    for (var k = 0; k < items.slides.length; k++){
        
        if(radio_value == items.length-1){
            return;
        }
        else if( k == radio_value){
            
            new_list.slides.push(items.slides[k+1]);

        }
        else if (k == (radio_value + 1)){
            
            new_list.slides.push(items.slides[k-1]);
        }
        else{

            new_list.slides.push(items.slides[k]);
        }

    }
    items = new_list;
    write_db();
}

function fetchDb(db) {
    $.ajax({
        type: 'POST',
        url: ip_address + '/FETCH',
        datatype: "json",
        data: {s: db},
        success: function (response) {
            if(response != null)
                {
                console.log(response);
                console.log(JSON.parse(response));
                items = JSON.parse(response);
                console.log(items.slides);
                displaySlides();
                console.log(items);
                }
        },
        error: function(){
            console.log("error");
        }
        
    });
}

function displaySlides() {
    console.log(items.slides.length);
    for (i = 0; i < (items.slides).length; i++) {
        console.log(i);
        var slideholder = document.getElementsByClassName("slideholder")[0];

        var tr = document.createElement("tr");

        var td0 = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td2.className = "td-center";
        
        var ipt_img = document.createElement("input")
        ipt_img.type = "text"
        ipt_img.className ="form-control";
        ipt_img.disabled = true;
        
        var ipt_sound = document.createElement("input")
        ipt_sound.type = "text"
        ipt_sound.className ="form-control";
        ipt_sound.disabled = true;
        
        var label = document.createElement("label");
        label.className="btn btn-primary";
        
        var span = document.createElement("span");
        span.className="glyphicon glyphicon-ok";
        
        var ipt = document.createElement("input");
        ipt.type = "radio";
        ipt.name = "radio";
        ipt.value = i;
        ipt.id = "option2";
        ipt.autocomplete = "off";

        ipt_img.value = items.slides[i].image;
        ipt_sound.value = items.slides[i].sound;
        label.appendChild(ipt);
        
        td0.appendChild(ipt_img);
        td1.appendChild(ipt_sound);
        td2.appendChild(label);

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);

        slideholder.appendChild(tr);
    }

}



function addSlide() {
    
    var img = document.getElementsByClassName("image")[0];
    var snd = document.getElementsByClassName("sound")[0];
    var arr = {image: img.value,sound: snd.value}; 
    
    console.log(arr);
    
    console.log(items);
    
    
    items.slides.push(arr);
    
    console.log(JSON.stringify(arr));
    
    write_db();
    
}

function write_db(){
    console.log(items);
    $.ajax({
        type: 'POST',
        url: ip_address + '/ADD_SLIDE',
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





