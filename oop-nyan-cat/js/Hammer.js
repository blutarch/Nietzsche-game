class Hammer {
  constructor(theRoot, x, y) {
    this.root = theRoot;
    this.destroyed = false;
    this.x = x;
    this.y = y;
    this.speed = 0.5;
    this.hammer = document.createElement("img");
    this.hammer.src = "images/hammer.png";
    this.hammer.style.position = "absolute";
    this.hammer.style.left = this.x + "px";
    this.hammer.style.top = this.y + "px";
    this.hammer.style.zIndex = "5";
    this.speed = -(Math.random() / 10 + 0.3);
    this.root.appendChild(this.hammer);
  }
  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.hammer.style.top = this.y + "px";
    if (this.y < 0) {
      this.root.removeChild(this.hammer);
      this.destroyed = true;
    }
  }
}
