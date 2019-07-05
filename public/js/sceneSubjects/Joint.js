function Joint (size = 1, color, name = "joint") {
  var material = new THREE.MeshPhongMaterial( { depthTest: false} );

  var geometry = new THREE.SphereGeometry( 3, 32, 32 );
  var sphere = new THREE.Mesh( geometry, material );

  sphere.name = name;
  sphere.selected = false;
  sphere.material.color.set(color);
  sphere.material.opacity = jointOpacities.DEFAULT_OPACITY;
  sphere.material.wireframe = true;
  sphere.material.receiveShadow = false;
  sphere.material.castShadow = false;
  sphere.renderOrder = 1;
  sphere.scale.set(1/size,1/size,1/size);
  return sphere;
}

const jointColors = {
  SELECTED_COLOR: 0x00ff00,
  DELETE_COLOR: 0xff0000,
}

const jointOpacities = {
  SELECTED_OPACITY: 1,
  HIGHLIGHTED_OPACITY: 1,
  DEFAULT_OPACITY: 0.7,
}
