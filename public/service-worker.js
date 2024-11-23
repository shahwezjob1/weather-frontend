const CACHE_NAME = "weather-app-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/static/js/bundle.js",
  "/manifest.json",
  "/static/media/add_location.3a13adc98209014ee677b2933e4fd4e4.svg",
  "/logo192.png",
  "/favicon.ico",
  "/index.html",
  "/api/weather",
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
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
