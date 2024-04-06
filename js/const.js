const imgSprites = new Image();
imgSprites.src = "../sprites.png";

const cellSize = 64; //tamaño de cada celda

const columns = 25;
const rows = 13;
let walls = [];

const enemies = 4;

canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
canvas.style.backgroundColor = "#2e8b00";
