

$(document).on("click", ".selected", function() {
    $(this).remove();
})

// $(".grid-item").mouseenter(function(){
//     var value = $(this).attr("value");
//     console.log(value);

//     return firebase.database().ref('/ndbno/' + value).once('value').then(function(snapshot) {
//     var ndbno = snapshot.val();
//     console.log(ndbno);
//     apiCall(ndbno);
//     });
// }).mouseleave(function(){
//     $("#nutrition-facts").css("display", "none");
//     $("#nutrition-facts").css("float", "none");
// })

//farhan hover try
// $( document ).ready(function() {
//   $(".body-panel .grid-item").mouseenter(function(){
//     // $("#nutrition-facts").css("display", "none");
//     // $("#nutrition-facts").css("float", "none");
// }).mouseleave(function(){
//     var value = $(this).attr("value");
//     console.log(value);

//     return firebase.database().ref('/ndbno/' + value).once('value').then(function(snapshot) {
//     var ndbno = snapshot.val();
//     console.log(ndbno);
//     apiCall(ndbno);
//     });
// })

//=========================================================================================
//     $(".grid-item").on({
//     mouseenter: function(event) {
//         var value = $(this).attr("value");
//         console.log(value);
//             return firebase.database().ref('/ndbno/' + value).once('value').then(function(snapshot) {
//     var ndbno = snapshot.val();
//     console.log(ndbno);
//     apiCall(ndbno);
//     });


//         $("#nutrition-facts").css({display:block}).show();
//     },
//     mouseleave: function() {
//         $("#nutrition-facts").hide();
//     }
// });

});






// hover stuff
// $(".body-panel .grid-item").mouseenter(function(){
//     // $("#nutrition-facts").css("display", "none");
//     // $("#nutrition-facts").css("float", "none");
// }).mouseleave(function(){
//     var value = $(this).attr("value");
//     console.log(value);

//     return firebase.database().ref('/ndbno/' + value).once('value').then(function(snapshot) {
//     var ndbno = snapshot.val();
//     console.log(ndbno);
//     apiCall(ndbno);
//     });
// })

function apiCall(code){
    console.log(code);

    var queryURL= "https://api.nal.usda.gov/ndb/V2/reports?ndbno="+code+"&type=b&format=json&api_key=2MMK5UV8le8CUQZ0GEdym5cR2LRSXZDJHgXzVj1U"
    $.ajax({
        url: queryURL,
        method: "GET"}).then(function(response){
            console.log(response.foods[0].food.nutrients);
            doMore(response.foods[0].food.nutrients);
    }); 
}

//hover thing, need to rename
// function doMore(nutrients){
//     var $someElement = $("#nutrition-facts");
//     $someElement.css("display", "inline");
//     $someElement.css("float", "left");
//     $("#cal").text(nutrients[1].measures[0].value);
//     $(document).mousemove(function(e) { 
//         $someElement.offset({ top: e.pageY, left: e.pageX }); 
//     }).click(function () { 
//         $(this).unbind("mousemove"); 
//     }); 
// }

var add_array;

$(".grid-item").on("click", function(){
    $("#selection").empty();
    var value = $(this).attr("value");
    // var user = auth.currentUser.uid;
    // var updates = {};
    var counter = 0;
    console.log(value);
    if(add_array == null){
        add_array = [value];
        var p = $("<p>");
        p.text(value);
        $("#selection").append(p);
    } else {
        for(var i=0; i<add_array.length; i++){
            if(value != add_array[i]){
                counter++;
            }
            if(counter == add_array.length){
                add_array.push(value);
                for(i=0; i<add_array.length; i++){
                    var p = $("<p>");
                    p.text(add_array[i]);
                    $("#selection").append(p);
                }
            }
        }
    }

    if($("#line").attr("value") == "saved" || $("#line").attr("value") == null){
        $("#line").attr("value", "not-saved");
        $("#line").text("Click Here to Save your selection to your Profile");
        console.log($("#line"));
    }
})


$("#push-selection").on("click", function(){
    var user = auth.currentUser.uid;
    var userData = add_array

    var updates = {};
    updates["/users/" + user + "/testArray"] = userData;

    return db.ref().update(updates).catch(function(error){
        if(!error){
            $("#line").text("Your selection was pushed");
            $("#line").attr("value", "saved");
        }
        else{
            console.log(error);
        }

    })
})

db.ref("/users/").on("value", function(snapshot) {
    console.log(snapshot.val());
    userId = auth.currentUser.uid;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var array = snapshot.val().testArray;
        $("#selection").empty();
        
        for(i=0; i<array.length; i++){
            var p = $("<p>");
            p.text(array[i]);
            $("#selection").append(p);
        }
    });
    // $("#click-value").text(snapshot.val().clickCount);
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  $("#cart").on("click", function(){
    window.location.href = "recipe-search.html";
  })