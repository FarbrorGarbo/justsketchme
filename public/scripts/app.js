// (function() {
//   'use strict';

//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//              .register('./service-worker.js')
//              .then(function() { console.log('Service Worker Registered'); });
//   }

//   window.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent Chrome 67 and earlier from automatically showing the prompt
//     e.preventDefault();
//     // Stash the event so it can be triggered later.
//     deferredPrompt = e;
//     // Update UI notify the user they can add to home screen
//     btnAdd.style.display = 'block';
//   });
// })();


function toggle_visibility(id) {
  var e = document.getElementById(id);
  if(e.style.display == 'block')
     e.style.display = 'none';
  else
     e.style.display = 'block';
}