//Search for recipes with food2fork api
$("#search-recipes").on("click", function(){
    
    var userId = auth.currentUser.uid;
    var APIKey = "f2c7f03ce6caef2a5f775dc746cdf6d9";
    var currentDish;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    currentDish = snapshot.val().testArray;
    console.log(currentDish);
    }).then(function(){ 
        console.log(currentDish);
        var queryURL = "https://www.food2fork.com/api/search?key=" + APIKey + "&q=" + currentDish + "&page=1";
    
        $("#recipes").empty();
    
        $.ajax({
            url: queryURL,
            method: "GET"}).then(function(response){
                console.log({ response: response });       
        //Insert three dish pics with title   
            for (var k=0; k < 3; k++){
    
                var usableResponse = JSON.parse(response);
                console.log(usableResponse);
                
                var dishTitle = $("<div>");
                var part = $('<p>').text(usableResponse.recipes[k].title);
    
                var nextDish = $("<img>").attr('src', usableResponse.recipes[k].image_url);
                nextDish.addClass("rounded");
                var checkBox = $("<button>").attr("class", "add-recipe");
                checkBox.text("Save");
                checkBox.attr("data-src", usableResponse.recipes[k].image_url)
                checkBox.attr("data-url", usableResponse.recipes[k].source_url);
                checkBox.attr("data-title", usableResponse.recipes[k].title);
                dishTitle.append(part);
                dishTitle.append(checkBox);
                dishTitle.append(nextDish);
                $("#recipes").append(dishTitle);
            };
        }); 
    })
    
})

//show recipes
$(document).on("click", "#show-recipes", function(){
    $("#recipes").empty();
    var userId = auth.currentUser.uid;
    db.ref("/users/"+userId).on("value", function(snap){
        //get JSON formatted into useable string
        var JSON_string = JSON.stringify(snap.child('recipes'));
        console.log(JSON_string);
        var JSON_object = JSON.parse(JSON_string);
        // console.log(JSON_object);
        var keys = getKeys(JSON_string);
        console.log(keys);
        // console.log(JSON_object["Mushroom Grilled Cheese Sandwich (aka The Mushroom Melt)"].img);
        //Make html Elements for saved recipes
        for(var i=0; i<keys.length; i++){
            var cut_title = keys[i].split(" ").join("").replace(/[^a-zA-Z ]/g, "");
            console.log(cut_title);
            var div = $("<div>").addClass(cut_title);
            var title = $("<p>").text(keys[i]);
            var link = $("<a target='_blank'>").attr("href", JSON_object[keys[i]].url);
            var img = $("<img>").attr("src", JSON_object[keys[i]].img)
            var btn = $("<button class='remove-recipe'>").attr("data-rough", keys[i]);
            btn.attr("data-cut", cut_title);
            btn.text("Remove");

            link.append(img);

            div.append(title);
            div.append(link);
            div.append(btn);
            $("#recipes").append(div);
        }
    })
})

//save recipe into firebase
$(document).on("click", ".add-recipe", function(){
    var userId = auth.currentUser.uid;
    var rough_title = $(this).attr("data-title");
    var url = $(this).attr("data-url");
    var img_url = $(this).attr("data-src");

    var userData = {
        url: url,
        img: img_url
    };

    var updates = {};
    updates["/users/" + userId + "/recipes/" + rough_title] = userData;

    return db.ref().update(updates);
})

//remove recipe from firebase
$(document).on("click", ".remove-recipe", function(){
    var userId = auth.currentUser.uid;
    var rough_title = $(this).attr("data-rough");
    var cut_title = $(this).attr("data-cut");
    console.log(cut_title);
    console.log(rough_title);

    $("#recipes").empty();
    $("."+cut_title).empty();

    return db.ref("/users/" + userId + "/recipes/" + rough_title).remove();
})

//Find/make valid keys for firebase children
function getKeys(json_string){
    var temp_string = "";
    var key_arr = [];
    var bracket_counter = 0;
    var quot_counter = 0;

    for(var i=0; i<json_string.length; i++){
        if(json_string[i] == "\""){
            quot_counter++;
            continue;
        }
        if(json_string[i] == ":" && bracket_counter == 1){
            key_arr.push(temp_string);
        }
        if(bracket_counter==1 && quot_counter%2 == 1){
            temp_string = temp_string + json_string[i];
        }
        if(json_string[i]=="}"){
            temp_string = "";
            bracket_counter--;
        }
        if(json_string[i]=="{"){
            bracket_counter++;
        }
    }

    console.log(key_arr);
    return key_arr;
}