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
