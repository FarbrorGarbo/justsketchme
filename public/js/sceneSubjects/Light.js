function Light(scene, lightProperties, position, movement=false) {
  const light = lightProperties;

  scene.add(light);

  if(movement){
    this.joint = new Joint();
    light.add(this.joint);
    this.lightGizmo = new Control(light, "translate");
  }
  
  light.position.set(position.x, position.y, position.z);

  this.increaseIntensity = function () {
    light.intensity += 0.3
  }

  this.decreaseIntensity = function () {
    light.intensity -= 0.3
  }
  
  this.setGizmo = function () {

    if (activeGizmo === gizmos.TRANSLATE || activeGizmo === gizmos.ROTATE) {
      if(movement){
        this.joint.visible = true;
        this.lightGizmo.attach(light);
      }
    } else {
      if(movement){
        this.joint.visible = false;
        this.lightGizmo.detach();
      }
    }
  }
}