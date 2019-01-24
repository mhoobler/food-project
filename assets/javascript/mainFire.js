var config = {
    apiKey: "AIzaSyARqgVy7kM6Bvx4e1gmYD6zb7Mx3a-9g1g",
    authDomain: "food-project-a4fe4.firebaseapp.com",
    databaseURL: "https://food-project-a4fe4.firebaseio.com",
    projectId: "food-project-a4fe4",
    storageBucket: "food-project-a4fe4.appspot.com",
    messagingSenderId: "862584001432"
};
firebase.initializeApp(config);

auth = firebase.auth();
db = firebase.database();

function checkUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          updateNav(true);
          return true
        } else {
          // No user is signed in.
          updateNav(false);
          if(getWindowLocation() != "signupPage.html" && getWindowLocation() != "login.html" && getWindowLocation() != "index.html" && getWindowLocation() != "food-project"){
            document.location.href = "signupPage.html";
          }
          return false
        }
      });
}

function updateNav(bool){
    if(bool == true){
        $(".auth").css("display", "none");
        $(".user").css("display", "absolute");
    } else if(bool == false){
        $(".auth").css("display", "absolute");
        $(".user").css("display", "none");
    }
}

checkUser();

$("#logout").on("click", () =>{
    firebase.auth().signOut().then(() => {
        console.log("signed-out");
    }, error => {
        console.log(error);
    });
});

function getWindowLocation(){
    var longstring = window.location.href;
    var array = longstring.split("/");
    console.log(array[array.length -1]);
    return array[array.length -1];
}