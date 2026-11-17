/* NTPure Web v2.0: same-origin app shell and cross-origin favicon caching. */
'use strict';
const VERSION = 'ntpure-2.2-wallpaper-picker-fix2';
const SHELL_CACHE = VERSION + '-shell';
const ICON_CACHE = VERSION + '-icons';
const APP_FILES = ['./', './index.html', './style.css', './script.js', './settings.html', './popup.css', './popup.js', './sheet.js', './settings-ui.js', './wallpaper.js'];
const MAX_ICONS = 80;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(SHELL_CACHE).then(cache => cache.addAll(APP_FILES))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => (name.startsWith('ntpam-') || name.startsWith('ntpure-')) && name !== SHELL_CACHE && name !== ICON_CACHE)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

function isIconRequest(url, request) {
  return request.destination === 'image' &&
    url.protocol === 'https:' &&
    (url.hostname === 'www.google.com' || url.hostname === 't1.gstatic.com') &&
    (url.pathname.startsWith('/s2/favicons') || url.pathname.startsWith('/faviconV2'));
}
async function cacheIcon(request) {
  const cache = await caches.open(ICON_CACHE);
  const stored = await cache.match(request);
  if (stored) return stored;
  try {
    const response = await fetch(request);
    // Opaque responses are expected for cross-origin <img> requests.
    if (response.ok || response.type === 'opaque') {
      await cache.put(request, response.clone()).catch(() => {});
      const keys = await cache.keys();
      if (keys.length > MAX_ICONS) await cache.delete(keys[0]);
    }
    return response;
  } catch (error) {
    if (stored) return stored;
    throw error;
  }
}
async function shellResponse(request) {
  const cache = await caches.open(SHELL_CACHE);
  const stored = await cache.match(request, { ignoreSearch: true });
  if (stored) {
    // Display the cached page immediately; refresh it for the next visit.
    return stored;
  }
  const response = await fetch(request);
  if (response.ok && response.type === 'basic') await cache.put(request, response.clone()).catch(() => {});
  return response;
}
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (isIconRequest(url, request)) {
    event.respondWith(cacheIcon(request));
    return;
  }
  if (url.origin !== self.location.origin) return;
  const scope = new URL(self.registration.scope);
  if (!url.pathname.startsWith(scope.pathname)) return;
  if (request.mode === 'navigate' || APP_FILES.some(file => new URL(file, scope).pathname === url.pathname)) {
    event.respondWith(shellResponse(request));
  }
});
