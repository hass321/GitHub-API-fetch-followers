let cacheName = 'Cache_Data-05';
let filtesInCache = [
    'app.js',
    'index.html',
    'style.css',
    './'
];

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install...');
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            console.log('[Service Worker] Add Files in cache');
            return cache.addAll(filtesInCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate..');
    event.waitUntil(
        caches.keys()
        .then((keysList) => {
            return Promise.all(keysList.map((key) => {
                if(key !== cacheName && key !== 'dynamic-05'){
                    return caches.delete(key);
                }
            }))
        })
    );
    return self.clients.claim();
});


self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetching from cache');
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            console.log('[Service Worker] Load File from Cache Only');
            if(response) {
                return response;
            }
            else{
                return fetch(event.request)
                .then((response2) => {
                    return caches.open('dynamic-05')
                    .then((cache) => {
                        cache.put(event.request, response2.clone());
                        return response2;
                    });
                });
            }
        })
    );
});