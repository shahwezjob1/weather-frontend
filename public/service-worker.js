/* eslint-disable no-restricted-globals */
const CACHE_NAME = "weather-app-cache-v1";
const PROD_URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/manifest.json",
  "/static/media/add_location.3a13adc98209014ee677b2933e4fd4e4.svg",
  "/static/media/not_found.f7a1746b6c32d82a3f32c77fc778e768.svg",
  "/logo192.png",
  "/favicon.ico",
  "/static/css/main.cd35a900.css",
  "/static/css/main.cd35a900.css.map",
  "/static/js/453.d1bcbf08.chunk.js",
  "/static/js/453.d1bcbf08.chunk.js",
  "/static/js/main.6a073244.js",
  "/static/js/main.6a073244.js.map",
  "/api/weather",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PROD_URLS_TO_CACHE);
    })
  );
});
self.addEventListener("activate", (event) => {
  self.clients.claim(); // Claim all active clients immediately
  console.log("Service Worker activated");
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "internet not working",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
