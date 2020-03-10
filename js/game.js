var level = 0;
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var complete = false;
var userClickedPattern = [];
var gameStarted = false;
$(".btn").click(handleClick);
$("body").on('keydown touchend', function() {
  if (gameStarted === false) {
    gameStarted = true;
    nextSequence();
    $("#level-title").text("Level " + level);
  }
});

function nextSequence() {
  var randomNumber = (Math.floor((Math.random() * 4)));
  gamePattern.push(buttonColors[randomNumber]);
  level++;
  $("#level-title").text("Level " + level);
  console.log(gamePattern);
  setTimeout(playSequence, 500, buttonColors[randomNumber]);

}

function handleClick() {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  colorAnimation(userChosenColor);
  pressedAnimation(userChosenColor);
  complete = checkIfComplete();
  checkAnswer(complete);

}

function playSound(input) {
  var sound = new Audio("sounds/" + input + ".mp3");
  sound.play();
}

function colorAnimation(input) {
  $("#" + input).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function pressedAnimation(input) {
  $("#" + input).addClass("pressed");
  setTimeout(function() {
    $("#" + input).removeClass("pressed");
  }, 500);
}

function playSequence(selected) {
  playSound(selected);
  colorAnimation(selected);
  console.log(selected);
}


function endGame() {
  gameStarted = false;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 0;
  $("#level-title").text("Game Over - Press any key to restart");
  var endSound = new Audio("sounds/wrong.mp3");
  endSound.play;
}

function checkIfComplete() {
  if (userClickedPattern.length < gamePattern.length) {
    return false;
  } else if (userClickedPattern.length === gamePattern.length) {
    return true;
  }
}

function checkAnswer(complete) {
  for (i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      console.log("success!");
      if (complete === true) {
        userClickedPattern.length = 0;
        nextSequence();
      }
    } else if (userClickedPattern[i] !== gamePattern[i]) {
      console.log("Wrong Answer");
      endGame();
      break;
    }
  }
}
