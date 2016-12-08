var config = {
   apiKey: "AIzaSyAPn_4JxKgrXG1S8HXbDRylVj8PK8pTNCg",
   authDomain: "icebreaker-fb236.firebaseapp.com",
   databaseURL: "https://icebreaker-fb236.firebaseio.com",
   storageBucket: "icebreaker-fb236.appspot.com",
   messagingSenderId: "719862173745"
 };
 firebase.initializeApp(config);
 // Get a reference to the database service
var db = firebase.database();

db.ref('/').once('value').then(function(snapshot) {
		var questions=snapshot.val();

		var cells = document.getElementsByClassName('bingocell');

		for (var i= 0; i< cells.length; i++) {
			var randomnumber = parseInt(Math.random() * questions.length);
			cells[i].innerHTML = questions[randomnumber] + "<input type='text'></input>";
			questions.splice(randomnumber, 1);

		console.log(questions);

		}
		
});