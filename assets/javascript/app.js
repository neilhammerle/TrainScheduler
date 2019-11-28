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
      firebase.initializeApp(firebaseConfig);


  var database = firebase.database();
  var trainName = "";
  var destination = "";
  var firstTime = "";
  var frequency = "";

  $("#add-train").on("click", function(){
      event.preventDefault();

      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      time = $("#firstTime").val().trim();
      frequency = $("#frequency").val().trim();

     database.ref().push({
         trainName,
         destination,
         time,
         frequency,
     });

     $(".trainName").val("");
     $(".destination").val("");
     $(".time").val("");
     $(".frequency").val("");

    });

    database.ref().on("child_added",function(childSnapshot){

        var csv = childSnapshot.val();

        console.log("===============");
        console.log("train Name: ", csv.trainName);
        console.log("destination: ", csv.destination);
        console.log("first train time: ", csv.time);
        console.log("frequency:", csv.frequency);

        var currentTime = moment().format("HH:mm");

        var firstTime = moment(csv.time, "HH:mm");

        var difference = moment().diff(moment(firstTime), "minutes");

        var f = parseInt(csv.frequency);
        var remain = difference % f;

        var minsAway = f - remain;

        var nextArrival = moment().add(minsAway, "minutes").format("HH:mm");

        $("#trainTable").append("<tr><td>" + csv.trainName+"</tr><td>"+csv.destination+"</tr><td>"+csv.frequency);
        });
});