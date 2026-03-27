const CACHE_NAME = 'pharmai-v2'; // Changed v1 to v2 to force an update
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Step 1: Install the Service Worker and save the files to the phone
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Files cached successfully!');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Step 2: Intercept internet requests and serve the saved files if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached file if found, otherwise try to fetch from the internet
      return response || fetch(event.request);
    })
  );
});
