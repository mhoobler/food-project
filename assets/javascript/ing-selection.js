$(document).on("click", ".category-img", function(){
    $("#submit-ing").text("submit");
    var target = $(this).attr("data-target");
    console.log(target);
    var targetEle = $("#"+target);

    $(".input-form").addClass("toggle");

    targetEle.removeClass("toggle");
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