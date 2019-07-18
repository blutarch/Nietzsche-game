class Player {
  constructor(root) {
    this.left = false;
    this.right = false;
    this.x = PLAYER_WIDTH * 2;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 1;
    this.domElement = document.createElement("img");
    this.domElement.src = "images/nietzsche.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = this.x + "px";
    this.domElement.style.top = this.y + "px";
    this.domElement.style.zIndex = "10";
    root.appendChild(this.domElement);
  }

  update() {
    if (this.x > 0 && this.left === true) {
      this.x = this.x - 12;
    }
    this.domElement.style.left = this.x + "px";
    if (this.x + PLAYER_WIDTH + 10 < GAME_WIDTH && this.right === true) {
      this.x = this.x + 12;
    }
    this.domElement.style.left = this.x + "px";
    if (this.y + PLAYER_HEIGHT > PLAYER_HEIGHT) {
      this.y = this.y - PLAYER_HEIGHT;
    }
    this.domElement.style.top = this.y + "px";
    if (this.y + PLAYER_HEIGHT < GAME_HEIGHT - PLAYER_HEIGHT) {
      this.y = this.y + PLAYER_HEIGHT;
    }
    this.domElement.style.top = this.y + "px";
  }
}
