var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

//starts the game
$("h1").click(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
  $("h1").text("Level: " + level);
});

//records which color was clicked, pushes to userClickedPattern
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  console.log("clicked pattern: " + userClickedPattern);
});

//checks if clicked matches gamePattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
      console.log("correct");
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function () {
      level = 0;
      userClickedPattern = [];
      gamePattern = [];
      gameStarted = false;
      $("h1").text("Click Here To Start");
    }, 1000);
    console.log("incorrect");
  }
}

//picks next color and adds it to the array
function nextSequence() {
  level++;
  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  $("h1").text("Level: " + level);
  console.log("game pattern: " + gamePattern);
}

//plays the sound of the button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animates the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
