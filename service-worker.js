const CACHE_NAME = 'calculator-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Add event listener for background sync
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Sync event fired', event.tag);
    // This is where you would handle the background sync logic.
    // For example, if you have a 'sync-bill' tag, you would
    // retrieve the cached bill data and try to send it to a server.
    if (event.tag === 'sync-bill') {
        event.waitUntil(syncBillData());
    }
});

// Add event listener for periodic background sync
self.addEventListener('periodicsync', (event) => {
    console.log('[Service Worker] Periodic Sync event fired', event.tag);
    // This is where you would handle the periodic sync logic,
    // such as fetching new data or updating the cache.
    if (event.tag === 'content-update') {
        event.waitUntil(getUpToDateContent());
    }
});

// Add push notification event listener
self.addEventListener('push', (event) => {
    const data = event.data.json();
    const title = data.title || 'PWA Calculator';
    const options = {
        body: data.body || 'A new update is available!',
        icon: '/images/icon-512x512.png',
        badge: '/images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Add notification click event listener
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                if (clientList.length > 0) {
                    let client = clientList[0];
                    for (let i = 0; i < clientList.length; i++) {
                        if (clientList[i].focused) {
                            client = clientList[i];
                        }
                    }
                    return client.focus();
                }
                return clients.openWindow('/');
            })
    );
});


// Example function to handle the sync.
// In a real application, this would fetch data from IndexedDB
// and send it to your API.
function syncBillData() {
    // Here, you would implement the logic to:
    // 1. Get data from a local, persistent storage (like IndexedDB).
    // 2. Send the data to your server using a fetch() request.
    // 3. Delete the data from local storage upon a successful sync.
    console.log('[Service Worker] Attempting to sync bill data.');
    return new Promise((resolve) => {
        // Placeholder logic:
        setTimeout(() => {
            console.log('[Service Worker] Bill data synced successfully!');
            resolve();
        }, 2000);
    });
}

// Example function to handle the periodic sync
// In a real application, this would fetch updated resources from the network
// and update the cache.
function getUpToDateContent() {
    console.log('[Service Worker] Attempting to get up-to-date content.');
    // Placeholder logic for fetching new data
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('[Service Worker] Up-to-date content retrieved and cached!');
            resolve();
        }, 2000);
    });
}
