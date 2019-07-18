let nextEnemySpot = enemies => {
  let numEnemySpots = GAME_WIDTH / ENEMY_WIDTH;
  let enemySpotsOccupied = [];
  for (let i = 0; i < numEnemySpots; i++) {
    enemySpotsOccupied.push(false);
  }
  enemies.forEach(enemy => {
    enemySpotsOccupied[enemy.spot] = true;
  });
  let candidate = undefined;
  while (candidate === undefined || enemySpotsOccupied[candidate]) {
    candidate = Math.floor(Math.random() * numEnemySpots);
  }
  return candidate;
};

let addBackground = root => {
  let bg = document.createElement("img");
  bg.src = "images/nietzschebg.png";
  bg.style.height = GAME_HEIGHT + "px";
  bg.style.width = GAME_WIDTH + "px";
  bg.style.opacity = "0.4";
  root.appendChild(bg);
  let whiteBox = document.createElement("div");
  whiteBox.style.zIndex = "100";
  whiteBox.style.position = "absolute";
  whiteBox.style.top = GAME_HEIGHT + "px";
  whiteBox.style.height = ENEMY_HEIGHT + 30 + "px";
  whiteBox.style.width = GAME_WIDTH + "px";
  whiteBox.style.background = "#fff";
  root.appendChild(whiteBox);
};
