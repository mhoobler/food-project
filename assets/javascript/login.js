// Initialize Firebase

  // Initialize Firebase
var errorCheck = false;
$("#login").on("click", function(){
    var loginEmail = $('#loginEmail').val();
    var loginPassword = $('#loginPassword').val();
    auth.signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error) {
      // Handle Errors here.
      errorCheck = true;
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      alert("Error:"+errorMessage)
  }).then(function() {
    if(!errorCheck){
      window.location.href = "virtualproject2.html";
    }
  });
})