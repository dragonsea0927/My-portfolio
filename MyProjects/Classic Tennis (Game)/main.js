var canvas;
var canvasContext;
var ballX = 0;
var ballSpeedX = 4;
var ballY = 0;
var ballSpeedY = 2.5;
var paddle1Y = 260;
var paddle2Y = 260;
const paddleHeight = 120;
var player1Score = 0;
var player2Score = 0;
const WinningScore = 4;
var showingWinScreen = 0;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
}

function handleMouseClick(evt) {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 120;
  setInterval(function () {
    moveEverything();
    darwEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousedown", handleMouseClick);

  canvas.addEventListener("mousemove", function (evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - paddleHeight / 2;
  });
};

function ballReset() {
  if (player1Score >= WinningScore || player2Score >= WinningScore) {
    showingWinScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {
  var paddle2YCenter = paddle2Y + paddleHeight / 2;
  if (paddle2YCenter < ballY - 8) {
    paddle2Y += 4;
  } else if (paddle2YCenter > ballY + 58) {
    paddle2Y -= 4;
  }
}

function moveEverything() {
  if (showingWinScreen) {
    return;
  }
  computerMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.08;
    } else {
      player2Score++;
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.08;
    } else {
      player1Score++;
      ballReset();
    }
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet() {
  for (var i = 0; i < canvas.height; i += 35) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "#ffffff80");
  }
}

function darwEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  if (showingWinScreen) {
    if (player1Score >= WinningScore) {
      canvasContext.fillStyle = "#75FF33";
      canvasContext.font = "40px Nosifer";
      canvasContext.fillText("You Won!", 510, 360);
    } else if (player2Score >= WinningScore) {
      canvasContext.fillStyle = "#FF5733";
      canvasContext.font = "40px Nosifer";
      canvasContext.fillText("Computer Won!", 425, 360);
    }
    canvasContext.fillStyle = "#3375FF";
    canvasContext.font = "40px Fredoka One";
    canvasContext.fillText("Click To Continue", 480, 600);
    return;
  }
  colorRect(0, paddle1Y, 8, paddleHeight, "white");
  colorRect(canvas.width - 8, paddle2Y, 8, paddleHeight, "white");
  canvasContext.fillStyle = "aqua";
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  canvasContext.fill();
  canvasContext.font = "20px arial";
  drawNet();
  console.log("Lakshan");
  canvasContext.fillStyle = "white";
  canvasContext.font = "20px MuseoModerno";
  canvasContext.fillText("You : " + player1Score, 250, 100);
  canvasContext.fillText("Computer : " + player2Score, canvas.width - 250, 100);
}
function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
