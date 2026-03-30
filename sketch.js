let tree_x;
let cloud;
let mountains;
let character;
let canyon;
let collectable;
let sun;
let moon;
let darkness = 0;
let dayProgress = 0;

let isLeft = false;
let isRight = false;
let isPlummeting = false;
let isFalling = false;
let isPaused = false;
let isDying = false;

let jumpingspeed = 0;
let cameraPosX = 0;
let groundlevel = 525;
let gravity = 2;
let gameWorldWidth = 4000;

let ThegameIsOver = false;
let game_score;
let flagpole;
let lives;
let liveMessage = "";
let liveMessageTimer = 0;

let gameStarted = false;
let platforms;
let enemies;
var jumpSound;
var bgMusic;

function preload() {
  soundFormats("mp3", "wav");
  jumpSound = loadSound("assets/jump.wav");
  bgMusic = loadSound("assets/background.wav");
}

function setup() {
  createCanvas(1035, 588);
  lives = 3;
  startGame();
}
function startGame() {
  initialiseGameobjects();
}
function initialiseGameobjects() {
  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;
  isPaused = false;
  isDying = false;
  jumpingspeed = 0;
  ThegameIsOver = false;
  cameraPosX = 0;

  // sun
  sun = {
    x: 150,
    y: 70,
    diameter: 80,
  };
  // moon
  moon = {
    x: width - 150,
    y: height - 70,
    diameter: 80,
    brightness: 320,
  };
  darkness = 10;
  // array of trees
  tree_x = [500, 1200, 2200, 2700, 3500, 4000];

  // array of clouds
  cloud = [
    { x: 300, y: 80, size: 60 },
    { x: 600, y: 80, size: 60 },
    { x: 900, y: 80, size: 60 },
    { x: 1200, y: 120, size: 70 },
    { x: 1500, y: 150, size: 55 },
    { x: 1800, y: 135, size: 70 },
    { x: 2100, y: 150, size: 65 },
    { x: 2400, y: 200, size: 75 },
    { x: 2700, y: 150, size: 70 },
    { x: 3000, y: 220, size: 65 },
    { x: 3300, y: 150, size: 75 },
    { x: 3600, y: 175, size: 65 },
  ];

  mountains = [
    { x: 285, y: groundlevel },
    { x: 785, y: groundlevel },
    { x: 1285, y: groundlevel },
    { x: 1785, y: groundlevel },
    { x: 2285, y: groundlevel },
    { x: 2785, y: groundlevel },
    { x: 3285, y: groundlevel },
    { x: 3785, y: groundlevel },
  ];

  canyon = [
    { x: 325, width: 100 },
    { x: 900, width: 100 },
    { x: 1500, width: 100 },
    { x: 1800, width: 100 },
    { x: 2300, width: 100 },
    { x: 2800, width: 100 },
    { x: 3300, width: 120 },
  ];

  collectable = [
    { x: 370, y: groundlevel - 80, size: 30, isFound: false },
    { x: 660, y: groundlevel - 170, size: 30, isFound: false },
    { x: 950, y: groundlevel - 80, size: 30, isFound: false },
    { x: 1260, y: groundlevel - 170, size: 30, isFound: false },
    { x: 1550, y: groundlevel - 80, size: 30, isFound: false },
    { x: 1850, y: groundlevel - 80, size: 30, isFound: false },
    { x: 2110, y: groundlevel - 170, size: 30, isFound: false },
    { x: 2350, y: groundlevel - 80, size: 30, isFound: false },
    { x: 2610, y: groundlevel - 170, size: 30, isFound: false },
    { x: 2850, y: groundlevel - 80, size: 30, isFound: false },
    { x: 3110, y: groundlevel - 170, size: 30, isFound: false },
    { x: 3350, y: groundlevel - 80, size: 30, isFound: false },
  ];

  platforms = [];
  platforms.push(createPlatforms(600, groundlevel - 110, 110));
  platforms.push(createPlatforms(1200, groundlevel - 110, 110));
  platforms.push(createPlatforms(2050, groundlevel - 110, 110));
  platforms.push(createPlatforms(2550, groundlevel - 110, 110));
  platforms.push(createPlatforms(3050, groundlevel - 110, 110));
  character = {
    x: 220,
    y: groundlevel,
    width: 40,
    height: 80,
  };
  //initialse score to 0
  game_score = 0;

  flagpole = { isReached: false, x: 3850 };
  if (!enemies || enemies.length === 0) {
    enemies = [];
    enemies.push(new Enemy(character.x - 10, groundlevel + 130));
  } else {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].reset();
    }
  }
}

