

db.ref('/users/').on("value", function(snap){
    var user = auth.currentUser.uid;
    firebase.database().ref('/users/' + user).once('value').then(function(snapshot) {
        var array = snapshot.val().testArray;
        
        for(i=0; i<array.length; i++){
            var p = $("<p>");
            p.text(array[i]);
            $("#ingredients-header").append(p);
        }
    });
})

db.ref('/users/').on("value", function(snap){
    var user = auth.currentUser.uid;
    firebase.database().ref('/users/' + user).once('value').then(function(snapshot) {
        var array = snapshot.val().recipes;
        console.log(array);
        console.log(array["Apple Dumplings"]);
        console.log(array.length);
        
        for(i=0; i<array.length; i++){
            var p = $("<p>");
            p.text(array[i]);
            console.log(array[i]);
            $("#recipes-header").append(p);
        }
    });
})