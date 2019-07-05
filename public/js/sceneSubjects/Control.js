function Control (object, type, space = "local") {
  var transformControl = new THREE.TransformControls(camera, canvas);

  transformControl.addEventListener('dragging-changed', function (event) {
    orbitControl.enabled = !event.value;
  });

  if(object) {
    transformControl.attach(object);
  }
  transformControl.setMode(type);
  transformControl.setSpace(space);

  scene.add(transformControl);
  return transformControl;
}