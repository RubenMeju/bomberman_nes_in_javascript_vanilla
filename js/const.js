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

function checkCollision(objectA, objectB) {
  // Obtener los límites de los objetos
  let objectALeft = objectA.x;
  let objectARight = objectA.x + objectA.size;
  let objectATop = objectA.y;
  let objectABottom = objectA.y + objectA.size;

  let objectBLeft = objectB.x;
  let objectBRight = objectB.x + objectB.size;
  let objectBTop = objectB.y;
  let objectBBottom = objectB.y + objectB.size;

  // Verificar si hay colisión
  if (
    objectARight > objectBLeft &&
    objectALeft < objectBRight &&
    objectABottom > objectBTop &&
    objectATop < objectBBottom
  ) {
    return true; // Hay colisión
  }

  return false; // No hay colisión
}