function draw() {
  background(135, 206, 235);

  if (!gameStarted) {
    showIntroScreen();
    return;
  }

  if (!ThegameIsOver) {
    drawSunAndMoon();

    // Score display
    fill("rgb(10,1,4)");
    noStroke();
    textSize(25);
    text("Score = " + game_score, 100, 75);
  }
  for (let i = 0; i < lives; i++) {
    drawlives(40 + i * 50, 30, 30);
  }

  if (!ThegameIsOver && !flagpole.isReached) {
    updateCharacter();
    checkPlayerdie();
    updatecamera();
    drawScrollingScenery();

    for (let i = 0; i < collectable.length; i++) {
      checkCollectable(collectable[i]);
    }
  }
 
  if (ThegameIsOver) {
    fill("black");
    textAlign(CENTER);
    textSize(35);
    text("The Game is over!", width / 2, height / 2 - 30);
    textSize(30);
    text("Press R to Restart!", width / 2, height / 2 + 20);
    return;
  }
  if (flagpole.isReached) {
    isLeft = false;
    isRight = false;
    isPaused = true;

    background(167, 9, 37);
    textAlign(CENTER);
    textSize(40);
    fill("white");
    text("Congratulations! Level 1 is completed!", width / 2, height / 2);
    return;
  }
}
function drawlives(x, y, size)
{
  fill(244);
  noStroke();

  beginShape();
  vertex(x, y + size / 4);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(
    x + size,
    y + size / 2,
    x + size / 2,
    y - size / 2,
    x,
    y + size / 4,
  );
  endShape(CLOSE);

}
function showIntroScreen() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Welcome to My World where I cannot die!", width / 2, height / 2 - 40);
  text("LOVE ENEMY!!", width - 500, height - 200);
  textSize(25);
  text("Press 'D' to Start", width / 2, height / 2 + 20);
}
function drawSunAndMoon() {
  dayProgress = map(character.x, 0, gameWorldWidth, 0, 1);
  dayProgress = constrain(dayProgress, 0, 1);
  let darknessAlpha = lerp(0, 150, dayProgress);
  fill(0, 0, 0, darknessAlpha);
  rect(0, 0, width, height);

  let sunY = lerp(100, height + 100, dayProgress);
  fill(255, 204, 0);
  noStroke();
  ellipse(150, sunY, 90);

  let moonY = lerp(height + 100, 100, dayProgress);
  fill("rgb(230,230,230)");
  ellipse(width - 80, moonY, 90);
}
function updatecamera() {
  cameraPosX = character.x - width / 2;
  cameraPosX = constrain(cameraPosX, 0, gameWorldWidth - width);
}

function drawScrollingScenery() {
  push();
  translate(-cameraPosX * 0.4, 0);
  drawMountains();
  drawTrees();
  drawClouds();
  pop();

  // Ground
  noStroke();
  fill(34, 139, 34);
  rect(-cameraPosX, groundlevel, gameWorldWidth, height - groundlevel);
  push();
  translate(-cameraPosX, 0);
  for (let i = 0; i < platforms.length; i++) platforms[i].draw();
  for (let i = 0; i < canyon.length; i++) drawcanyon(canyon[i]);
  for (let i = 0; i < collectable.length; i++) drawCollectable(collectable[i]);
  // ENEMIES DRAW HERE **AFTER EVERYTHING**
  for (let i = 0; i < enemies.length; i++) enemies[i].draw();
  // CHARACTER
  drawCharacter();

  // FLAG
  renderflagpole();
  pop();
}

function drawClouds() {
  noStroke();
  fill(255);
  for (let c of cloud) {
    ellipse(c.x - 100, c.y + 1, c.size + 20, c.size + 20);
    ellipse(c.x - 65, c.y + 6, c.size + 20, c.size + 20);
    ellipse(c.x - 35, c.y - 1, c.size + 20, c.size + 20);
  }
}

function drawTrees() {
  for (let x of tree_x) {
    fill(101, 67, 33);
    rect(x - 500, groundlevel - 150, 50, 150);
    fill(34, 139, 34);
    triangle(
      x - 550,
      groundlevel - 40,
      x - 500,
      groundlevel - 380,
      x - 400,
      groundlevel - 40,
    );
  }
}

