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

function setGizmo(gizmo) {
  sceneManager.setGizmo(gizmo);
}

function toggleEffect() {
  sceneManager.toggleEffect();
}

function takeScreenshot() {
  sceneManager.takeScreenshot();
}

function savePose() {
  sceneManager.savePose();
}

function loadPose(id) {
  sceneManager.loadPose(id);
}

function deletePose(id) {
  if (!confirm(`Delete ${savedPoses[id].pose_name}?`)) return;
  var request = new XMLHttpRequest()
  request.open('DELETE', `https://cors-anywhere.herokuapp.com/https://sheetdb.io/api/v1/dmanujok7dm7d/id/${savedPoses[id].id}`, true)
  request.onload = function () {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      getPoses();
    } else {
      console.log('Saving error')
    }
  }
  request.send();
}

function increaseAmbientLightIntensity() {
  sceneManager.increaseAmbientLightIntensity();
}

function decreaseAmbientLightIntensity() {
  sceneManager.decreaseAmbientLightIntensity();
}

function increaseDirectionalLightIntensity() {
  sceneManager.increaseDirectionalLightIntensity();
}

function decreaseDirectionalLightIntensity() {
  sceneManager.decreaseDirectionalLightIntensity();
}

function undo() {
  sceneManager.undo();
}

function getPoses() {
  if (!licence_key) return;
  console.log('getting');
  var request = new XMLHttpRequest()
  request.open('GET', `https://cors-anywhere.herokuapp.com/https://sheetdb.io/api/v1/dmanujok7dm7d/search?licence_key=${licence_key}`, true)
  request.onload = function () {
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      savedPoses = data;
      console.log(data);
      document.querySelector('#pose-list').innerHTML = "";

      if (data.length > 0) {
        data.forEach((element, index) => {
          document.querySelector('#pose-list').innerHTML += `
        <a class="panel-block pose">
          <button class="unbutton" onclick="loadPose(${index});toggle_visibility('.pose-list');">
          ${element.pose_name}
          </button>
          <button class="delete" aria-label="delete" onclick="deletePose(${index})"></button>
        </a>
        `;
        });
      } else {
        document.querySelector('#pose-list').innerHTML += `
          <a class="panel-block pose">
            You have no saved poses
          </a>
        `;
      }
    } else {
      console.log('Getting error')
    }
  }
  request.send();
}

document.addEventListener('mousedown', function (event) {
  event.preventDefault();
  sceneManager.onClick(event.clientX, event.clientY)
}, false);

document.addEventListener('mousemove', function (event) {
  event.preventDefault();
  sceneManager.onMouseMove(event.clientX, event.clientY)
}, false);

document.addEventListener('touchstart', function (event) {
  sceneManager.onClick(event.touches[0].clientX, event.touches[0].clientY);
}, false);
