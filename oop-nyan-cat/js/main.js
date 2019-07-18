let gameEngine = new Engine(document.getElementById("app"));

let keyupHandler = event => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.left = false;
  }
  if (event.code === "ArrowRight") {
    gameEngine.player.right = false;
  }
};

let keydownHandler = event => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.left = true;
  }
  if (event.code === "ArrowRight") {
    gameEngine.player.right = true;
  }
  if (event.code === "ArrowUp") {
  }
  if (event.code === "ArrowDown") {
  }
  if (event.code === "Space") {
    if (gameEngine.started === false) {
      gameEngine.howto.style.visibility = "hidden";
      gameEngine.instructions.style.visibility = "hidden";
      gameEngine.score = 0;
      gameEngine.currentMaxEnemies = 4;
      incrementEnemies;
      gameEngine.started = true;
      console.log("started=", gameEngine.started);
      gameEngine.gameLoop();
      gameEngine.increaseEnemySpeed();
      gameEngine.keepScore();
    }
  }

  if (event.code === "KeyZ") {
    gameEngine.fire();
  }
};

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);


// Increases the number of enemies on the screen every 10 seconds until it hits specified ceiling.
let incrementEnemies = setInterval(() => {
  if (
    gameEngine.currentMaxEnemies === MAX_ENEMIES ||
    gameEngine.started === false
  ) {
    clearInterval(incrementEnemies);
    return;
  } else gameEngine.currentMaxEnemies++;
}, 5000);

