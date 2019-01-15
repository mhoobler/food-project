// Initialize Firebase
var config = {
  apiKey: "AIzaSyAKkOqtPx4XjAKEsuOuytwFr3O_ZgfPe1A",
  authDomain: "projectusers.firebaseapp.com",
  databaseURL: "https://projectusers.firebaseio.com",
  projectId: "projectusers",
  storageBucket: "",
  messagingSenderId: "159557786382"
};
firebase.initializeApp(config);

//if user is logged import '
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    window.location.href = "LoggedIn.html";

  } else {
    // No user is signed in.
    window.location.href = "signupPage.html";

  }
});
//loggin
  function register(){
    var userEmail = $('#inputEmail').val();
    var userPassword = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error: "+ errorMessage);
      // ...
    });
  }
  
