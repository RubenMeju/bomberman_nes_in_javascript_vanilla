const imgSprites = new Image();
imgSprites.src = "../sprites.png";

const menuSprites = new Image();
menuSprites.src = "../menu_bomberman.png";

// Tamaño de cada celda
const cellSize = 48;
// Filas y columnas del tablero
const columns = 25;
const rows = 13;

// hub
const canvasHub = document.getElementById("hub");
const ctxHub = canvasHub.getContext("2d");
canvasHub.width = columns * cellSize;
canvasHub.height = 100;

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = columns * cellSize;
canvas.height = rows * cellSize;

const boardWidth = columns * cellSize;
const boardHeight = rows * cellSize;

// Definir los estados del juego
const GAME_STATES = {
  MENU: 0,
  LEVEL_START: 1,
  GAMEPLAY: 2,
  GAMEOVER: 3,
};

let currentLevel = level1;
// Bloques
let walls = [];

// Enemigos
let enemies = [];
let totalEnemies = 2;

let isPlaying = false;

let emptycoordinates = [];

let cellDoorSecret = {};

let gameTime = 200;
let playerScore = 0;
