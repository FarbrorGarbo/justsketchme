const canvas = document.getElementById("canvas");

const sceneManager = new SceneManager(canvas);

bindEventListeners();
render();

function bindEventListeners() {
  window.onresize = resizeCanvas;
  resizeCanvas();
}

function resizeCanvas() {
  canvas.style.width = window.innerWidth;
  canvas.style.height = window.innerHeight;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  sceneManager.onWindowResize();
}

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}

function addCharacterToScene(characterIndex) {
  sceneManager.addCharacterToScene(characterIndex);
}

function toggleEffect() {
  sceneManager.toggleEffect();
}

function takeScreenshot() {
  sceneManager.takeScreenshot();
}

document.addEventListener('mousedown', function (event) {
  event.preventDefault();
  sceneManager.onClick(event.clientX, event.clientY)
}, false);

document.addEventListener('touchstart', function (event) {
  event.preventDefault();
  sceneManager.onClick(event.touches[0].clientX, event.touches[0].clientY);
}, false);
