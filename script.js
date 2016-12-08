'use strict';

(function () {

    // Cells which will contain questions
    var cells = document.getElementsByClassName('bingocell');

    // Firebase
    var db = initialize();

    // App logic
    getQuestions(db)
    .then(function (questions) {

        // Randomly select questions
        var selectedQuestions = selectItems(questions, cells.length);
        // Fill cells with selected questions
        fillCells(cells, selectedQuestions);
    })
    .catch(function (err) {

        alert('An error occurred: ' + err.message);
        console.error(err);
    });

    /**
     * Initialize Firebase and get DB service instance.
     * Refer to: https://firebase.google.com/docs/web/setup
     *
     * @return firebase database service instance.
     **/
    function initialize() {

        var app = firebase.initializeApp({
            apiKey: "AIzaSyAPn_4JxKgrXG1S8HXbDRylVj8PK8pTNCg",
            authDomain: "icebreaker-fb236.firebaseapp.com",
            databaseURL: "https://icebreaker-fb236.firebaseio.com",
            storageBucket: "icebreaker-fb236.appspot.com",
            messagingSenderId: "719862173745"
        });

        // Get a reference to the database service
        return app.database();
    }

    /**
     * Retrieve questions from Firebase.
     *
     * @return Promise
     * @resolves array of questions
     **/
    function getQuestions(db) {

        return db.ref('/').once('value')
        .then(function (snapshot) {

            return snapshot.val();
        });
    }

    /**
     * Randomly select items from array.
     *
     * @param array - array of questions
     * @param howMany - how many items to select
     * @returns new array with selected items
     **/
    function selectItems(array, howMany) {

        var newArray = [];

        // Avoid index out of range
        howMany = Math.min(howMany, array.length);

        for (var i = 0; i < howMany; ++i) {
            var randomIndex = parseInt(Math.random() * array.length);
            // Add to selected items
            newArray.push(array[randomIndex]);
            // Remove item from old array (avoid repeated selection)
            array.splice(randomIndex, 1);
        }

        return newArray;
    }

    /**
     * Fills the bingo cells with the selected
     * questions.
     *
     * @param cells - array of cells
     * @param questions - array of selected questions
     * @return
     **/
    function fillCells(cells, questions) {

        var count = Math.min(questions.length, cells.length);

        for (var i = 0; i < count; ++i) {
            cells[i].innerHTML = questions[i] + '<input type="text"></input>';
        }
    }
})();