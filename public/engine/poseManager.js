
var namedJoints = ['Hips','Spine','LeftShoulder','LeftArm','LeftHand','LeftForeArm','Neck','Head','RightShoulder','RightArm','RightForeArm','RightHand','LeftUpLeg','LeftLeg','LeftFoot','LeftToeBase','RightUpLeg','RightLeg','RightFoot','RightToeBase'];
var jointRotationStore = [];
var currentPose = {modelId: 0, pose: null};

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
  var poseToUse;

    poseToUse = pose || getPoseFromUrlParam() || JSON.parse(Base64.decode(defaultPose)).pose;

  var i = 0;
  traverseJoints(modelLoader, activeModel, function (child) {
    namedJoints.forEach(name => {
      if(child.name.includes(name)){
        child.rotation.set(poseToUse[name].x, poseToUse[name].y, poseToUse[name].z);
        // console.log(name);
      }
    });
  });
}

function setPoseFromString (poseString) {
  var pose = JSON.parse(poseString);
  setPose(pose);
}

const defaultPose = "eyJtb2RlbElkIjoxLCJwb3NlIjp7IkhpcHMiOnsieCI6MC4wOTg2MTM4MzU3NTc2NjAyNiwieSI6MC43NDEyMzc1MTMwOTA0OTA3LCJ6IjotMC4xNDU0OTA5NzM4NzYwMjg1OH0sIlNwaW5lIjp7IngiOi0wLjA3MDY0NTQ2MzkyODMwMDU0LCJ5IjotMC4wNDc4NjA5MDQ3NTk3Mjc0MywieiI6MC4xMTMwMjE1MzM1MDA4NTQ0OX0sIk5lY2siOnsieCI6MC4wMDIwNzE3MzU1MjE0OTE0MjE2LCJ5IjotMS4yMzkxNTMxMDExNjM2ODAzLCJ6IjowLjAwMjE5MTEzMzEwMDU5MzQzMn0sIkhlYWQiOnsieCI6MC4xOTM3ODg4OTkzODg0MDQwNSwieSI6MC40MDkxNTk4NDc1OTY2MSwieiI6LTAuMTc2NzAyOTU4MTM2NDYxMjh9LCJMZWZ0U2hvdWxkZXIiOnsieCI6MCwieSI6MCwieiI6MH0sIkxlZnRBcm0iOnsieCI6MC40MDA4NDcyODIyMzYzMjA2NiwieSI6LTAuMTcyMjc2NTc4MTQ1Nzg5NSwieiI6LTEuMjQ0OTE5ODY1MDMwMzg2fSwiTGVmdEZvcmVBcm0iOnsieCI6LTAuNTEzMzU5OTY0MDM1ODY5LCJ5IjotMC41ODY3MjU0MTg2MzM5MDI4LCJ6IjotMC4zMDI1NDY0Mjc5NDM3ODcwNn0sIkxlZnRIYW5kIjp7IngiOjAsInkiOjAsInoiOjB9LCJUaHVtYiI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiSW5kZXgiOnsieCI6MCwieSI6MCwieiI6MH0sIk1pZGRsZSI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiUmluZyI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiUGlua3kiOnsieCI6MCwieSI6MCwieiI6MH0sIlJpZ2h0U2hvdWxkZXIiOnsieCI6MCwieSI6MCwieiI6MH0sIlJpZ2h0QXJtIjp7IngiOjAuNDE5MjQ1MTczMTM1OTU1NSwieSI6LTAuMDI0MDg5NTU5MTk0MjQzNDEsInoiOjEuMjgyNTYyMDY2MTEwNjkzM30sIlJpZ2h0Rm9yZUFybSI6eyJ4IjowLjE3NjE3NTc5MTIwODIzNTg0LCJ5IjowLjYxMDQ1OTUwMTA3NDM5NzIsInoiOi0wLjA1NTM3OTY0NzI0MTY2MzA1NX0sIlJpZ2h0SGFuZCI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiTGVmdFVwTGVnIjp7IngiOi0wLjI3MDc0MjAzMzYwMTU5MzksInkiOjAuNzQ4ODIzNjU0MTEzNjE0NCwieiI6MC40MzI0ODQ1ODUxODkyMjc2fSwiTGVmdExlZyI6eyJ4IjowLjAyMzU2NzQzNjE3OTM3MTA2NywieSI6MCwieiI6MH0sIkxlZnRGb290Ijp7IngiOjAuMjE2ODA2NDY0ODkzNDc0MDUsInkiOjAsInoiOjB9LCJMZWZ0VG9lQmFzZSI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiUmlnaHRVcExlZyI6eyJ4IjotMC4wMDg4NTM1MTI3NTUyNTIyMDcsInkiOi0wLjE4MTc3MzMxNzkwMTAzMzE4LCJ6IjowLjA4MzMwNzU1MDIxMzE4MzEzfSwiUmlnaHRMZWciOnsieCI6MCwieSI6MCwieiI6MH0sIlJpZ2h0Rm9vdCI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiUmlnaHRUb2VCYXNlIjp7IngiOjAsInkiOjAsInoiOjB9fX0=";