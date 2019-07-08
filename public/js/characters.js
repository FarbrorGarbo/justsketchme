const characters = [
  {
    name: 'Test',
    id: 0,
    path: 'models/female.fbx',
    scale: 0.2,
    type: 'fbx',
    joints: [
    {
      name: "J_Pelvis",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Hip",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Lumbar",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Dorsal",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Dorsal2",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Neck1",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Neck2",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Head",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "L_Collar",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Arm",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Forearm",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Hand",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Finger11",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger12",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger13",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger14",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger15",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger16",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger17",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger18",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger19",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger20",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger21",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger22",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger23",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger31",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger32",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger33",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger41",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger42",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger43",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger51",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger52",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger53",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Thigh",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Leg",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Foot",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Toes",
      scale: 2,
      color: 0xff0000,
    },
    {
      name: "L_Bigtoe",
      scale: 2,
      color: 0xff0000,
    },
    {
      name: "R_Collar",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Arm",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Forearm",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Hand",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Finger11",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger12",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger13",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger14",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger15",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger16",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger17",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger18",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger19",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger20",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger21",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger22",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger23",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger31",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger32",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger33",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger41",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger42",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger43",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger51",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger52",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger53",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Thigh",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Leg",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Foot",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Toes",
      scale: 2,
      color: 0x0000ff,
    },
    {
      name: "R_Bigtoe",
      scale: 2,
      color: 0x0000ff,
    },
  ],
  },
  {
    name: 'Test',
    id: 0,
    path: 'models/male.fbx',
    scale: 0.2,
    type: 'fbx',
    joints: [{
      name: "J_Hip",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Lumbar",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Dorsal",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Neck",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "J_Head",
      scale: 1,
      color: 0xffff00,
    },
    {
      name: "L_Collar",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Arm",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Forearm",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Hand",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Finger11",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger12",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger13",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger14",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger15",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger16",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger17",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger18",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger19",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger20",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger21",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger22",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger23",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger31",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger32",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger33",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger41",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger42",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger43",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger51",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger52",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Finger53",
      scale: 5,
      color: 0xff0000,
    },
    {
      name: "L_Thigh",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Leg",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_Foot",
      scale: 1,
      color: 0xff0000,
    },
    {
      name: "L_FourToes",
      scale: 2,
      color: 0xff0000,
    },
    {
      name: "L_BigToe",
      scale: 2,
      color: 0xff0000,
    },
    {
      name: "R_Collar",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Arm",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Forearm",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Hand",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Finger11",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger12",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger13",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger14",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger15",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger16",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger17",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger18",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger19",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger20",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger21",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger22",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger23",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger31",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger32",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger33",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger41",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger42",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger43",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger51",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger52",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Finger53",
      scale: 5,
      color: 0x0000ff,
    },
    {
      name: "R_Thigh",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Leg",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_Foot",
      scale: 1,
      color: 0x0000ff,
    },
    {
      name: "R_FourToes",
      scale: 2,
      color: 0x0000ff,
    },
    {
      name: "R_BigToe",
      scale: 2,
      color: 0x0000ff,
    },
  ],
  },
  {
    name: 'Female mannequin',
    id: 1,
    src: 'https://justsketchme.nyc3.cdn.digitaloceanspaces.com/xbot.fbx',
    path: 'models/xbot.fbx',
    scale: 1,
    type: 'fbx',
    joints: [{
        name: "mixamorigHips",
        scale: 1,
        color: 0xffff00, 
      },
      {
        name: "mixamorigSpine",
        scale: 1,
        color: 0xffff00,
      },
      {
        name: "mixamorigNeck",
        scale: 1,
        color: 0xffff00,
      },
      {
        name: "mixamorigHead",
        scale: 1,
        color: 0xffff00, 
      },
      {
        name: "mixamorigLeftShoulder",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftArm",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftForeArm",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHand",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigRightShoulder",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightArm",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightForeArm",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightHand",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightUpLeg",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightLeg",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightFoot",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightToeBase",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigLeftUpLeg",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftLeg",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftFoot",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftToeBase",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigRightHandPinky1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandPinky2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandPinky3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandRing1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandRing2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandRing3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandMiddle1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandMiddle2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandMiddle3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandIndex1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandIndex2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandIndex3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandThumb1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandThumb2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandThumb3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigLeftHandPinky1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandPinky2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandPinky3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandRing1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandRing2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandRing3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandMiddle1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandMiddle2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandMiddle3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandIndex1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandIndex2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandIndex3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandThumb1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandThumb2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandThumb3",
        scale: 5,
        color: 0xff0000, 
      },
    ]
  },
  {
    name: 'Male mannequin',
    id: 7,
    src: 'https://justsketchme.nyc3.cdn.digitaloceanspaces.com/ybot.fbx',
    path: 'models/ybot.fbx',
    scale: 1,
    type: 'fbx',
    joints: [{
        name: "mixamorigHips",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "mixamorigSpine",
        scale: 1,
        color: 0xffff00,
      }, {
        name: "mixamorigNeck",
        scale: 1,
        color: 0xffff00,
      }, {
        name: "mixamorigHead",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "mixamorigLeftShoulder",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "mixamorigLeftArm",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "mixamorigLeftForeArm",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "mixamorigLeftHand",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "mixamorigRightShoulder",
        scale: 1,
        color: 0x0000ff, 
      }, {
        name: "mixamorigRightArm",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightForeArm",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightHand",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightUpLeg",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightLeg",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightFoot",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigRightToeBase",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "mixamorigLeftUpLeg",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftLeg",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftFoot",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftToeBase",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "mixamorigRightHandPinky1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandPinky2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandPinky3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandRing1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandRing2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandRing3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandMiddle1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandMiddle2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandMiddle3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandIndex1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandIndex2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandIndex3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandThumb1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandThumb2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigRightHandThumb3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "mixamorigLeftHandPinky1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandPinky2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandPinky3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandRing1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandRing2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandRing3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandMiddle1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandMiddle2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandMiddle3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandIndex1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandIndex2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandIndex3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandThumb1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandThumb2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "mixamorigLeftHandThumb3",
        scale: 5,
        color: 0xff0000, 
      },
    ]
  },
  {
    name: 'Knight',
    id: 2,
    src: 'https://justsketchme.nyc3.cdn.digitaloceanspaces.com/knight/knight.fbx',
    path: 'models/knight.fbx',
    scale: 1.2,
    type: 'fbx',
    joints: [{
        name: "Hips",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "Spine",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "LeftShoulder",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "LeftArm",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "LeftForeArm",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "LeftHand",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "Neck",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "Head",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "RightShoulder",
        scale: 1,
        color: 0x0000ff, 
      }, {
        name: "RightArm",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightForeArm",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightHand",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "LeftUpLeg",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "LeftLeg",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "LeftFoot",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "LeftToeBase",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "RightUpLeg",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightLeg",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightFoot",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightToeBase",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "LeftHandThumb1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandThumb2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandThumb3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandPinky1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandPinky2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandPinky3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandRing1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandRing2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandRing3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandMiddle1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandMiddle2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandMiddle3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandIndex1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandIndex2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandIndex3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "RightHandThumb1",
        scale: 5,
        color: 0x0000ff, 
      },
      {
        name: "RightHandThumb2",
        scale: 5,
        color: 0x0000ff, 
      },
      {
        name: "RightHandThumb3",
        scale: 5,
        color: 0x0000ff, 
      },
      {
        name: "RightHandPinky1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandPinky2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandPinky3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandRing1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandRing2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandRing3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandMiddle1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandMiddle2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandMiddle3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandIndex1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandIndex2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandIndex3",
        scale: 5,
        color: 0x0000ff,
      },
    ]
  },
  {
    name: 'Assassin',
    id: 3,
    src: 'https://justsketchme.nyc3.cdn.digitaloceanspaces.com/akai_e_espiritu.fbx',
    path: 'models/akai_e_espiritu.fbx',
    scale: 1,
    type: 'fbx',
    joints: [{
        name: "Hips",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "Spine",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "LeftShoulder",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "LeftArm",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "LeftForeArm",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "LeftHand",
        scale: 1,
        color: 0xff0000, 
      }, {
        name: "Neck",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "Head",
        scale: 1,
        color: 0xffff00, 
      }, {
        name: "RightShoulder",
        scale: 1,
        color: 0x0000ff, 
      }, {
        name: "RightArm",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightForeArm",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightHand",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "LeftUpLeg",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "LeftLeg",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "LeftFoot",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "LeftToeBase",
        scale: 1,
        color: 0xff0000, 
      },
      {
        name: "RightUpLeg",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightLeg",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightFoot",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "RightToeBase",
        scale: 1,
        color: 0x0000ff, 
      },
      {
        name: "LeftHandThumb1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandThumb2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandThumb3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandPinky1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandPinky2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandPinky3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandRing1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandRing2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandRing3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandMiddle1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandMiddle2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandMiddle3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandIndex1",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandIndex2",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "LeftHandIndex3",
        scale: 5,
        color: 0xff0000, 
      },
      {
        name: "RightHandThumb1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandThumb2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandThumb3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandPinky1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandPinky2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandPinky3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandRing1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandRing2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandRing3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandMiddle1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandMiddle2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandMiddle3",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandIndex1",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandIndex2",
        scale: 5,
        color: 0x0000ff,
      },
      {
        name: "RightHandIndex3",
        scale: 5,
        color: 0x0000ff,
      },
    ]
  },
];
