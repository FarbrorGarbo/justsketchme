let camera = null;
let scene = null;
let orbitControl = null;

function SceneManager(canvas) {

  const clock = new THREE.Clock();
  
  const screenDimensions = {
      width: canvas.width,
      height: canvas.height
  }

  let ambientLight, directionalLight = null;  

  scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const effect = new THREE.OutlineEffect( renderer );
  camera = buildCamera(screenDimensions);
  orbitControl = buildOrbitController();
  const sceneSubjects = createSceneSubjects();

  function buildScene() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );
    
      const gridHelper = new THREE.PolarGridHelper( 300, 10 );
      scene.add( gridHelper );

      ambientLight = new Light(scene, new THREE.AmbientLight( 0x443333, 3 ));
      directionalLight = new Light(scene, new THREE.DirectionalLight( 0xffffbb, 1 ));

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

      camera.position.set( 100, 200, 300 );

      return camera;
  }

  function buildOrbitController() {
    let controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 100, 0 );
    controls.screenSpacePanning = true;
    controls.update();
    return controls;
  }

  function createSceneSubjects() {
      const sceneSubjects = [
          new Character(0),
      ];
      
      return sceneSubjects;
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

  this.update = function() {
      const elapsedTime = clock.getElapsedTime();

      for(let i=0; i<sceneSubjects.length; i++)
        sceneSubjects[i].update(elapsedTime);

      effect.render(scene, camera);
  }

  this.onWindowResize = function() {
      const { width, height } = canvas;

      screenDimensions.width = width;
      screenDimensions.height = height;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      effect.setSize(width, height);
  }

  this.onClick = function(x, y) {
    for(let i=0; i<sceneSubjects.length; i++) {
      sceneSubjects[i].onClick(x, y);
    }
  }
}
