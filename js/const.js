const imgSprites = new Image();
imgSprites.src = "../sprites.png";

const menuSprites = new Image();
menuSprites.src = "../menu_bomberman.png";

// Tamaño de cada celda
const cellSize = 48;
// Filas y columnas del tablero
const columns = 25;
const rows = 13;

// Bloques
let walls = [];

// Enemigos
let enemies = [];
let totalEnemies = 6;

let isPlaying = false;

let emptycoordinates = [];

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = columns * cellSize;
canvas.height = rows * cellSize;
canvas.style.backgroundColor = "#2e8b00";
