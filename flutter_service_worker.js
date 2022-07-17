'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "d24d052fce9fd1301708ac98fddbcbc1",
"assets/assets/fonts/Gilroy-Regular.ttf": "af5b8da12b32c5e74532c6446eb356b4",
"assets/assets/fonts/Gilroy-RegularItalic.ttf": "9b408b831f43b9eb43d2a6dac800e5d6",
"assets/assets/images/backgrounds/blue.png": "c2c401335879ec498cd7f2d1644b6df7",
"assets/assets/images/backgrounds/main_background.png": "e84fc9a5f62b5b2ece8e42ffcb908a8d",
"assets/assets/images/backgrounds/red.png": "8858177c57f2a677492a441c41ed4022",
"assets/assets/images/categories/buy.png": "2e20d5b5081ed4d38af96062829fe455",
"assets/assets/images/categories/cut.png": "d7ed49e3ebdb3656b8e9e283bb854887",
"assets/assets/images/categories/game.png": "69575158c4b3c12c25a634db65677fec",
"assets/assets/images/categories/restaurant.png": "cb1cae22be67cc1798cc8f70f32e8765",
"assets/assets/images/categories/sales.png": "eacf4708c2da26ebf03fd1182ca953c8",
"assets/assets/images/news/news.png": "7eb3364af3acb476c74aee2259a9754a",
"assets/assets/images/online_booking/1.png": "64588eab346e3c9b6ccf88d89a4594a6",
"assets/assets/images/online_booking/2.png": "2f269428c49d61f45350334a7373770a",
"assets/assets/images/quests/1.png": "a6471b2c2c59695f3f98e04a673e214c",
"assets/assets/images/quests/2.png": "d9babce18e818cbedf6268c59d89e112",
"assets/assets/images/social_networks/apple.png": "af6b8451b3b076fd00e939e019d78507",
"assets/assets/images/social_networks/facebook.png": "021ada146ffb7c1753557ff29618d04c",
"assets/assets/images/social_networks/google.png": "ca2f7db280e9c773e341589a81c15082",
"assets/assets/images/stories/1.png": "b293551ad47a26ab0e9d528b9ea4af07",
"assets/assets/images/stories/2.png": "beed7b08b867b10505c8b149b9792d0b",
"assets/assets/images/stories/3.png": "19be6f33aa263da752c49f48a9fdc28b",
"assets/assets/images/welcome/family.png": "87e7fbfbf0b908e8b2e8f2114aa7c967",
"assets/assets/images/welcome/mega_sign.png": "cb5c5379ea3cd723637df3de82f17836",
"assets/assets/images/welcome/welcome1.png": "edf936402100131aaf0ef8617d0d7733",
"assets/assets/images/welcome/welcome2.png": "122de8ffabf0db72d607d196b6d5347a",
"assets/assets/images/welcome/welcome3.png": "6e6df834387b98a4731305a773213c08",
"assets/assets/images/welcome/welcome4.png": "6c2150afa7c39eeaa7e870db47504f3e",
"assets/assets/svgs/camera.svg": "567183e0443a065aaa2edf187822305e",
"assets/assets/svgs/main.svg": "370890299306c80adf459e305675c00a",
"assets/assets/svgs/menu.svg": "a126e27c6ead56344fefb80f90283215",
"assets/assets/svgs/parking_lot.svg": "668db45ae6772e6d61035ca074e95761",
"assets/assets/svgs/profile.svg": "b2720cdce0fedb2b201a617c1fd78a7c",
"assets/FontManifest.json": "a06f9d7d633680fd7419696d99903b48",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "1f704e250e26e5a452ffd5aee2ad9f42",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "b38beb69684beaebc70a11e3b50a1efe",
"/": "b38beb69684beaebc70a11e3b50a1efe",
"main.dart.js": "8a2d23d0a65ff19da262698ec729e6c5",
"manifest.json": "4a9cf04d84c54a64e4d46b7856452544",
"version.json": "8ecefa9f16c87599e22d668ee1c92278"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
