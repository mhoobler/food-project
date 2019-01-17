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
    
        $("#gif-view").empty();
    
        $.ajax({
            url: queryURL,
            method: "GET"}).then(function(response){
                console.log({ response: response });       
        //Insert three dish pics with title   
            for (var k=0; k < 3; k++){
    
                var usableResponse = JSON.parse(response);
                console.log(usableResponse);
                
                var dishTitle = $("<div>").text(usableResponse.recipes[k].title);
                $("#recipes").append(dishTitle);
    
                var nextDish = $("<img>").attr('src', usableResponse.recipes[k].image_url);
                $("#recipes").append(nextDish);
            };
        }); 
    })
    
})