$(document).ready(function(){

var firebaseConfig = {
    apiKey: "AIzaSyBdJO6apaIaqKPnjADMDH8xep5_yivp2ek",
    authDomain: "trainscheduler-f8cee.firebaseapp.com",
    databaseURL: "https://trainscheduler-f8cee.firebaseio.com",
    projectId: "trainscheduler-f8cee",
    storageBucket: "trainscheduler-f8cee.appspot.com",
    messagingSenderId: "625112718548",
    appId: "1:625112718548:web:5db029da3db0a79fe9af41",
    measurementId: "G-72KC2HB4TL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();

  $("#addTrainBtn").on("click", function(){
      var newName = $("#trainName").val().trim();
      var newDestination = $("#destination").val().trim;
      var newFirstTime = $("#firsttime").val().trim();
      var newFrequency = $("#frequency").val().trim();

      var newTrain = {
          name: newName,
          dest: newDestination,
          first: newFirstTime,
          freq: newFrequency,
      }
      database.ref().push(newTrain);
      console.log(newTrain);

      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTime").val("");
      $("#frequency").val("");

      console.log ("newTrain: " + newTrain);
      console.log ("Name: " + newTrain.name);
      console.log ("Destination: " + newTrain.dest);
      console.log ("First Time: " + newTrain.first);
      console.log ("Frequency: " + newTrain.freq);

      return false;

  });

  database.ref().on("child_added", function(childSnapshot) {
      console.log("Child Snapshot Value: " + childSnapshot.val());
      var newName = childSnapshot.val().name;
      var newDestination = childSnapshot.val().dest;
      var newFirstTime = childSnapshot.val().first;
      var newFrequency = childSnapshot.val().freq;

      console.log('newFirstTime', newFirstTime)
      console.log("newName: " + newFirstTime);
      console.log("newDestination: " + newDestination);
      console.log("newFrequency: " + newFrequency);

      var currentTime = moment();
      console.log(moment(currentTime).format("hh:mm"));

      var firstTimeConverted = moment(newFirstTime, "hh:mm").subtract(1, "days");
      var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("Difference in time: " + timeDiff);

      var remainder = timeDiff % newFrequency;
      console.log("Remainder: ", remainder);

      var minsUntilTrain = newFrequency - remainder;
      console.log("Time Til Train: " + minsUntilTrain);

      var nextTrainTime = moment().add(minsUntilTrain, "minutes");
      console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm"));

      $("#trainTable > tbody").append("<tr><td>" + newName + "<tr><td>" + newDestination + "<tr><td>" + newFrequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain);

      return false;

  });

});
