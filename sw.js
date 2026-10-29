// Service worker do Diagnósticos Visuales: deixa o app instalável (PWA), faz as fichas abrirem
// SEM INTERNET e recebe as notificações.
//
// Cuidado aprendido no app das Carteiras: interceptar tudo com cache primeiro quebrou o 1º acesso
// pelo celular em rede ruim. Por isso aqui:
//  - página (navegação), datos.js e bonos.js: REDE PRIMEIRO; o cache só entra se a rede falhar;
//  - /assets/ (fichas, capas, fontes): CACHE PRIMEIRO, porque cada arquivo tem nome fixo e não muda.
//    Sem cópia no cache, vai para a rede normalmente (e guarda a cópia para a próxima vez);
//  - o resto (PDF, Supabase, outros domínios): não passa por aqui.
// O botão "Guardar las 120 fichas" (aba App) enche o cache "dv-fichas-v1" de uma vez.
// Ao trocar o conteúdo de um arquivo de /assets/, troque também o nome do cache abaixo.
const NUCLEO = 'dv-nucleo-v1';
const FICHAS = 'dv-fichas-v1';
const BASICO = ['/', '/datos.js', '/bonos.js', '/manifest.json', '/assets/logo-192.webp', '/assets/icon-192.png',
  '/assets/fonts/inter-latin.woff2', '/assets/fonts/poppins-700-latin.woff2', '/assets/fonts/poppins-800-latin.woff2'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  // sem travar a instalação se algum arquivo falhar
  event.waitUntil(caches.open(NUCLEO).then((c) => Promise.all(BASICO.map((u) => c.add(u).catch(() => {})))));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(nomes.filter((n) => n.startsWith('dv-') && n !== NUCLEO && n !== FICHAS).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // página: rede primeiro (sempre a versão nova); sem rede, a última cópia
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then((r) => {
      if (r.ok) { const c = r.clone(); caches.open(NUCLEO).then((x) => x.put('/', c)); }
      return r;
    }).catch(() => caches.match('/').then((r) => r || Response.error())));
    return;
  }
  if (url.pathname === '/datos.js' || url.pathname === '/bonos.js' || url.pathname === '/manifest.json') {
    event.respondWith(fetch(req).then((r) => {
      if (r.ok) { const c = r.clone(); caches.open(NUCLEO).then((x) => x.put(url.pathname, c)); }
      return r;
    }).catch(() => caches.match(url.pathname).then((r) => r || Response.error())));
    return;
  }
  // fichas, capas e fontes: cache primeiro (busca nos dois caches); senão rede, e guarda
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(caches.match(url.pathname).then((hit) => hit || fetch(req).then((r) => {
      if (r.ok && r.status === 200) { const c = r.clone(); caches.open(FICHAS).then((x) => x.put(url.pathname, c)); }
      return r;
    })));
  }
});

// Notificação vinda do servidor. payload: {title, body, url, tag, image}
self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { body: event.data ? event.data.text() : '' }; }
  const opcoes = { body: d.body || '', icon: '/assets/icon-192.png', tag: d.tag || 'diagnosticos', renotify: false, data: { url: d.url || '/#inicio' } };
  if (d.image) opcoes.image = d.image;
  event.waitUntil(self.registration.showNotification(d.title || 'Diagnósticos Visuales', opcoes));
});

// Toque na notificação: abre (ou traz pra frente) o app já na tela certa.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const alvo = new URL((event.notification.data && event.notification.data.url) || '/#inicio', self.location.origin).href;
  event.waitUntil((async () => {
    const abertas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of abertas) {
      if (new URL(c.url).origin === self.location.origin) { await c.focus(); c.postMessage({ tipo: 'abrir', url: alvo }); return; }
    }
    await self.clients.openWindow(alvo);
  })());
});
