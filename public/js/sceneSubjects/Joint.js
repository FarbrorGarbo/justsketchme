function Joint (size = 1, color, name = "joint") {
  var material = new THREE.MeshPhongMaterial( { depthTest: false} );

  var geometry = new THREE.SphereGeometry( 3, 5, 5 );
  var sphere = new THREE.Mesh( geometry, material );

  sphere.name = name;
  sphere.material.color.set(color);
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
