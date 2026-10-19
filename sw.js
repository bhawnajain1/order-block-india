// App shell is cached for fast/offline open; candle data always goes to the network first.
const CACHE = 'ob-v1'
const SHELL = ['/', '/manifest.json', '/icon.svg']

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))))
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
))
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)
  if (url.pathname.startsWith('/api/')) return // never cache market data
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})
