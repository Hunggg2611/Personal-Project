const CACHE_NAME = "plnd-v1";
const APP_SHELL = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/main.js",
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (e) => {
    const url = new URL(e.request.url);

    if (url.origin === self.location.origin) {
        e.respondWith(
            caches.match(e.request).then((cached) => {
                const fetched = fetch(e.request).then((res) => {
                    if (res.ok) {
                        const clone = res.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                    }
                    return res;
                }).catch(() => cached);
                return cached || fetched;
            })
        );
        return;
    }

    if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
        e.respondWith(
            caches.match(e.request).then((cached) =>
                cached || fetch(e.request).then((res) => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                    return res;
                })
            )
        );
        return;
    }

    if (url.hostname.includes("cdn.tailwindcss.com") || url.hostname.includes("cdnjs.cloudflare.com")) {
        e.respondWith(
            fetch(e.request).then((res) => {
                const clone = res.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                return res;
            }).catch(() => caches.match(e.request))
        );
        return;
    }

    if (url.hostname.includes("cdn.jsdelivr.net") && url.pathname.includes("tesseract")) {
        e.respondWith(
            caches.match(e.request).then((cached) =>
                cached || fetch(e.request).then((res) => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                    return res;
                })
            )
        );
        return;
    }

    e.respondWith(fetch(e.request));
});
