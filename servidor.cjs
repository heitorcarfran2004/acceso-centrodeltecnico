// Servidor local para conferir o app de membros antes de subir.
//   node servidor.cjs   ->  http://localhost:4250
const http = require('http'), fs = require('fs'), path = require('path');
const PORTA = 4250;
const TIPOS = { '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.css': 'text/css',
  '.json': 'application/json', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  else if (!path.extname(p) && fs.existsSync(path.join(__dirname, p + '.html'))) p += '.html';
  const arq = path.join(__dirname, p);
  if (!arq.startsWith(__dirname) || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) { res.writeHead(404); return res.end('nao encontrado: ' + p); }
  res.writeHead(200, { 'Cache-Control': 'no-store', 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream' });
  fs.createReadStream(arq).pipe(res);
}).listen(PORTA, () => console.log('http://localhost:' + PORTA));
