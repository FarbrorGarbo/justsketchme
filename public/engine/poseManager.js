
var namedJoints = ['Hips','Spine','LeftShoulder','LeftArm','LeftHand','LeftForeArm','Neck','Head','RightShoulder','RightArm','RightForeArm','RightHand','LeftUpLeg','LeftLeg','LeftFoot','LeftToeBase','RightUpLeg','RightLeg','RightFoot','RightToeBase'];
var jointRotationStore = [];
var currentPose = {};

var log = false;
function setCurrentPose (modelId, model) {
  var camera = JSON.stringify(camera);
  var rotationValues = {};
  traverseJoints(modelLoader, model, function (child) {
    namedJoints.forEach(name => {
      if(child.name.includes(name)){
        rotationValues[name] = {
          x: child.rotation.x,
          y: child.rotation.y,
          z: child.rotation.z,
        };
      }
    })
  });
  
 
  if(!log){
    jointRotationStore.push(rotationValues);
    console.log('Update');
  } else {
    currentPose.modelId = modelId;
    currentPose.pose = rotationValues;
  }
  log = !log;

  return rotationValues;
}

function undo () {
  console.log("Undoing");
  if(jointRotationStore.length > 0) {
    setPose(jointRotationStore.pop())
  }
}

function reset() {
  setPose(jointRotationStore[0]);
}

function setPose (pose) {
  if (!pose) return;
  var i = 0;
  traverseJoints(modelLoader, activeModel, function (child) {
    namedJoints.forEach(name => {
      if(child.name.includes(name)){
        child.rotation.set(pose[name].x, pose[name].y, pose[name].z);
        console.log(name);
      }
    });
  });
}

function setPoseFromString (poseString) {
  var pose = JSON.parse(poseString);
  setPose(pose);
}