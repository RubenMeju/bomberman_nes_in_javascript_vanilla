const sonidos = {
  stage: new Audio("../sounds/stage.mp3"),
  levelComplete: new Audio("../sounds/levelComplete.mp3"),
  walk: new Audio("../sounds/walk.mp3"),
  plantBomb: new Audio("../sounds/plantBomb.mp3"),
  explosion: new Audio("../sounds/explosion.mp3"),

  deathPlayer: new Audio("../sounds/deathPlayer.mp3"),
};

function reproducirSonido(nombre) {
  sonidos[nombre].currentTime = 0; // Reiniciar el sonido si ya está reproduciéndose
  sonidos[nombre].play();
}
