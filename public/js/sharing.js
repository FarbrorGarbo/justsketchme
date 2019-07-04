




function share() {
  // var filename = prompt('What do you want to call your pose?') + '.jsm'

  // console.log(Base64.encode( JSON.stringify(currentPose)));
  var encoded = Base64.encode( JSON.stringify(currentPose));
  prompt('Copy the link below', `${window.location}?pose=${encoded}`)
  // console.log(Base64.decode(encoded));
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

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue){
  var urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1){
      urlparameter = getUrlVars()[parameter];
      }
  return urlparameter;
}

function getPoseFromUrlParam() {
  var param = getUrlParam('pose');
  if (!param)
    return false;
  return JSON.parse(Base64.decode(param).pose);
}