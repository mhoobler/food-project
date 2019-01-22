$("#search-btn").on("click", function(){
    
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
                
                var dishTitle = $("<div>").text(usableResponse.recipes[k].title);
                
    
                var nextDish = $("<img>").attr('src', usableResponse.recipes[k].image_url);
                nextDish.addClass("rounded-circle");
                var checkBox = $("<button>").attr("class", "recipe-btn");
                checkBox.text("x");
                checkBox.attr("data-src", usableResponse.recipes[k].image_url)
                checkBox.attr("data-url", usableResponse.recipes[k].source_url);
                checkBox.attr("data-title", usableResponse.recipes[k].title);

                dishTitle.append(checkBox);
                dishTitle.append(nextDish);
                $("#recipes").append(dishTitle);
            };
        }); 
    })
    
})

$(document).on("click", "#show-recipes", function(){
    $("#recipes").empty();
    var userId = auth.currentUser.uid;
    db.ref("/users/"+userId).on("value", function(snap){
        var test = JSON.stringify(snap.child('recipes'));
        console.log(test);
        var test2 = JSON.parse(test);
        // console.log(test2);
        var keys = getKeys(test);
        console.log(keys);
        console.log(test2["Mushroom Grilled Cheese Sandwich (aka The Mushroom Melt)"].img);
        for(var i=0; i<keys.length; i++){
            var div = $("<div>");
            var title = $("<h3>").text(keys[i]);
            var link = $("<a>").attr("href", test2[keys[i]].url);
            var img = $("<img>").attr("src", test2[keys[i]].img)
            div.append(title);
            link.append(img);
            div.append(link);
            $("#recipes").append(div);
        }
    })
})

$(document).on("click", ".recipe-btn", function(){
    var userId = auth.currentUser.uid;
    var title = $(this).attr("data-title");
    var url = $(this).attr("data-url");
    var img_url = $(this).attr("data-src")

    var userData = {
        url: url,
        img: img_url
    };

    var updates = {};
    updates["/users/" + userId + "/recipes/" + title] = userData;

    return db.ref().update(updates);
})

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