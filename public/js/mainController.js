

if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}
var container, stats, controls, jointControl;
var camera, scene;
var childObjects = [];
var clock = new THREE.Clock();
var mixer;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var loading = false;
var modelLoader;

var local = (location.hostname === "localhost" || location.hostname === "127.0.0.1");

function init() {
  // container = document.createElement( 'div' );
  // document.body.appendChild( container );
  // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 2, 2000 );
  // camera.position.set( 100, 200, 300 );


  // renderer = new THREE.WebGLRenderer( { antialias: true } );
  // renderer.setPixelRatio( window.devicePixelRatio );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.shadowMap.enabled = true;
  // container.appendChild( renderer.domElement );

  // effect = new THREE.OutlineEffect( renderer );
  // window.addEventListener( 'resize', onWindowResize, false );

  // controls = new THREE.OrbitControls( camera, renderer.domElement );
  // controls.target.set( 0, 100, 0 );
  // controls.screenSpacePanning = true;
  // controls.update();

  // scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xffffff );

  // var gridHelper = new THREE.PolarGridHelper( 300, 10 );
  // scene.add( gridHelper );

  // loadModel(0);
}

// function lightSetup (ambient, directional) {
//   if(ambientLight){
//     scene.remove (ambientLight);
//     scene.remove (ambientLightControl);
//   }
//   ambientLight = ambient;

//   scene.add( ambientLight );

//   if(directionalLight){
//     scene.remove (directionalLight);
//     scene.remove (directionalLightControl);
//   }

//   directionalLight = directional;
//   directionalLight.position.set( 100, 100, 100 );
//   directionalLight.castShadow = true;
//   scene.add( directionalLight );

//   directionalLight.add(pointLoader());
  
//   directionalLightControl = addControl(directionalLight, "translate");
// }

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


function loadModel(modelIndex, orbitControl, _camera, _scene) {
  scene = _scene;
  camera = _camera;
  controls = orbitControl;
    if (loading) return;
    loading = true;

    console.log("Loading model!");
    modelLoader = Models[modelIndex];

    var loader = new THREE.FBXLoader();
    
    document.querySelector("#loading").style.visibility='visible'

    var modelPath = local || !modelLoader.src ?  modelLoader.path : `https://cors-anywhere.herokuapp.com/${modelLoader.src}`;

    loader.load(modelPath, function ( object ) {


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

      document.querySelector("#loading").innerHTML = "";
      document.querySelector("#loading").style.visibility='hidden'
      
      setPose(currentPose.pose);
      loading = false;
    }, onProgress, onError ); 
}

function onError() {
  document.querySelector("#loading").innerHTML = "Failed to load model :(";
  loading = false;
}

function onProgress( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    document.querySelector("#loading").innerHTML = `Loading - ${Math.round( percentComplete, 2 )}% downloaded`;
  }
}

function addControl(object, type, space="local") {
  var transformControl = new THREE.TransformControls( camera, canvas );
  transformControl.addEventListener( 'change', render );
  transformControl.addEventListener( 'dragging-changed', function ( event ) {
    controls.enabled = ! event.value;
    setCurrentPose(modelLoader.id, activeModel);
  } );

  transformControl.attach( object );
  transformControl.setMode( type );
  transformControl.setSpace( space );
  
  scene.add( transformControl );
  return transformControl;
}

function selectJoint(x, y) {

  mouse.x= ((x - canvas.offsetLeft)/canvas.clientWidth) * 2 - 1;
  mouse.y=-((y - canvas.offsetTop)/canvas.clientHeight) * 2 + 1;

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
      jointControl = addControl(intersects[0].object.parent, "rotate");
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

function traverseJoints (modelInfo, model, thingToDo) {
  var jointChecker = [];
  var checked = [];

  model.traverse( function ( child ) {
    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }

    if (child.isObject3D){
      !jointChecker.includes(child.name) && jointChecker.push(`"${child.name}"`);
      
      if(modelInfo.joints.includes(child.name) && !checked.includes(child.name)){
        thingToDo(child);
        checked.push(child.name);
      }
    }
  } );
  // console.log(jointChecker.toString());
}


function toggleJoints () {
  childObjects.forEach(child => child.visible = !child.visible);
  directionalLightControl.visible = !directionalLightControl.visible;
}

function updateLightIntensity(amount) {
  directionalLight.intensity += amount;
}

// document.addEventListener('mousedown', function (event) {
//   event.preventDefault();
  
//   selectJoint(event.clientX, event.clientY);
// }, false);

document.addEventListener('touchstart', function (event) {
  event.preventDefault();
  selectJoint(event.touches[0].clientX, event.touches[0].clientY);
}, false);

function toggle_visibility(query) {
  var e = document.querySelector(query);
  if(e.style.display == 'block')
     e.style.display = 'none';
  else
     e.style.display = 'block';
}
