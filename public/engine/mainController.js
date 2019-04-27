

if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}
var container, stats, controls, jointControl, lightControl;
var camera, scene, renderer, hemisphereLight, directionalLight;
var childObjects = [];
var clock = new THREE.Clock();
var mixer;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var activeModel;

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

  loadModel(3);
  lightSetup();
}

function lightSetup () {
  hemisphereLight = new THREE.HemisphereLight( 0x443333, 0x111122 );
  scene.add( hemisphereLight );

  directionalLight = new THREE.DirectionalLight( 0xffffbb, 2 );
  directionalLight.position.set( 0, 250, 100 );
  directionalLight.castShadow = true;
  scene.add( directionalLight );

  directionalLight.add(pointLoader());
  
  lightControl = new THREE.TransformControls( camera, renderer.domElement );
  lightControl.addEventListener( 'change', render );
  lightControl.addEventListener( 'dragging-changed', function ( event ) {
    controls.enabled = ! event.value;
  } );

  lightControl.attach( directionalLight );
  lightControl.setMode( "translate" );
  
  scene.add( lightControl );
}

function pointLoader () {
  var material = new THREE.MeshPhongMaterial( { depthTest: false} );

  var geometry = new THREE.SphereGeometry( 3, 5, 5 );
  var sphere = new THREE.Mesh( geometry, material );

  sphere.material.color.set( 0xffffff );
  sphere.material.wireframe = true;
  sphere.material.receiveShadow = false;
  sphere.material.castShadow = false;
  sphere.renderOrder = 1;

  return sphere;
}

function loadModel(modelIndex) {
    // if(activeModel){
      scene.remove(activeModel);
      childObjects.forEach(child => scene.remove(child));
      childObjects = [];
    // }

    const model = Models[modelIndex];
    var loader = model.type == 'fbx' ? new THREE.FBXLoader() : new THREE.MMDLoader();
    document.querySelector("#loading").style.visibility='visible'
    loader.load( `engine/models/${model.path}`, function ( object ) {
  
      var jointChecker = [];
      object.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        // child.material =  new THREE.MeshPhongMaterial();

        if (child.isObject3D && child.name != "Alpha_Surface" && child.name != "Alpha_Joints"){
          !jointChecker.includes(child.name) && !/\d/.test(child.name) && jointChecker.push(child.name);
          
          if(model.joints.includes(child.name)){
            var sphere = pointLoader();
            childObjects.push(sphere);
            child.add( sphere );
          }
        }
      } );
      console.log(jointChecker.toString());
      
      activeModel = object;
      object.scale.set(model.scale, model.scale, model.scale);
      scene.add( object );
      document.querySelector("#loading").style.visibility='hidden'
    }, onProgress );
}

function onProgress( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    document.querySelector("#loading").innerHTML = `Loading - ${Math.round( percentComplete, 2 )}% downloaded`;
  }
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
  // renderer.render( scene, camera );
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
        jointControl.addEventListener( 'dragging-changed', function ( event ) {
          controls.enabled = ! event.value;
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

