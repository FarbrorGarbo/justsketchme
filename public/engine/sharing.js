



function takeScreenshot() {
  /*
    // open in new window like this
    //
    var w = window.open('', '');
    w.document.title = "Screenshot";
    //w.document.body.style.backgroundColor = "red";
    var img = new Image();
    // Without 'preserveDrawingBuffer' set to true, we must render now
    renderer.render(scene, camera);
    img.src = renderer.domElement.toDataURL();
    w.document.body.appendChild(img);  
  */

  // download file like this.
  //
  var a = document.createElement('a');
  // Without 'preserveDrawingBuffer' set to true, we must render now
  renderer.render(scene, camera);
  a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
  a.download = 'JustSketchMe - Screenshot.png'
  a.click();
}

function share() {
  // var filename = prompt('What do you want to call your pose?') + '.jsm'
  console.log(JSON.stringify(currentPose));
  var encoded = Base64.encode( JSON.stringify(currentPose));
  console.log(encoded);
  console.log(Base64.decode(encoded));
  // download(filename, JSON.stringify(currentPose));
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function openSharedPose() {
  var fileToLoad = document.getElementById("fileToLoad").files[0];

  if (!fileToLoad) return;
  var fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    var savedInfo = JSON.parse(textFromFileLoaded);

    setPose(savedInfo.pose);
    currentPose.modelId = savedInfo.modelId;
    currentPose.pose = savedInfo.pose;
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}