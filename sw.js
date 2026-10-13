// Offline support: caches the site after the first visit.
// Bump CACHE when you change files so visitors get the new version.
const CACHE='betty-v1';
const CORE=[
  '/','/index.html','/css/styles.css','/js/icons.js','/js/main.js','/manifest.webmanifest',
  '/icons/logo.svg','/icons/icon-192.png','/icons/icon-512.png',
  '/assets/images/hero.webp',
  '/assets/images/podium-1-0.webp',
  '/assets/images/podium-pitch.webp',
  '/assets/images/debugathon-certificate.webp',
  '/assets/images/debugathon-prize.webp',
  '/assets/images/drdo-intern-id.webp',
  '/assets/images/technoxian-world-cup.webp',
  '/assets/images/college-day-stage.webp',
  '/assets/images/college-day-chief-guest.webp',
  '/assets/images/aura-hackathon.webp',
  '/assets/images/nec-certificate.webp',
  '/assets/images/lab-session.webp',
  '/assets/images/trophy-pile.webp'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.hostname.includes('counterapi')) return; // visitor count is always live
  e.respondWith(fetch(req).then(res=>{
    if(res.ok && (url.origin===location.origin || url.hostname.includes('cdnjs') || url.hostname.includes('fonts.g'))){ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req,copy)); }
    return res;
  }).catch(()=>caches.match(req).then(r=>r||caches.match('/index.html'))));
});
