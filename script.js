var gameField = document.getElementById("GameField");
for (var i = 0; i != 10; i++) {
  for (var j = 0; j != 10; j++) {
    gameField.innerHTML += '<div class="Cube" id="' + j + "-" + i + '"><div/>';
  }
}

var lastMovement = "R";

var Direction = "R";

function SetDirection(event) {
  switch (event.key) {
    case "d":
      Direction = "R";
      break;
    case "a":
      Direction = "L";
      break;
    case "s":
      Direction = "D";
      break;
    case "w":
      Direction = "U";
      break;
  }
}

document.body.addEventListener("keypress", SetDirection);

var lenght = 3;
var score = 0;

var NowLocation = [4, 4];

var Point = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
console.log("Point = " + Point);
SetPoint(Point[0], Point[1]);
function SetNewPoint() {
  document.getElementById(Point[0] + "-" + Point[1]).style.backgroundColor =
    "white";
  Point = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  while (
    document.getElementById(Point[0] + "-" + Point[1]).style.backgroundColor ==
    "red"
  ) {
    console.log("res");
    Point = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
  SetPoint(Point[0], Point[1]);
}

var playerSnake = [
  {
    x: 4,
    y: 4,
  },
];

console.log(playerSnake);
SetPlayer(playerSnake[0].x, playerSnake[0].y);

function SetPlayer(x, y) {
  var item = document.getElementById(x + "-" + y);
  item.style.backgroundColor = "red";
}
function SetNoPlayer(x, y) {
  document.getElementById(x + "-" + y).style.backgroundColor = "white";
}
function SetPoint(x, y) {
  document.getElementById(x + "-" + y).style.backgroundColor = "yellow";
}

function Draw() {
  if (playerSnake.length > lenght) {
    SetNoPlayer(playerSnake[0].x, playerSnake[0].y);
    playerSnake.shift();
  }
  for (var i = 0; i != playerSnake.length; i++) {
    SetPlayer(playerSnake[i].x, playerSnake[i].y);
  }
}

function MoveUP() {
  console.log(NowLocation[1]);
  if (NowLocation[1] == 0) {
    NowLocation[1] = 10;
  }
  playerSnake.push({ x: NowLocation[0], y: NowLocation[1] - 1 });
  NowLocation[1]--;
  lastMovement = "U";
}
function MoveDown() {
  if (NowLocation[1] == 9) {
    NowLocation[1] = -1;
  }
  playerSnake.push({ x: NowLocation[0], y: NowLocation[1] + 1 });
  NowLocation[1]++;
  lastMovement = "D";
}
function MoveLeft() {
  if (NowLocation[0] == 0) {
    NowLocation[0] = 10;
  }
  playerSnake.push({ x: NowLocation[0] - 1, y: NowLocation[1] });
  NowLocation[0]--;
  lastMovement = "L";
}
function MoveRight() {
  if (NowLocation[0] == 9) {
    NowLocation[0] = -1;
  }
  playerSnake.push({ x: NowLocation[0] + 1, y: NowLocation[1] });
  NowLocation[0]++;
  lastMovement = "R";
}

(function () {
  console.log("Push");

  switch (Direction) {
    case "U":
      if (lastMovement == "D") {
        MoveDown();
      } else {
        MoveUP();
      }
      break;
    case "D":
      if (lastMovement == "U") {
        MoveUP();
      } else {
        MoveDown();
      }
      break;
    case "L":
      if (lastMovement == "R") {
        MoveRight();
      } else {
        MoveLeft();
      }
      break;
    case "R":
      if (lastMovement == "L") {
        MoveLeft();
      } else {
        MoveRight();
      }

      break;
  }
  if (
    document.getElementById(NowLocation[0] + "-" + NowLocation[1]).style
      .backgroundColor == "yellow"
  ) {
    SetNewPoint();
    lenght++;
    score++;
    document.getElementById("ScoreShow").textContent = score;
  }

  if (
    document.getElementById(NowLocation[0] + "-" + NowLocation[1]).style
      .backgroundColor == "red"
  ) {
    alert("ded");
  } else {
    Draw();
  }

  setTimeout(arguments.callee, 500);
})();
