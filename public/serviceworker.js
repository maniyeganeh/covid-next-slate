const CACHE_NAME = 'version-95'
const urlsToCache = ['/']
const self = this

self.addEventListener('install', (e) => {
  // console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    //   console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(urlsToCache)
  })())
})

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 console.log(cache);
//                 // console.log('Opened Cache');
//                 return cache.addAll(urlsToCache)

//             })
//     )
// });

self.addEventListener('install', (e) => {
  // console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    //   console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(urlsToCache)
  })())
})

self.addEventListener('activate', (event) => {
  const cacheWhiteList = []
  cacheWhiteList.push(CACHE_NAME)
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      ))
  )
})
self.addEventListener('push', e => {
  const data = e.data.json()
  // console.log('Push Recieved');
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/img/logo.png',
    dir: 'rtl',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'Click', title: 'رفتن به وبسایت  '
      }

    ]

    //   vibrate: [100, 50, 200],
    //   badge: "/img/logo.png",
    //   tag: "confirm-notifaction",
    //   renotify: true,
  })
})
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  clients.openWindow('https://dailystats.ir')
})
