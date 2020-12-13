// baru
const cacheName = "v1";

const cacheAssets = [
  "/jadwal-sholat-sampit/index.html",
  "/jadwal-sholat-sampit/css/bootstrap.min.css",
  "/jadwal-sholat-sampit/css/style.css",
  "/jadwal-sholat-sampit/icons/logo48.png",
  "/jadwal-sholat-sampit/icons/logo64.png",
  "/jadwal-sholat-sampit/icons/logo512.png",
];

// Call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
// self.addEventListener("fetch", (e) => {
//   console.log("Service Worker: Fetching");
//   e.respondWith(
//     fetch(e.request).catch(() => (e.request, { cacheName: cacheName }))
//   );
// });
//  kode dari stackoverflow ':D'
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((response) => {
            const responseClone = response.clone();
            cache.put(event.request, responseClone);
          })
        );
      });
    })
  );
});