function drawMountains() {
  noStroke();

  for (let m of mountains) {
    fill(112, 128, 144);
    beginShape();
    vertex(m.x, m.y); // bottom-left
    vertex(m.x + 125, m.y - 350); // top
    vertex(m.x + 125, m.y - 210); // peak
    vertex(m.x + 125, m.y - 350); // right slope
    vertex(m.x + 380, m.y); // bottom-right
    endShape(CLOSE);
    fill(255, 250, 250); // slightly transparent
    triangle(
      m.x + 140 - 14,
      m.y - 349, // top
      m.x + 52 + 15,
      m.y - 190, // right
      m.x + 240,
      m.y - 190,
    ); // bottom
    ellipse(m.x + 75, m.y - 160, 22, 80);
    ellipse(m.x + 90, m.y - 175, 22, 80);
    ellipse(m.x + 110, m.y - 185, 22, 80);
    ellipse(m.x + 130, m.y - 195, 22, 80);
    ellipse(m.x + 150, m.y - 205, 22, 80);
    ellipse(m.x + 170, m.y - 215, 22, 80);
    ellipse(m.x + 190, m.y - 200, 22, 80);
    ellipse(m.x + 210, m.y - 180, 22, 80);
    ellipse(m.x + 229, m.y - 162, 25, 84);
  }
}

// canyon
function drawcanyon(t_canyon) {
  fill(139, 69, 19);
  rect(t_canyon.x, groundlevel, t_canyon.width, height - groundlevel);
  beginShape();
  vertex(t_canyon.x - 5, groundlevel);
  vertex(t_canyon.x - 30, groundlevel + 30);
  vertex(t_canyon.x - 50, groundlevel + 70);
  vertex(t_canyon.x - 10, groundlevel + 120);
  vertex(t_canyon.x, height);
  vertex(t_canyon.x, groundlevel);
  endShape(CLOSE);
  // canyon
  beginShape();
  vertex(t_canyon.x + t_canyon.width, groundlevel);
  vertex(t_canyon.x + t_canyon.width + 30, groundlevel + 35);
  vertex(t_canyon.x + t_canyon.width + 50, groundlevel + 80);
  vertex(t_canyon.x + t_canyon.width + 10, groundlevel + 130);
  vertex(t_canyon.x + t_canyon.width, height);
  endShape(CLOSE);
}
// flagpole
function renderflagpole() {
  push();
  strokeWeight(5);
  stroke(200, 200, 200);
  line(flagpole.x, groundlevel, flagpole.x, groundlevel - 250);
  fill(255, 0, 0);
  noStroke();
  // logic
  if (flagpole.isReached) {
    rect(flagpole.x, groundlevel - 250, 50, 50);
  } else {
    rect(flagpole.x, groundlevel - 50, 50, 50);
  }
  pop();
}
function checkFlagpole() {
  // abs will make sure the whta ever the value id the sign will be positive
  let d = abs(character.x - flagpole.x);

  if (d < 15) {
    flagpole.isReached = true;
  }
}

function createPlatforms(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      fill(255, 0, 255);
      rect(this.x, this.y, this.length, 20);
    },
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        // Only detect if character is falling
        if (jumpingspeed >= 0) {
          if (gc_y >= this.y && gc_y <= this.y + 10) {
            return true;
          }
        }
      }

      return false;
    },
  };
  return p;
}

function drawCollectable(t_collectable) {
  if (!t_collectable.isFound) {
    noStroke();

    // Base coin (gold)
    fill(255, 215, 0);
    ellipse(
      t_collectable.x - 15,
      t_collectable.y,
      t_collectable.size + 5,
      t_collectable.size + 5,
    );

    // Inner shading
    fill(255, 239, 120);
    ellipse(
      t_collectable.x - 15,
      t_collectable.y,
      t_collectable.size - 5,
      t_collectable.size - 5,
    );
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("£", t_collectable.x - 15, t_collectable.y);
  }
}

function checkCollectable(t_collectable) {
  let collectionRadius = t_collectable.size + 10;
  if (
    !t_collectable.isFound &&
    dist(character.x, character.y, t_collectable.x, t_collectable.y) <
      collectionRadius
  ) {
    t_collectable.isFound = true;
    console.log("yess");
    game_score += 1;
  }
}
function checkPlayerdie() {
  if ((character.y > groundlevel || isPlummeting) && !isDying) {
    isDying = true;
    lives -= 1;

    if (lives > 0) {
      character.x = 100;
      character.y = groundlevel;
      isPlummeting = false;
      isFalling = false;
      isDying = false;
      jumpingspeed = 0;
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].reset();
      }
      for (let i = 0; i < collectable.length; i++) {
        collectable[i].isFound = false;
      }
    } else {
      ThegameIsOver = true;
    }
  }
}

