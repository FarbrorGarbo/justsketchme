function Character(scene, modelIndex, local) {
  var childObjects = [];
  modelLoader = Models[modelIndex];
  var modelPath = local || !modelLoader.src ?  modelLoader.path : `https://cors-anywhere.herokuapp.com/${modelLoader.src}`;

  const loader = new THREE.FBXLoader();

  loader.load(modelPath, function ( object ) {


    traverseJoints(modelLoader, object, function (child) {
      const fingerNames = ['Thumb','Index','Middle','Ring','Pinky'];

      const jointScale = fingerNames.some(finger => child.name.includes(finger)) ? modelLoader.scale * 5 : modelLoader.scale;
      var sphere = pointLoader(jointScale);
      childObjects.push(sphere);
      child.add( sphere );
    });
    
    // activeModel = object;
    object.scale.set(modelLoader.scale, modelLoader.scale, modelLoader.scale);
    scene.add( object );
    // addControl(object, "translate");

    document.querySelector("#loading").innerHTML = "";
    document.querySelector("#loading").style.visibility='hidden'
    
    // setPose(currentPose.pose);
    // loading = false;
  }, onProgress, onError );

  this.update = function(){};
}

function onError(msg) {
  console.log(msg);
  document.querySelector("#loading").innerHTML = "Failed to load model :(";
  loading = false;
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
      !jointChecker.includes(child.name) && jointChecker.push(`"${child.name}"`);
      
      if(modelInfo.joints.includes(child.name) && !checked.includes(child.name)){
        thingToDo(child);
        checked.push(child.name);
      }
    }
  } );
  // console.log(jointChecker.toString());
}

function selectJoint(x, y) {

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

document.addEventListener('mousedown', function (event) {
  event.preventDefault();
  
  selectJoint(event.clientX, event.clientY);
}, false);

document.addEventListener('touchstart', function (event) {
  event.preventDefault();
  selectJoint(event.touches[0].clientX, event.touches[0].clientY);
}, false);