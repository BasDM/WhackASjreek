let currMoleTile;
let currPlantTile;
let score = 0;
let highScore = 0;
let gameOver = true;
let clicked = false;

function startGame() {
  document.getElementById("highScore").innerHTML =
    "Highscore: " + highScore.toString();
  document.getElementById("score").innerText = "0";
  document.getElementById("play").innerText = "Play";
  score = 0;
  gameOver = false;
}

window.onload = function () {
  setGame();
};

window.addEventListener("load", function () {
  mySong.play();
});

function setGame() {
  //set up the grid for the game board in html
  for (let i = 0; i < 9; i++) {
    //i goes from 0 to 8, stops at 9
    //<div id="0-8"></div>
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
    let playButton = document.getElementById("play");
    playButton.addEventListener("click", startGame);
  }
  setInterval(setMole, 1000); // every 1 second
  setInterval(setPlant, 2000); // every 2 seconds
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }

  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./media/Chad.png";

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
  clicked = false;
}

function setPlant() {
  if (gameOver) {
    return;
  }

  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }

  let plant = document.createElement("img");
  plant.src = "./media/sjreekDank.png";

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }

  if (this == currMoleTile && !clicked) {
    score += 1;
    clicked = true;
    document.getElementById("score").innerText = score.toString(); //update score
  } else if (this == currPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString();
    document.getElementById("play").innerText = "Try again";
    if (score >= highScore) {
      highScore = score;
    }
    gameOver = true;
  }
}

const mySong = document.getElementById("mySong");
let icon = document.getElementById("icon");

icon.onclick = function playMusic() {
  if (mySong.paused) {
    mySong.play();
    icon.src = "./media/shrekOpen.png";
  } else {
    mySong.pause();
    icon.src = "./media/shrekClosed.png";
  }
};
