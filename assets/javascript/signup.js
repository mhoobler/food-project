


// Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKkOqtPx4XjAKEsuOuytwFr3O_ZgfPe1A",
    authDomain: "projectusers.firebaseapp.com",
    databaseURL: "https://projectusers.firebaseio.com",
    projectId: "projectusers",
    storageBucket: "projectusers.appspot.com",
    messagingSenderId: "159557786382"
  };
  firebase.initializeApp(config);



//Register
  function register(){
    var userEmail = $('#inputEmail').val();
    var userPassword = $('#inputPassword').val();
    console.log(userEmail);
    console.log(userPassword);
   
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      alert("Error:"+errorMessage)
    });
  
  
  }
  