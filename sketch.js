let sunflowers = [];
let score = 0;
let gameDuration = 15; // tempo em segundos
let startTime;
let gameOver = false;

function setup() {
  createCanvas(800, 400);
  textSize(20);
  textAlign(LEFT, TOP);
  startTime = millis();
}

function draw() {
  background(135, 206, 235); // céu azul claro

  drawGround();
  drawSunflowers();
  drawScore();
  drawTimer();

  if (gameOver) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Tempo esgotado!\nGirassóis plantados: " + score, width / 2, height / 2 - 100);
    noLoop(); // para o jogo
  }
}

function drawGround() {
  fill(100, 200, 100); // verde claro
  rect(0, height / 2, width, height / 2);
}

function drawSunflowers() {
  for (let s of sunflowers) {
    drawSunflower(s.x, s.y);
  }
}

function drawSunflower(x, y) {
  // Tronco
  fill(85, 107, 47);
  rect(x - 2, y - 35, 4, 35);

  // Miolo
  fill(139, 69, 19);
  ellipse(x, y - 40, 20, 20);

  // Pétalas
  fill(255, 215, 0);
  for (let a = 0; a < TWO_PI; a += PI / 6) {
    let px = x + cos(a) * 15;
    let py = y - 40 + sin(a) * 15;
    ellipse(px, py, 10, 15);
  }
}

function drawScore() {
  fill(0);
  text("Girassóis plantados: " + score, 10, 10);
}

function drawTimer() {
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, gameDuration - floor(elapsed));

  fill(0);
  text("Tempo restante: " + timeLeft + "s", 10, 40);

  if (timeLeft <= 0 && !gameOver) {
    gameOver = true;
  }
}

function mousePressed() {
  if (!gameOver && mouseY > height / 2) {
    sunflowers.push({ x: mouseX, y: mouseY });
    score++;
  }
}

