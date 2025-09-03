// Define the cache name and the files to cache
const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'
];

// The 'install' event is fired when the service worker is installed
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened, caching files.');
        return cache.addAll(urlsToCache);
      })
  );
});

// The 'fetch' event is fired for every network request.
// This is where we handle offline caching.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If a response is found in the cache, return it
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }
        // Otherwise, fetch from the network
        console.log('Fetching from network:', event.request.url);
        return fetch(event.request);
      })
  );
});

// The 'activate' event is fired when the service worker is activated
// This is a good place to clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
