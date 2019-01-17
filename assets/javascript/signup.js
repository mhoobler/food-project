


// Initialize Firebase

  // Initialize Firebase


//Register
var errorCheck = false;
$("#register").on("click", function(){
    var userEmail = $('#inputEmail').val();
    var userPassword = $('#inputPassword').val();
    console.log(userEmail);
    console.log(userPassword);
   
    auth.createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      errorCheck = true;
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      alert("Error:"+errorMessage)
    }).then(function() {
      if(!errorCheck){
        //fix moving from signup
        window.location.href = "virtualproject2.html";
      }
    });;
  
  
  })
  
  