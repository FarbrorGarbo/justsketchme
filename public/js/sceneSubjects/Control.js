function Control (_object, type, space = "local") {
  let object = _object
  var transformControl = new THREE.TransformControls(camera, canvas);

  transformControl.addEventListener('dragging-changed', function (event) {
    orbitControl.enabled = !event.value;
  });

  let rotationValues = {};
  transformControl.addEventListener('mouseDown', function (event) {
    rotationValues = {
      object: object,
      x: object.rotation.x,
      y: object.rotation.y,
      z: object.rotation.z,
    };
  });

  transformControl.addEventListener('mouseUp', function (event) {
    prevStore.push(rotationValues);
  });

  if(object) {
    transformControl.attach(object);
  }
  transformControl.setMode(type);
  transformControl.setSpace(space);

  scene.add(transformControl);
  
  this.updateObject = function (newObject) {
    transformControl.detach();
    transformControl.attach(newObject);
    object = newObject;
  }

  this.attach = function () {
    transformControl.attach();
  }

  this.detach = function () {
    transformControl.detach();
  }
}

const gizmos = {
  TRANSLATE: 'translate',
  SCALE: 'scale',
  ROTATE: 'rotate',
  NONE: 'none',
  DELETE: 'delete',
}

let activeGizmo = gizmos.ROTATE;