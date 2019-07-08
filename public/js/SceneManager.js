let camera = null;
let scene = null;
let orbitControl = null;

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
    scene.background = new THREE.Color(0xffffff);

    const gridHelper = new THREE.PolarGridHelper(300, 10);
    scene.add(gridHelper);

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
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
    effect.render(scene, camera);
    a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
    a.download = 'JustSketchMe - Screenshot.png'
    a.click();
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
    const elapsedTime = clock.getElapsedTime();

    // for (let i = 0; i < sceneSubjects.length; i++)
    //   sceneSubjects[i].update(elapsedTime);
    
    // for (let i = 0; i < lights.length; i++)
    //   lights[i].update(elapsedTime);

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
  
}
