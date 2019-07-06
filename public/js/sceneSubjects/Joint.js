function Joint (size = 1, color, name = "joint") {

  var material = new THREE.MeshPhongMaterial( { depthTest: false} );
  var geometry = new THREE.SphereGeometry( 3, 32, 32 );
  var joint = new THREE.Mesh( geometry, material );

  joint.name = name;
  joint.selected = false;
  joint.defaultColor = color;
  joint.defaultOpacity = jointOpacities.DEFAULT_OPACITY;

  joint.setColor = function(color) {
    joint.material.color.set(color);
  }

  joint.resetColor = function () {
    joint.setColor(joint.defaultColor);
  }

  joint.setOpacity = function(opacity) {
    joint.material.opacity = opacity;
  }
  
  joint.resetOpacity = function () {
    joint.setOpacity(joint.defaultOpacity);
  }

  joint.reset = function() {
    joint.selected = false;
    joint.resetColor();
    joint.resetOpacity();
  }

  joint.setColor(joint.defaultColor);
  joint.setOpacity(joint.defaultOpacity);

  joint.material.wireframe = true;
  joint.material.receiveShadow = false;
  joint.material.castShadow = false;
  joint.renderOrder = 1;
  joint.scale.set(1/size,1/size,1/size);

  return joint;
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
