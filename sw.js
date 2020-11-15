var cacheName = 'CSv4';

var cachedFiles = [
    '/',
    'index.html',
    'messiah.html',
    'assets/duneCover.jpg',
    'main.css',
    'manifest.json',
    'emperor.html',
    'favicon.ico',
    'excerpt.html',
    'manifest.json',
    'children.html',
    '/img/aths.png',
    '/img/share.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png'
];

self.addEventListener('install', function (evt) { 
    console.log('Service Worker Install Event'); //Add the files to the cache
    evt.waitUntil(
        caches.open(cacheName).then(function (cache) { 
            console.log('Caching files');
            return cache.addAll(cachedFiles);
         }).then(function(){
             return self.skipWaiting();
         }).catch (function (err){
             console.log('Cache Failed', err);
         })
    );
});

self.addEventListener('activate', function (evt) { 
    console.log('Service Worker Activated');
    evt.waitUntil(
        caches.keys().then(function (keyList) { 
            return Promise.all(keyList.map(function (key) { 
                if(key !== cacheName) {
                console.log('Removing Old Cache', key);
                return caches.delete(key) 
            }
        }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(evt){
    console.log('Fetch Event ' + evt.request.url)
    evt.respondWith(
      caches.match(evt.request).then(function(response){
          return response|| fetch(evt.request);
      }) 
    );
});
