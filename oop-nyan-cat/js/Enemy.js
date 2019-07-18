class Enemy {
  update(timeDiff) {
    this.y = this.y + timeDiff * this.speedY;
    this.x = this.x + timeDiff * this.speedX;
    this.domElement.style.top = this.y + "px";
    this.domElement.style.left = this.x + "px";
    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
    if (this.x >= GAME_WIDTH - ENEMY_WIDTH) {
      this.speedX = -Math.abs(this.speedX);
    }
    if (this.x <= 0) {
      this.speedX = Math.abs(this.speedX);
    }
  }

  constructor(theRoot, enemySpot) {
    this.speedConstant = 0.35;
    this.root = theRoot;
    this.spot = enemySpot;
    this.x = enemySpot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;
    this.domElement = document.createElement("img");
    this.domElement.className = "enemy";
    this.domElement.src = "images/jesus2.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = this.x + "px";
    this.domElement.style.top = this.y + "px";
    this.domElement.style.zIndex = "5";
    this.root.appendChild(this.domElement);
    this.speedY = Math.random() / 10 + this.speedConstant;
    this.speedX = Math.random() / 2 + 0.1;
    let randNum = Math.random() * 2;
    if (randNum >= 1) {
      this.speedX = -this.speedX;
    }
  }
}
