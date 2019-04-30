

if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}
var container, stats, controls, jointControl;
var camera, scene, renderer;
var ambientLight, directionalLight, ambientLightControl, directionalLightControl;
var childObjects = [];
var clock = new THREE.Clock();
var mixer;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var activeModel, modelLoader;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 2, 2000 );
  camera.position.set( 100, 200, 300 );


  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  container.appendChild( renderer.domElement );

  effect = new THREE.OutlineEffect( renderer );
  window.addEventListener( 'resize', onWindowResize, false );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.target.set( 0, 100, 0 );
  controls.screenSpacePanning = true;
  controls.update();

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );
  // scene.fog = new THREE.Fog( 0xffffff, 200, 1000 );

  // ground
  // var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
  // mesh.rotation.x = - Math.PI / 2;
  // mesh.receiveShadow = true;
  // scene.add( mesh );

  var gridHelper = new THREE.PolarGridHelper( 300, 10 );
  scene.add( gridHelper );

  loadModel(0);
}

function lightSetup (ambient, directional) {
  if(ambientLight){
    scene.remove (ambientLight);
    scene.remove (ambientLightControl);
  }
  ambientLight = ambient;

  scene.add( ambientLight );

  ambientLightControl = new THREE.TransformControls( camera, renderer.domElement );
  ambientLightControl.addEventListener( 'change', render );
  ambientLightControl.addEventListener( 'dragging-changed', function ( event ) {
    controls.enabled = ! event.value;
  } );

  ambientLightControl.attach( ambientLight );
  ambientLightControl.setMode( "translate" );
  
  // scene.add( ambientLightControl );
  if(directionalLight){
    scene.remove (directionalLight);
    scene.remove (directionalLightControl);
  }

  directionalLight = directional;
  directionalLight.position.set( 100, 100, 100 );
  // directionalLight.position.set( - 1, 1, 1 ).normalize();
  directionalLight.castShadow = true;
  scene.add( directionalLight );

  directionalLight.add(pointLoader());
  
  directionalLightControl = new THREE.TransformControls( camera, renderer.domElement );
  directionalLightControl.addEventListener( 'change', render );
  directionalLightControl.addEventListener( 'dragging-changed', function ( event ) {
    controls.enabled = ! event.value;
  } );

  directionalLightControl.attach( directionalLight );
  directionalLightControl.setMode( "translate" );
  
  scene.add( directionalLightControl );
}

function pointLoader (size = 1) {
  var material = new THREE.MeshPhongMaterial( { depthTest: false} );

  var geometry = new THREE.SphereGeometry( 3, 5, 5 );
  var sphere = new THREE.Mesh( geometry, material );

  sphere.material.color.set( 0xffffff );
  sphere.material.wireframe = true;
  sphere.material.receiveShadow = false;
  sphere.material.castShadow = false;
  sphere.renderOrder = 1;
  sphere.scale.set(1/size,1/size,1/size);
  return sphere;
}


function loadModel(modelIndex) {
    if(activeModel){
      scene.remove(activeModel);
      childObjects.forEach(child => scene.remove(child));
      childObjects = [];
    }

    modelLoader = Models[modelIndex];

    var loader;
    if(modelLoader.type == 'fbx') {
      lightSetup(new THREE.AmbientLight( 0x443333, 4 ), new THREE.DirectionalLight( 0xffffbb, 2 ));
      loader = new THREE.FBXLoader();
    } else if(modelLoader.type == 'mmd') {
      lightSetup(new THREE.AmbientLight( 0x666666, 0.5 ), new THREE.DirectionalLight( 0x887766, 1.2 ));
      loader = new THREE.MMDLoader();
    }
    
    document.querySelector("#loading").style.visibility='visible'
    loader.load( `engine/models/${modelLoader.path}`, function ( object ) {

      traverseJoints(modelLoader, object, function (child) {
        var sphere = pointLoader(modelLoader.scale);
        childObjects.push(sphere);
        child.add( sphere );
      });
      
      activeModel = object;
      object.scale.set(modelLoader.scale, modelLoader.scale, modelLoader.scale);
      scene.add( object );
      document.querySelector("#loading").style.visibility='hidden'

      setPose(currentPose.pose);
    }, onProgress );
}

function onProgress( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    document.querySelector("#loading").innerHTML = `Loading - ${Math.round( percentComplete, 2 )}% downloaded`;
  }
}

function traverseJoints (modelInfo, model, thingToDo) {
  var jointChecker = [];
  var checked = [];

  model.traverse( function ( child ) {
    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }

    if (child.isObject3D && child.name != "Alpha_Surface" && child.name != "Alpha_Joints"){
      !jointChecker.includes(child.name) && !/\d/.test(child.name) && jointChecker.push(`"${child.name}"`);
      
      if(modelInfo.joints.includes(child.name) && !checked.includes(child.name)){
        thingToDo(child);
        checked.push(child.name);
      }
    }
  } );
  console.log(jointChecker.toString());
}

function onWindowResize() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  effect.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  effect.render( scene, camera );
}

function selectJoint(event, x, y) {

    mouse.x = (x / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y =  - (y / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    var intersects = raycaster.intersectObjects(childObjects);

    if (intersects.length > 0) {
      if(!jointControl){
        jointControl = new THREE.TransformControls( camera, renderer.domElement );
        jointControl.addEventListener( 'change', render );
        jointControl.attach( intersects[0].object.parent );
        jointControl.setMode( "rotate" );
        jointControl.setSpace( "local" );
        console.log(intersects[0].object.parent.name);
        jointControl.addEventListener( 'dragging-changed', function ( event ) {
          controls.enabled = ! event.value;
          
          setCurrentPose(modelLoader.id, activeModel);
        } );
        scene.add( jointControl );
      } else {
        jointControl.attach( intersects[0].object.parent );
      }
    } else {
      if(controls.enabled && jointControl){
        jointControl.detach();
      }
    }
}

function toggleJoints () {
  childObjects.forEach(child => child.visible = !child.visible);
}

function updateLightIntensity(amount) {
  directionalLight.intensity += amount;
}

document.addEventListener('mousedown', function (event) {
  event.preventDefault();
  
  selectJoint(event, event.clientX, event.clientY);
}, false);

document.addEventListener('touchstart', function (event) {
  event.preventDefault();
  selectJoint(event, event.touches[0].clientX, event.touches[0].clientY);
}, false);

