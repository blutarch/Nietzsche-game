class Text {
  constructor(root, xPos, yPos) {
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = xPos + "px";
    div.style.top = yPos + "px";
    div.style.color = "black";
    div.style.font = "bold 30px Impact";
    div.style.zIndex = "2000";
    root.appendChild(div);
    this.domElement = div;
  }
  update(txt) {
    this.domElement.innerText = txt;
  }
}
