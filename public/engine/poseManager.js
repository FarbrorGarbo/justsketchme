
var namedJoints = ['Hips','Spine','LeftShoulder','LeftArm','LeftHand','LeftForeArm','Neck','Head','RightShoulder','RightArm','RightForeArm','RightHand','LeftUpLeg','LeftLeg','LeftFoot','LeftToeBase','RightUpLeg','RightLeg','RightFoot','RightToeBase',"LeftHandThumb1","LeftHandThumb2","LeftHandThumb3","LeftHandPinky1","LeftHandPinky2","LeftHandPinky3","LeftHandRing1","LeftHandRing2","LeftHandRing3","LeftHandMiddle1","LeftHandMiddle2","LeftHandMiddle3","LeftHandIndex1","LeftHandIndex2","LeftHandIndex3","RightHandThumb1","RightHandThumb2","RightHandThumb3","RightHandPinky1","RightHandPinky2","RightHandPinky3","RightHandRing1","RightHandRing2","RightHandRing3","RightHandMiddle1","RightHandMiddle2","RightHandMiddle3","RightHandIndex1","RightHandIndex2","RightHandIndex3"];
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
    console.log(Base64.encode( JSON.stringify(currentPose)));
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

const defaultPose = "eyJtb2RlbElkIjoxLCJwb3NlIjp7IkhpcHMiOnsieCI6MC4xNjIzODE2NjY4MDM3MDcyMiwieSI6MCwieiI6MH0sIlNwaW5lIjp7IngiOi0wLjE4NTQ2MDUyNTE4Mzc3Mzk4LCJ5IjowLCJ6IjowfSwiTGVmdFNob3VsZGVyIjp7IngiOjAsInkiOjAsInoiOjB9LCJMZWZ0QXJtIjp7IngiOjAuMzU3NDc3Nzg4NzYyMzU0MDMsInkiOjAuMDc0OTM4MTk1NDMxOTg0ODYsInoiOi0xLjM3Mjk4MTUzMzI3NDg4OTR9LCJMZWZ0Rm9yZUFybSI6eyJ4IjowLCJ5IjotMC43Nzk0OTA5NDQzMTkyNzkyLCJ6IjowfSwiTGVmdEhhbmQiOnsieCI6MCwieSI6MCwieiI6MH0sIkxlZnRIYW5kUGlua3kxIjp7IngiOjAsInkiOjAsInoiOjB9LCJMZWZ0SGFuZFBpbmt5MiI6eyJ4IjowLCJ5IjowLCJ6IjotMC4zMDU5MDcwOTU2MDc5MjQ4fSwiTGVmdEhhbmRQaW5reTMiOnsieCI6MCwieSI6MCwieiI6MH0sIkxlZnRIYW5kTWlkZGxlMSI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiTGVmdEhhbmRNaWRkbGUyIjp7IngiOjAsInkiOjAsInoiOi0wLjQxODcyMjQ3NjIwNjAyMzY1fSwiTGVmdEhhbmRNaWRkbGUzIjp7IngiOjAsInkiOjAsInoiOjB9LCJMZWZ0SGFuZFRodW1iMSI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiTGVmdEhhbmRUaHVtYjIiOnsieCI6MCwieSI6MC40NTA5NjQ5NTkyODM4NDI1NiwieiI6MH0sIkxlZnRIYW5kVGh1bWIzIjp7IngiOjAsInkiOjAsInoiOjB9LCJMZWZ0SGFuZEluZGV4MSI6eyJ4IjowLjAwNTUyNzY4NzE1MjI1MzUxMywieSI6MC4wMzQxMjQzNjQ2NzA3ODg2LCJ6IjotMC4xODk5NTc4NzA1MjkyNjUxNn0sIkxlZnRIYW5kSW5kZXgyIjp7IngiOjAsInkiOjAsInoiOi0wLjQ0MjE5OTMyMzc4OTIxMjR9LCJMZWZ0SGFuZEluZGV4MyI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiTGVmdEhhbmRSaW5nMSI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiTGVmdEhhbmRSaW5nMiI6eyJ4IjowLCJ5IjowLCJ6IjotMC4zNTQ3NTUxMzk5NDM3NjE0fSwiTGVmdEhhbmRSaW5nMyI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiTmVjayI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiSGVhZCI6eyJ4IjowLCJ5IjowLjcwODI4Njk3MjIxODI0NjMsInoiOjB9LCJSaWdodFNob3VsZGVyIjp7IngiOjAsInkiOjAsInoiOjB9LCJSaWdodEFybSI6eyJ4IjowLjE1MzIxMjYwMzYyMjk2NDEsInkiOi0wLjA2MDY1NjU5NDMzNzY5MzI4LCJ6IjoxLjMzMDU3NzEwMTU0MDg1NTR9LCJSaWdodEZvcmVBcm0iOnsieCI6MCwieSI6MC40MTU0OTQ4ODk4MDQyNTM2LCJ6IjowfSwiUmlnaHRIYW5kIjp7IngiOjAsInkiOjAsInoiOjB9LCJSaWdodEhhbmRQaW5reTEiOnsieCI6MCwieSI6MCwieiI6MH0sIlJpZ2h0SGFuZFBpbmt5MiI6eyJ4IjowLCJ5IjowLCJ6IjowLjQyOTc5OTAzNjQzMzY3ODM0fSwiUmlnaHRIYW5kUGlua3kzIjp7IngiOjAsInkiOjAsInoiOjB9LCJSaWdodEhhbmRSaW5nMSI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiUmlnaHRIYW5kUmluZzIiOnsieCI6MCwieSI6MCwieiI6MC40OTUyODg4NDk4NTA3MDI3fSwiUmlnaHRIYW5kUmluZzMiOnsieCI6MCwieSI6MCwieiI6MH0sIlJpZ2h0SGFuZE1pZGRsZTEiOnsieCI6MCwieSI6MCwieiI6MH0sIlJpZ2h0SGFuZE1pZGRsZTIiOnsieCI6MCwieSI6MCwieiI6MC40NTIyOTY2ODYwODc5OTk4fSwiUmlnaHRIYW5kTWlkZGxlMyI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiUmlnaHRIYW5kSW5kZXgxIjp7IngiOjAsInkiOjAsInoiOjAuMTM2Mzc4OTg1MDU2MzU2NH0sIlJpZ2h0SGFuZEluZGV4MiI6eyJ4IjowLCJ5IjowLCJ6IjowLjQyMzI3MTAyMDQwOTE4MTV9LCJSaWdodEhhbmRJbmRleDMiOnsieCI6MCwieSI6MCwieiI6MH0sIlJpZ2h0SGFuZFRodW1iMSI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiUmlnaHRIYW5kVGh1bWIyIjp7IngiOjAsInkiOi0wLjM2MjQ0MDk3Njk4NDI1MjU0LCJ6IjowfSwiUmlnaHRIYW5kVGh1bWIzIjp7IngiOjAsInkiOjAsInoiOjB9LCJMZWZ0VXBMZWciOnsieCI6LTAuMjU4MTgyODE3NTAxMTI3NiwieSI6LTAuMDAzNzI1MDAyMjYxNDk4NTM4LCJ6IjowLjAzNDg5MjY3MjAxMTkyMTcyfSwiTGVmdExlZyI6eyJ4IjowLjQwNjA2Mjk2MDc4NjIyNDA2LCJ5IjowLCJ6IjowfSwiTGVmdEZvb3QiOnsieCI6MCwieSI6MCwieiI6MH0sIkxlZnRUb2VCYXNlIjp7IngiOi0wLjQwNjAyNzMzNjA0ODExMDAzLCJ5IjowLCJ6IjowfSwiUmlnaHRVcExlZyI6eyJ4IjotMC4xNjk1NzUyNjk0NTExMjEyNSwieSI6LTAuMzU5Mzc1Njk1MzIwNTk2NiwieiI6LTAuMDMwOTU5MTI1NTY5NTI4NjAyfSwiUmlnaHRMZWciOnsieCI6MCwieSI6MCwieiI6MH0sIlJpZ2h0Rm9vdCI6eyJ4IjowLCJ5IjowLCJ6IjowfSwiUmlnaHRUb2VCYXNlIjp7IngiOjAsInkiOjAsInoiOjB9fX0=";