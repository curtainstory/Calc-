const CACHE_NAME = 'calculator-pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
