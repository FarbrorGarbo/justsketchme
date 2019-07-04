
function Character(characterIndex) {

  let jointControl = null;
  const character = this;

  const local = (location.hostname === "localhost" || location.hostname === "127.0.0.1");
  const characterInfo = Models[characterIndex];

  this.name = characterInfo.name;

  let joints = [];
  const loader = new THREE.FBXLoader();
  
  document.querySelector("#loading").style.visibility = 'visible'

  const modelPath = local || !characterInfo.src ? characterInfo.path : `https://cors-anywhere.herokuapp.com/${characterInfo.src}`;

  loader.load(modelPath, function (rig) {
    character.traverseJoints(characterInfo, rig, function (child) {
      const fingerNames = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];

      const jointScale = fingerNames.some(finger => child.name.includes(finger)) ? characterInfo.scale * 5 : characterInfo.scale;

      const joint = new Joint(jointScale, 0xffffff);

      joints.push(joint);

      child.add(joint);
    });
    rig.position.set(Math.random() * 100, 0, Math.random() * 100)
    rig.scale.set(characterInfo.scale, characterInfo.scale, characterInfo.scale);
    scene.add(rig);

    document.querySelector("#loading").innerHTML = "";
    document.querySelector("#loading").style.visibility = 'hidden'

  }, onProgress, (err) => onError(err));

  character.traverseJoints = function (characterInfo, rig, thingToDo) {
    var jointChecker = [];
    var checked = [];
  
    rig.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
  
      if (child.isObject3D) {
        !jointChecker.includes(child.name) && jointChecker.push(`"${child.name}"`);
  
        if (characterInfo.joints.includes(child.name) && !checked.includes(child.name)) {
          thingToDo(child);
          checked.push(child.name);
        }
      }
    });
  }

  character.selectJoint = function (x, y, joints) {

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
  
    mouse.x = ((x - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1;
    mouse.y = -((y - canvas.offsetTop) / canvas.clientHeight) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
  
    var intersects = raycaster.intersectObjects(joints);
    if (intersects.length > 0) {
  
      joints.forEach(joint => joint.material.color.setHex(0xffffff));
  
      if (!jointControl) {
        jointControl = character.addControl(intersects[0].object.parent, "rotate");
      } else {
        jointControl.detach();
        jointControl.attach(intersects[0].object.parent);
      }
      console.log(intersects[0].object.parent.name);
      intersects[0].object.material.color.setHex(0xff0000);
    } else {
      if (orbitControl.enabled && jointControl) {
        jointControl.detach();
        joints.forEach(joint => joint.material.color.setHex(0xffffff));
      }
    }
  }

  character.addControl = function (object, type, space = "local") {
    var transformControl = new THREE.TransformControls(camera, canvas);
  
    transformControl.addEventListener('dragging-changed', function (event) {
      orbitControl.enabled = !event.value;
    });
  
    transformControl.attach(object);
    transformControl.setMode(type);
    transformControl.setSpace(space);
  
    scene.add(transformControl);
    return transformControl;
  }

  character.update = function (time) {
  }

  character.onClick = function (x, y) {
    character.selectJoint(x, y, joints);
  }

  character.toggleJoints = function () {
    joints.forEach(joint => joint.visible = !joint.visible);
  }
}

function onError(err) {
  document.querySelector("#loading").innerHTML = "Failed to load model :(";
  console.log(err);
}

function onProgress(xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    document.querySelector("#loading").innerHTML = `Loading - ${Math.round(percentComplete, 2)}% downloaded`;
  }
}
