

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

  if(directionalLight){
    scene.remove (directionalLight);
    scene.remove (directionalLightControl);
  }

  directionalLight = directional;
  directionalLight.position.set( 100, 100, 100 );
  directionalLight.castShadow = true;
  scene.add( directionalLight );

  directionalLight.add(pointLoader());
  
  directionalLightControl = addControl(directionalLight, "translate");
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
    console.log("Loading model!");
    modelLoader = Models[modelIndex];

    var loader;
    if(modelLoader.type == 'fbx') {
      lightSetup(new THREE.AmbientLight( 0x443333, 3 ), new THREE.DirectionalLight( 0xffffbb, 1 ));
      loader = new THREE.FBXLoader();
    } else if(modelLoader.type == 'mmd') {
      lightSetup(new THREE.AmbientLight( 0x666666, 0.5 ), new THREE.DirectionalLight( 0x887766, 1 ));
      loader = new THREE.MMDLoader();
    } else if (modelLoader.type == 'obj') {
      lightSetup(new THREE.AmbientLight( 0x666666, 0.5 ), new THREE.DirectionalLight( 0x887766, 1 ));
      loader = new THREE.OBJLoader();
    }
    
    document.querySelector("#loading").style.visibility='visible'
    loader.load( `engine/models/${modelLoader.path}`, function ( object ) {


      traverseJoints(modelLoader, object, function (child) {
        const fingerNames = ['Thumb','Index','Middle','Ring','Pinky'];
  
        const jointScale = fingerNames.some(finger => child.name.includes(finger)) ? modelLoader.scale * 5 : modelLoader.scale;
        var sphere = pointLoader(jointScale);
        childObjects.push(sphere);
        child.add( sphere );
      });
      
      activeModel = object;
      object.scale.set(modelLoader.scale, modelLoader.scale, modelLoader.scale);
      scene.add( object );
      // addControl(object, "translate");

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

function addControl(object, type, space="local", ondragCallback=null) {
  var transformControl = new THREE.TransformControls( camera, renderer.domElement );
  transformControl.addEventListener( 'change', render );
  transformControl.addEventListener( 'dragging-changed', function ( event ) {
    controls.enabled = ! event.value;
    ondragCallback();
  } );

  transformControl.attach( object );
  transformControl.setMode( type );
  transformControl.setSpace( space );
  
  scene.add( transformControl );
  return transformControl;
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
      !jointChecker.includes(child.name) && jointChecker.push(`"${child.name}"`);
      
      if(modelInfo.joints.includes(child.name) && !checked.includes(child.name)){
        thingToDo(child);
        checked.push(child.name);
      }
    }
  } );
  // console.log(jointChecker.toString());
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
      childObjects.forEach(child => child.material.color.setHex( 0xffffff ));
      if(!jointControl){
        // jointControl = new THREE.TransformControls( camera, renderer.domElement );
        // jointControl.addEventListener( 'change', render );
        // jointControl.attach( intersects[0].object.parent );
        // jointControl.setMode( "rotate" );
        // jointControl.setSpace( "local" );
        // jointControl.addEventListener( 'dragging-changed', function ( event ) {
        //   controls.enabled = ! event.value;
          
        //   setCurrentPose(modelLoader.id, activeModel);
        // } );
        // scene.add( jointControl );
        jointControl = addControl(intersects[0].object.parent, "rotate", () => setCurrentPose(modelLoader.id, activeModel));
      } else {
        jointControl.detach();
        jointControl.attach( intersects[0].object.parent );
      }
      console.log(intersects[0].object.parent.name);
      intersects[0].object.material.color.setHex( 0xff0000 );
    } else {
      if(controls.enabled && jointControl){
        jointControl.detach();
        childObjects.forEach(child => child.material.color.setHex( 0xffffff ));
      }
    }
}

function toggleJoints () {
  childObjects.forEach(child => child.visible = !child.visible);
  directionalLightControl.visible = !directionalLightControl.visible;
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

function toggle_visibility(query) {
  var e = document.querySelector(query);
  if(e.style.display == 'block')
     e.style.display = 'none';
  else
     e.style.display = 'block';
}
