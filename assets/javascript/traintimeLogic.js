// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyB3YXn8vRVpObr9rwhSbcyK-1J9ibPB7rY",
    authDomain: "train-scheduler-en.firebaseapp.com",
    databaseURL: "https://train-scheduler-en.firebaseio.com",
    projectId: "train-scheduler-en",
    storageBucket: "train-scheduler-en.appspot.com",
    messagingSenderId: "655416431828"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trnName = $("#train-name-input").val().trim();
    var trnDest = $("#destination-input").val().trim();
    var trnTime = moment($("#time-input").val().trim(), "hh:mm").subtract(1, 'years').format("X");
    var trnFreq = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrn = {
        trainName: trnName,
        destination: trnDest,
        startTime: trnTime,
        frequency: trnFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrn);

    // Logs everything to console
    console.log(newTrn.trainName);
    console.log(newTrn.destination);
    console.log(newTrn.startTime);
    console.log(newTrn.frequency);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trnName = childSnapshot.val().trainName;
    var trnDest = childSnapshot.val().destination;
    var trnTime = childSnapshot.val().startTime;
    var trnFreq = childSnapshot.val().frequency;


		//Conversion
			
			 // Current Time
		    var trnTime = moment();
			diffTime = moment().diff(moment(trnTime), "minutes");
			
			// Time apart (remainder)
			timeRemaining = diffTime % trnFreq;

			// Minute Until Train
			minutesTillTrain = trnFreq - timeRemaining;
    		
    		// Next Train
			nextTrain = moment().add(tMinutesTillTrain, "minutes");
			nextTrainFormat = moment(nextTrain).format('hh:mm');

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" +
        trnFreq + "</td><td>" + nextTrainFormat + "</td><td>" + minutesTillTrain + "</td></tr>");
});