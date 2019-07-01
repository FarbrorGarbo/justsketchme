function SceneManager(canvas) {

  const clock = new THREE.Clock();
  
  const screenDimensions = {
      width: canvas.width,
      height: canvas.height
  }

  var local = (location.hostname === "localhost" || location.hostname === "127.0.0.1");

  let ambientLight, directionalLight = null;  

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const effect = new THREE.OutlineEffect( renderer );
  const camera = buildCamera(screenDimensions);
  const orbitControl = buildOrbitController();
  const sceneSubjects = createSceneSubjects(scene);

  


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

  function createSceneSubjects(scene) {
      const sceneSubjects = [
          // new Character(scene, 0, local),
          // new SceneSubject(scene)
          // loadModel(1, orbitControl, camera, scene),
      ];
      loadModel(1, activeModel, orbitControl, camera, scene);
      
      return sceneSubjects;
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
    selectJoint(x, y);
  }
}
