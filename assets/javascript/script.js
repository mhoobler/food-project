// Initialize Firebase
var config = {
    apiKey: "AIzaSyARqgVy7kM6Bvx4e1gmYD6zb7Mx3a-9g1g",
    authDomain: "food-project-a4fe4.firebaseapp.com",
    databaseURL: "https://food-project-a4fe4.firebaseio.com",
    projectId: "food-project-a4fe4",
    storageBucket: "food-project-a4fe4.appspot.com",
    messagingSenderId: "862584001432"
};
firebase.initializeApp(config);


// elements to use
var loginBtn = $("#login-btn")
//login event
loginBtn.on("click", e => {
    e.preventDefault();
    //get values for email & password
    var email = $("#email-input").val();
    var password = $("#password-input").val();
    auth = firebase.auth();

    //log in useing firebase function
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message))
    console.log(promise);
});

//login event
$("#signup-btn").on("click", e => {
    e.preventDefault();
    //get values for email & password
    var email = $("#email-input").val();
    var password = $("#password-input").val();
    var auth = firebase.auth();

    //CHECK FOR REAL EMAIL HERE

    //sign up using firebase function
    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message))
    console.log(promise);
});

$("#get-user").on("click", () => {
    auth = firebase.auth();
    console.log(auth.currentUser);
})