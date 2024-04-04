const imgSprites = new Image();
imgSprites.src = "../sprites.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 64; //tamaño de cada celda

const columns = 25;
const rows = 13;

canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
canvas.style.backgroundColor = "#2e8b00";

const player = new Player(cellSize, cellSize);
//const bomb = new Bomb();
//const explosion = new Explosion(192, 320);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function loop() {
  clearCanvas();
  //  explosion.draw();
  // console.log(bomb.bombs);
  drawLevel();
  console.log(player.bombs);
  // bomb.draw();
  player.update();

  window.requestAnimationFrame(loop);
}

init();
loop();
