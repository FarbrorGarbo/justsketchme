let newWorker;

// The click event on the notification
document.getElementById('reload').addEventListener('click', function(){
  newWorker.postMessage({ action: 'skipWaiting' });
});

if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker.register('/service-worker.js').then(reg => {
    reg.addEventListener('updatefound', () => {

      // An updated service worker has appeared in reg.installing!
      newWorker = reg.installing;

      newWorker.addEventListener('statechange', () => {

        // Has service worker state changed?
        switch (newWorker.state) {
          case 'installed':

// There is a new service worker available, show the notification
            if (navigator.serviceWorker.controller) {
              let notification = document.getElementById('snackbar');
  notification .className = 'show';
            }

            break;
        }
      });
    });
  });
  // Do some clean up
  window.addEventListener('load', () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({command: 'trimCaches'});
    }
  });
}

let refreshing;
// The event listener that is fired when the service worker updates
// Here we reload the page
navigator.serviceWorker.addEventListener('controllerchange', function () {
  if (refreshing) return;
  window.location.reload();
  refreshing = true;
});

function setActive(el) {
  document.querySelector('.active').classList.remove('active');
  el.classList.add('active');
}

setTimeout (() => toggle_visibility('.contribute-popup'), 30000);

function toggle_visibility(query) {
  var e = document.querySelector(query);
  if(e.style.display == 'block')
     e.style.display = 'none';
  else
     e.style.display = 'block';
}