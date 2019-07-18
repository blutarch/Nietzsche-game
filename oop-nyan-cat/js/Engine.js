class Engine {
  gameLoop = () => {
    this.player.update();
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    this.hammers.forEach(hammer => {
      hammer.update(timeDiff);
    });
    this.enemies.forEach(enemy => {
      enemy.update(timeDiff);
    });

    this.enemies.forEach(enemy => {
      for (let i = 0; i < this.hammers.length; i++) {
        if (
          enemy.y >= this.hammers[i].y - ENEMY_HEIGHT &&
          enemy.y <= this.hammers[i].y + HAMMER_HEIGHT &&
          enemy.x + ENEMY_WIDTH >= this.hammers[i].x &&
          enemy.x <= this.hammers[i].x + HAMMER_WIDTH
        ) {
          this.rocket.play();
          enemy.destroyed = true;
          this.score += 10;
          this.root.removeChild(enemy.domElement);
        }
      }
    });

    this.hammers = this.hammers.filter(hammer => {
      return !hammer.destroyed;
    });

    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed;
    });

    this.scoreBox.update(this.score);

    while (this.enemies.length < this.currentMaxEnemies) {
      let spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    if (this.isPlayerDead()) {
      this.enemies.forEach(enemy => this.root.removeChild(enemy.domElement));
      this.hammers.forEach(hammer => this.root.removeChild(hammer.hammer));
      this.hammers = [];
      this.enemies = [];
      this.instructions.style.visibility = "visible";
      this.instructions.style.top = GAME_HEIGHT - 175 + "px";
      this.instructions.style.left = 300 + "px";
      this.instructions.innerText = "Press space bar to try again.";
      this.root.appendChild(this.speech);
      this.root.appendChild(this.textBox);
      this.textBox.innerText = this.NietzscheQuotes[
        Math.ceil(Math.random() * this.NietzscheQuotes.length - 1)
      ];
      this.started = false;
      return;
    }
    setTimeout(this.gameLoop, 20);
  };
  isPlayerDead = () => {
    let dead = false;
    let enemiesAtPlayerHeight = this.enemies.filter(enemy => {
      return (
        enemy.y >= this.player.y - ENEMY_HEIGHT + 20 &&
        enemy.y <= this.player.y + PLAYER_HEIGHT - 20
      );
    });
    enemiesAtPlayerHeight.forEach(enemy => {
      if (
        enemy.x + ENEMY_WIDTH - 30 >= this.player.x &&
        enemy.x <= this.player.x + PLAYER_WIDTH - 30
      ) {
        dead = true;
      }
    });
    return dead;
  };

  increaseEnemySpeed = () => {
    setInterval(() => {
      this.enemies.forEach(enemy => {
        enemy.speedConstant += 0.03;
        console.log("SPEED_CONSTANT=", enemy.speedConstant);
      });
    }, 5000);
  };

  keepScore = () =>
    setInterval(() => {
      this.score++;
    }, 100);

  fire = () => {
    this.hammers.push(new Hammer(this.root, this.player.x, this.player.y));
    this.score -= 10;
  };

  constructor(theRoot) {
    this.rocket = new Audio("sounds/ROCKET.mp3");
    this.hammers = [];
    this.started = false;
    this.score = 0;
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.currentMaxEnemies = 4;
    addBackground(this.root);
    this.scoreBox = new Text(this.root, 50, 50);
    this.howto = document.createElement("img");
    this.howto.style.position = "absolute";
    this.howto.style.zIndex = "50";
    this.howto.src = "images/howto.png";
    this.howto.style.top = "10px";
    this.howto.style.left = "10px";
    this.instructions = document.createElement("div");
    this.instructions.style.position = "absolute";
    this.instructions.style.top = "200px";
    this.instructions.style.left = "80px";
    this.instructions.style.font = "bold 30px Century Gothic";
    this.instructions.innerText =
      "Press space bar to begin. Use 'Z' button to smash your idols";
    this.root.appendChild(this.instructions);
    this.root.appendChild(this.howto);
    this.speech = document.createElement("img");
    this.speech.style.position = "absolute";
    this.speech.style.zIndex = "50";
    this.speech.src = "images/speechbubble.png";
    this.speech.style.top = "100px";
    this.speech.style.left = "0px";
    this.speech.style.zIndex = "3";
    this.textBox = document.createElement("div");
    this.textBox.style.position = "absolute";
    this.textBox.style.zIndex = "60";
    this.textBox.style.top = "170px";
    this.textBox.style.left = "52px";
    this.textBox.style.height = "100px";
    this.textBox.style.width = "310px";
    this.textBox.style.font = "bold 30px Franklin Gothic Medium";
    this.textBox.innerText = "";
    this.NietzscheQuotes = [
      "Only those who keep changing remain akin to me.",
      "Thoughts are the shadows of our feelings - always darker, emptier, simpler.",
      "Mystical explanations are considered deep; the truth is, they are not even shallow.",
      "We are, all of us, growing volcanoes that approach the hour of their eruption.",
      "In reality, hope is the worst of all evils, because it prolongs man's torments.",
      "What does man actually know about himself?",
      "All truths are bloody truths to me.",
      "There are no facts, only interpretations.",
      "Is language the adequate expression of all realities?",
      "Only those who keep changing remain akin to me.",
      "Man is the cruelest animal.",
      "Is Wagner a human being at all? Is he not rather a disease?",
      "Plato is boring.",
      "Against boredom even gods struggle in vain.",
      "The strongest and most evil spirits have so far done the most to advance humanity",
      "What is known of the moral effects of different foods?",
      "The poison of which weaker natures perish strengthens the strong.",
      "To lose firm ground for once! To float! To err! To be mad!",
      "And what is 'reality' for an artist in love?",
      "I am warlike by nature. Attacking is one of my instincts.",
      "Ultimately, nobody can get more out of things, including books, than he already knows.",
      "Never have I felt happier with myself than in the sickest and most painful periods of my life.",
      "My genius is in my nostrils.",
      "It has not yet been proved that there is any such thing as forgetting.",
      "Three-quarters of all evil that is done in the world happens out of timidity.",
      "What is the strongest cure? Victory.",
      "The higher we soar, the smaller we seem to those who cannot fly."
    ];
  }
}