function updateCharacter() {
  if (isPaused) return;
  if (isLeft) character.x -= 7;
  if (isRight) character.x += 6;

  // Apply vertical movement
  character.y += jumpingspeed;

  let isContact = false;

  // PLATFORM CHECK
  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i].checkContact(character.x, character.y)) {
      isContact = true;
      character.y = platforms[i].y; // land on platform
      jumpingspeed = 0;
      isFalling = false;
      break;
    }
  }

  if (!isContact) {
    if (character.y >= groundlevel && !isPlummeting) {
      character.y = groundlevel;
      jumpingspeed = 0;
      isFalling = false;
    } else if (!isPlummeting) {
      jumpingspeed += gravity;
      isFalling = true;
    }
  }
  if (character.y >= groundlevel && !isPlummeting) {
    for (let i = 0; i < canyon.length; i++) {
      if (
        character.x > canyon[i].x &&
        character.x < canyon[i].x + canyon[i].width
      ) {
        isPlummeting = true;
        break;
      }
    }
  }
  if (isPlummeting) {
    character.y += 10;
  }
  character.x = constrain(character.x, 0, gameWorldWidth);
  if (!flagpole.isReached) {
    checkFlagpole();
  }
  for (let i = 0; i < enemies.length; i++) {
    var isCont = enemies[i].checkContact(character.x, character.y);
    if (isCont && !isDying) {
      isDying = true;
      lives--;

      if (lives > 0) {
        liveMessage = "Lives left: " + lives;
        liveMessageTimer = 120;

        character.x = 100;
        character.y = groundlevel;
        jumpingspeed = 0;
        isDying = false;

        for (let j = 0; j < enemies.length; j++) {
          enemies[j].reset();
        }
      } else {
        ThegameIsOver = true;
      }
      break;
    }
  }
}
function drawCharacter() {
  if (isRight && isFalling) {
    // add your jumping-right code
    // hair

    fill(255, 224, 189);
    ellipse(character.x, character.y - 57, 30); // the head

    fill(233, 30, 99);
    rect(character.x - 12, character.y - 45, 23, 30); // the body
    fill(181, 101, 29);
    ellipse(character.x + 7, character.y - 62, 8, 8); // the right eye
    fill(0);
    rect(character.x - 10, character.y - 16, 8, 10); // left leg forward
    rect(character.x + 1, character.y - 16, 8, 10); //right feet;
    fill(255, 224, 189);
    arc(character.x + 8, character.y - 54, 13, 6, 0, PI - 1, CHORD); //lips
    stroke(50);
    fill(0);
    line(
      character.x - 12,
      character.y - 45,
      character.x - 22,
      character.y - 60,
    ); // left hand
    stroke(50);
    fill(0);
    line(
      character.x + 10,
      character.y - 45,
      character.x + 22,
      character.y - 60,
    );
  } else if (isLeft) {
    fill(0);
    ellipse(character.x, character.y, 5, 5); // draw a dot
    fill(255, 224, 189);
    ellipse(character.x, character.y - 57, 30); // the head
    fill(181, 101, 29);
    ellipse(character.x - 7, character.y - 62, 8, 8); // the left eye
    fill(233, 30, 99);
    rect(character.x - 12, character.y - 45, 23, 30); // the body
    fill(0);
    rect(character.x - 10, character.y - 16, 8, 15); // left leg forward
    rect(character.x + 1, character.y - 16, 8, 18); //right feet;    // right leg back (slightly raised)
    fill(255, 68, 68);
    arc(character.x - 13, character.y - 54, 12, 6, 0, PI - 1, CHORD); //lips
    stroke(50);
    fill(0);
    line(
      character.x - 12,
      character.y - 45,
      character.x - 22,
      character.y - 35,
    );
    stroke(50);
    fill(0);
    line(
      character.x + 10,
      character.y - 46,
      character.x + 22,
      character.y - 33,
    );
  } else if (isRight) {
    fill(0);
    ellipse(character.x, character.y, 5, 5); // draw a dot
    fill(255, 224, 189);
    ellipse(character.x, character.y - 57, 30); // the head
    fill(233, 30, 99);
    rect(character.x - 12, character.y - 45, 23, 30); // the body
    fill(181, 101, 29);
    ellipse(character.x + 7, character.y - 62, 8, 8); // the right eye
    fill(0);
    rect(character.x - 10, character.y - 16, 8, 20); // left leg forward
    rect(character.x + 1, character.y - 16, 8, 16); //right feet;
    fill(255, 68, 68);
    arc(character.x + 8, character.y - 54, 13, 6, 0, PI - 1, CHORD); //lips
    stroke(50);
    fill(0);
    line(
      character.x - 12,
      character.y - 45,
      character.x - 22,
      character.y - 35,
    );
    stroke(50);
    fill(0);
    line(
      character.x + 10,
      character.y - 46,
      character.x + 22,
      character.y - 33,
    );
  } else if (isFalling || isPlummeting) {
    fill(255, 224, 189);
    ellipse(character.x, character.y - 57, 30); // the head
    fill(181, 101, 29);
    ellipse(character.x - 7, character.y - 62, 8, 8); // the left eye
    fill(192, 35, 192); //color
    ellipse(character.x - 7, character.y - 62, 4, 4); // eye color left
    fill(181, 101, 29);
    ellipse(character.x + 7, character.y - 62, 8, 8); // the right eye
    fill(192, 35, 192);
    ellipse(character.x + 7, character.y - 62, 4, 4); // eye color right
    ellipse(character.x - 7, character.y - 62, 4, 4); // eye color left
    fill(233, 30, 99);
    rect(character.x - 12, character.y - 45, 23, 30); // the body
    fill(0);
    rect(character.x - 10, character.y - 16, 8, 10); // left feet
    rect(character.x + 2, character.y - 16, 8, 10); //right feet
    fill(255, 68, 68);
    arc(character.x - 1, character.y - 52, 12, 6, 0, PI, CHORD); //lips
    stroke(50);
    fill(0);
    line(
      character.x - 12,
      character.y - 45,
      character.x - 22,
      character.y - 55,
    ); // left hand
    stroke(50);
    fill(0);
    line(
      character.x + 11,
      character.y - 45,
      character.x + 22,
      character.y - 57,
    ); // right hand
  } else {
    fill(255, 224, 189);
    ellipse(character.x, character.y - 57, 30); // the head
    fill(181, 101, 29);
    ellipse(character.x - 7, character.y - 62, 8, 8); // the left eye
    fill(181, 101, 29);
    ellipse(character.x + 7, character.y - 62, 8, 8); // the right eye
    fill(233, 30, 99);
    rect(character.x - 12, character.y - 45, 23, 30); // the body
    fill(0);
    rect(character.x - 10, character.y - 16, 8, 20); // left feet
    rect(character.x + 2, character.y - 16, 8, 20); //right feet
    fill(255, 68, 68);
    arc(character.x - 1, character.y - 52, 12, 6, 0, PI, CHORD); //lips
    stroke(50);
    fill(0);
    line(
      character.x - 12,
      character.y - 45,
      character.x - 22,
      character.y - 35,
    ); // left hand
    stroke(50);
    fill(0);
    line(
      character.x + 10,
      character.y - 46,
      character.x + 22,
      character.y - 33,
    ); // right hand
  }
}

function keyPressed() {
  let k = key.toLowerCase();

  if (!gameStarted) {
    if (k === "d") {
      gameStarted = true;
      startGame();
    }
    return;
  }
  if (!bgMusic.isPlaying()) {
    bgMusic.setLoop(true);
    bgMusic.setVolume(0.3);
    bgMusic.play();
  }
  // Movement keys
  if (k === "a" || keyCode === LEFT_ARROW) isLeft = true;
  if (k === "d" || keyCode === RIGHT_ARROW) isRight = true;

  // Jump
  if (
    (k === "w" || keyCode === UP_ARROW) &&
    !isPlummeting &&
    !isFalling &&
    !isPaused
  ) {
    jumpingspeed = -23;
    if (jumpSound.isPlaying()) {
      jumpSound.stop();
    }
    jumpSound.play();
  }

  if (k === "r" && ThegameIsOver) {
    lives = 3;
    game_score = 0;
    initialiseGameobjects();
  }
}

function keyReleased() {
  let k = key.toLowerCase();
  if (k === "a" || keyCode === LEFT_ARROW) isLeft = false;
  if (k === "d" || keyCode === RIGHT_ARROW) isRight = false;
}
