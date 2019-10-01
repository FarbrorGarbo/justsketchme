let licence_activated = false;
let licence_key = localStorage.getItem('licence_key') || false;

if(licence_key) {
  validateLicenceKey();
}

document.getElementById('licence-key').addEventListener("click", e => {
  licence_key = prompt("Enter your licence key");
  validateLicenceKey();
})

function validateLicenceKey() {
  var request = new XMLHttpRequest()
  // Open a new connection, using the GET request on the URL endpoint
  request.open('POST', `https://cors-anywhere.herokuapp.com/https://api.gumroad.com/v2/licenses/verify?product_permalink=MjNqbv&license_key=${licence_key}&increment_uses_count=false`, true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      licence_activated = true;
      toggleLicenceModal();
      document.querySelector('.licence-modal').remove('is-active');
      localStorage.setItem('licence_key', licence_key);
    } else {
      alert("Invalid licence key")
    }
  }
  // Send request
  request.send()
}

function licenceCheck () {
  if (!licence_activated) {
   toggleLicenceModal()
  }
  return licence_activated;
}

function toggleLicenceModal() {
  const licence_modal = document.querySelector('.licence-modal');
  if(licence_modal.classList.contains('is-active'))
    licence_modal.classList.remove('is-active');
  else
    licence_modal.classList.add('is-active');
}