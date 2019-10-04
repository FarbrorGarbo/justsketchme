let camera = null;
let scene = null;
let orbitControl = null;
let prevStore = [];
let lastAccessed = null;
let savedPoses = [];
let poseLibrary = [];

function SceneManager(canvas) {

  const clock = new THREE.Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }

  scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const effect = new THREE.OutlineEffect(renderer);
  camera = buildCamera(screenDimensions);
  orbitControl = buildOrbitController();
  const sceneSubjects = createSceneSubjects();
  let ambientLight, directionalLight = null;
  const lights = createLights();

  function buildScene() {
    const scene = new THREE.Scene();
    const gridHelper = new THREE.PolarGridHelper(300, 10);
    scene.add(gridHelper);

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 45;
    const nearPlane = 2;
    const farPlane = 2000;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    camera.position.set(100, 200, 300);

    return camera;
  }

  function buildOrbitController() {
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.screenSpacePanning = true;
    controls.update();
    return controls;
  }

  function createSceneSubjects() {
    const sceneSubjects = [
      new Character(0, true),
    ];
    lastAccessed = sceneSubjects[0];
    return sceneSubjects;
  }

  function createLights() {
    ambientLight = new Light(scene, new THREE.AmbientLight(0x443333, 3), new THREE.Vector3(0, 0, 0));
    directionalLight = new Light(scene, new THREE.DirectionalLight(0xffffbb, 1), new THREE.Vector3(100, 100, 100), true);
    const lights = [
      ambientLight,
      directionalLight
    ];

    return lights;
  }

  this.setGizmo = function (gizmo) {
    activeGizmo = gizmo;
    for (let i = 0; i < sceneSubjects.length; i++) {
      if (!sceneSubjects[i].alive) {
        sceneSubjects.splice(i, 1);
      }
      if (sceneSubjects[i]) {
        sceneSubjects[i].setGizmo();
      }
    }

    for (let i = 0; i < lights.length; i++)
      lights[i].setGizmo();
  }

  this.addCharacterToScene = function (characterIndex) {
    sceneSubjects.push(new Character(characterIndex));
  }

  this.toggleEffect = function () {
    effect.enabled = !effect.enabled;
  }

  this.takeScreenshot = function () {
    var a = document.createElement('a');
    renderer.setClearColor(0x000000, 0);
    a.href = renderer.domElement.toDataURL("image/png", "image/octet-stream");
    a.download = 'JustSketchMe - Screenshot.png'
    a.click();
  }

  this.savePose = function () {
    if (!licenceCheck()) return;

    const savedPose = lastAccessed.getPose();

    const name = prompt("Give your pose a name");
    
    if(!name) {
      return;
    }
    else if(savedPoses.filter(pose => pose.pose_name == name).length > 0) {
      var request = new XMLHttpRequest()
      request.open('PUT', `https://cors-anywhere.herokuapp.com/https://sheetdb.io/api/v1/dmanujok7dm7d/id/${savedPoses.filter(pose => pose.pose_name == name)[0].id}`, true)
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.onload = function () {
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
          alert("Your pose has been updated");
          getPoses();
        } else {
          console.log('Saving error')
        }
      }
      request.send(JSON.stringify({ "data": [{ "id": Math.random().toString(36).substr(2, 9), "licence_key": licence_key, "pose_name": name, "pose_values": savedPose }] }));
    }
    else {
      var request = new XMLHttpRequest()
      request.open('POST', 'https://cors-anywhere.herokuapp.com/https://sheetdb.io/api/v1/dmanujok7dm7d/', true)
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.onload = function () {
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
          alert("Your pose has been saved");
          getPoses();
        } else {
          console.log('Saving error')
        }
      }
      request.send(JSON.stringify({ "data": [{ "id": Math.random().toString(36).substr(2, 9), "licence_key": licence_key, "pose_name": name, "pose_values": savedPose }] }));
    }
  }

  this.loadPose = function (pose) {
    if (!licenceCheck()) return;
    lastAccessed.setPose(pose);
  }

  this.increaseAmbientLightIntensity = function () {
    ambientLight.increaseIntensity();
  }

  this.decreaseAmbientLightIntensity = function () {
    ambientLight.decreaseIntensity();
  }

  this.increaseDirectionalLightIntensity = function () {
    directionalLight.increaseIntensity();
  }

  this.decreaseDirectionalLightIntensity = function () {
    directionalLight.decreaseIntensity();
  }

  this.update = function () {
    effect.render(scene, camera);
  }

  this.onWindowResize = function () {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    effect.setSize(width, height);
  }

  this.onClick = function (x, y) {
    for (let i = 0; i < sceneSubjects.length; i++) {
      sceneSubjects[i].onClick(x, y);
    }
  }

  this.onMouseMove = function (x, y) {
    for (let i = 0; i < sceneSubjects.length; i++) {
      sceneSubjects[i].onMouseMove(x, y);
    }
  }

  this.undo = function () {
    if (prevStore.length > 0) {
      const prevRotationValues = prevStore.pop();
      console.log(`Undoing rotation on ${prevRotationValues.object.name}`);
      prevRotationValues.object.rotation.set(prevRotationValues.x, prevRotationValues.y, prevRotationValues.z);
    }
  }
}
