// 나날노트 앱 — 인터넷이 잠깐 끊겨도 화면이 열리도록 기본 파일만 보관 (새 버전은 연결되면 바로 받음)
const C = "nanal-app-v5";
const FILES = ["/app/", "/icon.svg", "/icon-192.png", "/apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { const copy = res.clone(); caches.open(C).then(c => c.put(r, copy)); return res; })
    .catch(() => caches.match(r).then(m => m || caches.match("/app/"))));
});
