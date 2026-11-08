const V='bomyeondae-128684',FONTS='bmd-fonts';
const CORE=['./','index.html','manifest.webmanifest','lib/pdf.min.js','lib/pdf.worker.min.js','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==FONTS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(caches.open(FONTS).then(async c=>{const hit=await c.match(r);const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}).catch(()=>hit||Response.error());return hit||net}));return}
 if(u.origin!==self.location.origin)return;
 if(r.mode==='navigate'){e.respondWith(caches.open(V).then(async c=>{const hit=await c.match('index.html');const net=fetch(r).then(res=>{if(res.ok)c.put('index.html',res.clone());return res}).catch(()=>hit);return hit||net}));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})));
});
