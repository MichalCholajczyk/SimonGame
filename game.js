//**************GAME FUNCTIONALITY**************
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//Checking if the key was presed and adding it to pressed keys in a list

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        //calling the nextSequence() after a second
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");

      // Changing the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //calling startOber() if the user got the sequence wrong
      startOver();
    }
}


function startOver() {
  //this function resets the values of the level
  level = 0;
  gamePattern = [];
  started = false;
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//**************ANIMATIONS**************

//adding animations after a click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//**************SOUND**************

//adding sound after a keypress
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// $(".btn").click(function () { 
//   var name= $(this).attr("id");
//   var playAudio = new Audio("sounds/" +  name  + ".mp3");
//    playAudio.play();
//}); 
