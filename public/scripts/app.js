// Register service-worker
if (navigator.serviceWorker) {
   navigator.serviceWorker.register('/service-worker.js', {
     scope: '/'
   });
 
   // Do some clean up
   window.addEventListener('load', () => {
     if (navigator.serviceWorker.controller) {
       navigator.serviceWorker.controller.postMessage({command: 'trimCaches'});
     }
   });
}


function toggle_visibility(query) {
  var e = document.querySelector(query);
  if(e.style.display == 'block')
     e.style.display = 'none';
  else
     e.style.display = 'block';
}