
function Character(characterIndex) {

  
  const character = this;

  const local = (location.hostname === "localhost" || location.hostname === "127.0.0.1");
  const characterInfo = Models[characterIndex];

  character.name = characterInfo.name;
  character.translateControl = null;
  character.jointControl = null;
  character.rig = null;
  character.alive = true;

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
    
    character.rig = rig;

    character.setGizmo(activeGizmo);

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
    if (activeGizmo === gizmos.ROTATE) {
      if (intersects.length > 0) {

        joints.forEach(joint => joint.material.color.setHex(0xffffff));

        if (!character.jointControl) {
          character.jointControl = character.addControl(intersects[0].object.parent, "rotate");
        } else {
          character.jointControl.detach();
          character.jointControl.attach(intersects[0].object.parent);
        }
        console.log(intersects[0].object.parent.name);
        intersects[0].object.material.color.setHex(0xff0000);
      } else {
        if (orbitControl.enabled && character.jointControl) {
          character.jointControl.detach();
          joints.forEach(joint => joint.material.color.setHex(0xffffff));
        }
      }
    }
    if(activeGizmo === gizmos.DELETE) {
      if (intersects.length > 0) {
      //TODO: Remove references to this character to clean it up.
        scene.remove(character.rig);
        character.alive = false;
      }
    }
  }

  character.addControl = function (object, type, space = "local") {
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

  character.setGizmo = function () {
    joints.forEach(joint => joint.visible = activeGizmo === gizmos.ROTATE);
    joints[0].visible = true;
    joints[0].material.color.setHex(0xffffff);

    if(character.translateControl) {
      character.translateControl.detach();
    }
    if (activeGizmo === gizmos.TRANSLATE) {
      character.translateControl = character.addControl(joints[0].parent, "translate");
    }
    if(activeGizmo === gizmos.NONE) {
      joints.forEach(joint => joint.visible = false);
      if(character.translateControl) {
        character.translateControl.detach();
      }
      if(character.jointControl) {
        character.jointControl.detach();
      }
    }
    if(activeGizmo === gizmos.DELETE) {
      joints[0].material.color.setHex(0xff0000);
    }
  }

  character.update = function (time) {
  }

  character.onClick = function (x, y) {
    character.selectJoint(x, y, joints);
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
