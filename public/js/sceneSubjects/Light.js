function Light(scene, lightProperties) {
  const light = lightProperties;
  scene.add(light);
  this.onClick = function() {
    console.log('hai');
  }
}