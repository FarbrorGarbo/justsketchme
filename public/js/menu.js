
init();

function init() {
  const menu = document.querySelector('.model-list');
  // menu.innerHTML = "";
  Models.forEach((model, index) => {
    // menu.innerHTML+= `<a href="javascript:loadModel(${index});">${model.name}</a><br>`;
    menu.innerHTML += `
    <li>
      <button class="model" onclick="loadModel(${index});toggle_visibility('.model-list');">
        <img src="images/tools/stick-man.svg"/>
        ${model.name}
      </button
    </li>`
  })
}