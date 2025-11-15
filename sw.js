const CACHE_NAME = 'moja-strona-cache-v1';
const URLS_TO_CACHE = [
  './',
  './apkabk.html',
  './css/main.css',
  './css/apkabk.css',
  
  
  
    
  // Dodaj tu inne pliki, które chcesz mieć offline
];
self.addEventListener("install", (e) => {
  console.log("Service Worker: Zainstalowany");
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Aktywny");
});

self.addEventListener("fetch", (e) => {
  // Prosty pass-through (można później dodać cache)
  e.respondWith(fetch(e.request));
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});