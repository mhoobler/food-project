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
    if(auth.currentUser !== null){
        return true;
    } else {
        console.log("not logged in");
        return false;
    }
}
