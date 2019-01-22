


// Initialize Firebase

  // Initialize Firebase


//Register
var errorCheck = false;
$("#register").on("click", function(){
    var userEmail = $('#inputEmail').val();
    var userPassword = $('#inputPassword').val();
    console.log(userEmail);
    console.log(userPassword);
    var date = new Date();
    var date_string = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
   
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
        var userEmail = auth.currentUser.email;
        var userID = auth.currentUser.uid;
        var postData = {
          email: userEmail,
          joinDate: date_string,
          testArray: [],
          recipe: []
        };
      
        // Get a key for a new Post.
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/users/' + userID] = postData;
      
        return firebase.database().ref().update(updates).then(function() {window.location.href = "ing-selection.html"});
      }
    });;
  
  
  })
  
  