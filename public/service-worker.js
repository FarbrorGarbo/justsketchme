const version = '30';
var dataCacheName = `v${version}`;
var cacheName = `v${version}`;

var filesToCache = [
  '/',
 "./images",
 "./images/icons",
 "./images/icons/icon-128x128.png",
 "./images/icons/icon-144x144.png",
 "./images/icons/icon-152x152.png",
 "./images/icons/icon-192x192.png",
 "./images/icons/icon-256x256.png",
 "./index.html",
 "./manifest.json",
 "./scripts",
 "./scripts/app.js",
 "./styles",
 "./styles/style.css",
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if(response) {
        console.log('[Service Worker] Fetch', e.request.url);
        return response
      } else {
        console.log("Need to fetch and cache!");
        return fetch(e.request).then(response => {
          stashInCache(e.request, response.clone());
          return response;
        })
      }
    })
  );
});

const stashInCache = (request, response) => {
  if (response.status === 200) {
    console.log("[Service Worker] Stashing", request.url);
    caches.open(cacheName)
      .then(cache => cache.put(request, response));
  }
};

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});