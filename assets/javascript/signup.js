


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
        var userEmail = auth.currentUser.email;
        var userID = auth.currentUser.uid;
        var postData = {
          email: userEmail,
          joinDate: "11-11-11",
          testArray: []
        };
      
        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/users/' + userID] = postData;
      
        return firebase.database().ref().update(updates).then(function() {window.location.href = "virtualproject2.html"});
      }
    });;
  
  
  })
  
  