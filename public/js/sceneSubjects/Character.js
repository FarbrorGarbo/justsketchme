function Character(characterIndex, center = false) {
  const character = this;
  const characterInfo = characters[characterIndex];

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

      const jointInfo = characterInfo.joints.find(joint => joint.name === child.name)
      const jointName = jointInfo.name;
      const jointScale = jointInfo.scale;
      const jointColor = jointInfo.color;

      const joint = new Joint(jointScale, jointColor, jointName);

      joints.push(joint);

      child.add(joint);
    });
    if (center) {
      rig.position.set(0, 0, 0);
    } else {
      rig.position.set(Math.random() * 100, 0, Math.random() * 100)
    }
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

        if (characterInfo.joints.some(joint => joint.name === child.name) && !checked.includes(child.name)) {
          thingToDo(child);
          checked.push(child.name);
        }
      }
    });
  }

  character.selectJoint = function (x, y, joints) {
    lastAccessed = character;
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = ((x - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1;
    mouse.y = -((y - canvas.offsetTop) / canvas.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(joints);
    if (activeGizmo === gizmos.ROTATE) {
      if (intersects.length > 0) {
        var selectedJoint = intersects[0].object;
        joints.forEach(joint => {
          joint.reset();
        });

        if (!character.jointControl) {
          character.jointControl = new Control(selectedJoint.parent, "rotate");
        } else {
          character.jointControl.updateObject(selectedJoint.parent);
        }
        selectedJoint.setColor(jointColors.SELECTED_COLOR);
        selectedJoint.setOpacity(jointOpacities.SELECTED_OPACITY);
        selectedJoint.selected = true;

      } else {
        if (orbitControl.enabled && character.jointControl) {
          character.jointControl.detach();
          joints.forEach(joint => {
            joint.reset();
          });
        }
      }
    }
    if (activeGizmo === gizmos.DELETE) {
      if (intersects.length > 0) {
        scene.remove(character.rig);
        character.alive = false;
      }
    }
  }

  character.hoverJoint = function (x, y, joints) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = ((x - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1;
    mouse.y = -((y - canvas.offsetTop) / canvas.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(joints);
    if (activeGizmo === gizmos.ROTATE) {
      if (intersects.length > 0) {
        intersects[0].object.setOpacity(jointOpacities.HIGHLIGHTED_OPACITY);
      } else {
        joints.forEach(joint => {
          if (!joint.selected) {
            joint.resetOpacity();
          }
        });
      }
    }
  }

  character.setGizmo = function () {
    joints.forEach(joint => joint.visible = activeGizmo === gizmos.ROTATE);
    joints[0].visible = true;
    joints[0].reset();

    if (character.translateControl) {
      character.translateControl.detach();
    }
    if (activeGizmo === gizmos.TRANSLATE) {
      character.translateControl = new Control(joints[0].parent, "translate");
    }
    if (activeGizmo === gizmos.SCALE) {
      character.translateControl = new Control(joints[0].parent, "scale");
    }
    if (activeGizmo === gizmos.NONE) {
      joints.forEach(joint => joint.visible = false);
      if (character.translateControl) {
        character.translateControl.detach();
      }
      if (character.jointControl) {
        character.jointControl.detach();
      }
    }
    if (activeGizmo === gizmos.DELETE) {
      joints[0].setColor(jointColors.DELETE_COLOR);
    }
  }

  character.onClick = function (x, y) {
    character.selectJoint(x, y, joints);
  }

  character.onMouseMove = function (x, y) {
    character.hoverJoint(x, y, joints);
  }

  character.getPose = function () {
    let pose = {};
    character.traverseJoints(characterInfo, character.rig, function (child) {
      pose[child.name] = {
        x: child.rotation.x,
        y: child.rotation.y,
        z: child.rotation.z,
      };
    });
    return pose;
  }

  character.setPose = function (pose) {
    character.traverseJoints(characterInfo, character.rig, function (child) {
        child.rotation.set(pose[child.name].x, pose[child.name].y, pose[child.name].z);
    });
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
