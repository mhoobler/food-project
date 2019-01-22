
$(document).on("click", ".category-img", function(){
    if($(window).width() < 768){
        $("#submit-ing").text("submit");
        var target = $(this).attr("data-target");
        console.log(target);
        var targetEle = $("#"+target);

        $(".input-form").slideUp("fast");

        //targetEle.removeClass("toggle");
        targetEle.slideDown("fast");
    }
})

$("#submit-ing").on("click", function(){
    var array = [];
    $("input").each(function(){
        if($(this).prop("checked")){
            array.push($(this).attr("value"));
        }
    })
    console.log(array);

    var user = auth.currentUser.uid;
    var userData = array

    var updates = {};
    updates["/users/" + user + "/testArray"] = userData;

    return db.ref().update(updates).catch(function(error){
        if(!error){
            $("#submit-ing").text("Saved");
        }
        else{
            console.log(error);
        }

    })
})
$(document).mouseenter(function(main_event) {
    $("label.btn").mouseenter(function(event){
        var value = $(event.target).children().attr("value")
        console.log($(event.target).children().attr("value"));
        $("#nutrition-facts").stop(true,true).css("display", "block");
        $("#nutrition-facts").offset({top: event.pageY, left: event.pageX});
        console.log("entered");
        return firebase.database().ref('/ndbno/' + value).once('value').then(function(snapshot) {
            var ndbno = snapshot.val();
            console.log(ndbno);
            apiCall(ndbno);
        });
    
    })

    $("label.btn").mouseleave(function(){
        $("#nutrition-facts").stop(true,true).css("display", "none");
    })
})

function apiCall(code){
    console.log(code);
    console.log("ajax");

    var queryURL= "https://api.nal.usda.gov/ndb/V2/reports?ndbno="+code+"&type=b&format=json&api_key=2MMK5UV8le8CUQZ0GEdym5cR2LRSXZDJHgXzVj1U"
    $.ajax({
        url: queryURL,
        method: "GET"}).then(function(response){
            console.log(response.foods[0].food.nutrients);
            doMore(response.foods[0].food.nutrients);
    }); 
}

function doMore(nutrients){
    console.log("nuts");
    $("#cal").text(nutrients[1].measures[0].value + nutrients[1].measures[0].eunit);
    $("#prot").text(nutrients[2].measures[0].value + nutrients[2].measures[0].eunit);
    $("#fat").text(nutrients[3].measures[0].value + nutrients[3].measures[0].eunit);
    $("#carb").text(nutrients[4].measures[0].value + nutrients[4].measures[0].eunit);
}