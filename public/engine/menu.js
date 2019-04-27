
init();

function init() {
  const menu = document.querySelector('#info');
  // menu.innerHTML = "";
  Models.forEach((model, index) => {
    menu.innerHTML+= `<a href="javascript:loadModel(${index});">${model.name}</a><br>`;
  })
}