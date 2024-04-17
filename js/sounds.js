const sonidos = {
  stage: new Audio("../sounds/stage.mp3"),
  levelComplete: new Audio("../sounds/levelComplete.mp3"),
  gameOver: new Audio("../sounds/gameOver.mp3"),
  walk: new Audio("../sounds/walk.mp3"),
  plantBomb: new Audio("../sounds/plantBomb.mp3"),
  explosion: new Audio("../sounds/explosion.mp3"),

  deathPlayer: new Audio("../sounds/deathPlayer.mp3"),
};
// Objeto para almacenar el tiempo del último sonido reproducido
var lastSoundTime = {};

function playSound(nombre) {
  const now = Date.now(); // Obtener el tiempo actual
  const delay = 300; // Establecer el tiempo mínimo entre cada reproducción en milisegundos (ajustar según sea necesario)

  // Verificar si ha pasado el tiempo suficiente desde la última reproducción del mismo sonido
  if (!lastSoundTime[nombre] || now - lastSoundTime[nombre] > delay) {
    sonidos[nombre].loop = false;
    sonidos[nombre].currentTime = 0; // Reiniciar el sonido si ya está reproduciéndose
    sonidos[nombre].play();
    lastSoundTime[nombre] = now; // Actualizar el tiempo del último sonido reproducido
  }
}
