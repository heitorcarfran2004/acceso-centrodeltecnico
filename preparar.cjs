// Prepara o conteúdo do app de membros dos 120 Diagnósticos Visuales (LATAM, espanhol):
//   node apps/diagnosticos-membros-es/preparar.cjs            # tudo
//   node apps/diagnosticos-membros-es/preparar.cjs --dados    # só o datos.js (rápido)
//
// - fichas 001..120 (PNG 1086x1448 do ChatGPT) -> assets/fichas/NNN.webp no tamanho nativo
//   (é o que deixa a letra miúda legível com zoom no celular) + miniatura em assets/fichas/p/
// - capa, índice e as 12 aberturas -> assets/extras/ (+ miniatura) e a faixa de cima de cada
//   abertura (número, nome e a peça) -> assets/cats/catNN.webp, o cartão da categoria
// - PDF comprimido -> pdf/120-diagnosticos-visuales.pdf
// - capas dos 4 bonos: as mesmas imagens da página de vendas (funis/diagnosticos-hardware-es)
// - datos.js: categorias e fichas (título, descrição, síntomas e causas) para a busca
// O index.html não é gerado: é editado à mão e lê o datos.js.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const APP = __dirname;
const RAIZ = path.resolve(APP, '..', '..');
const ORIGEM = path.join(process.env.USERPROFILE || 'C:/Users/thorz', 'Downloads', 'Diagnosticos de Hardware e Software', 'Entregavel ES');
const PAGINAS = path.join(ORIGEM, 'paginas');
const PLANO = path.join(ORIGEM, 'plano-120.json');
const PDF = path.join(ORIGEM, '120 Diagnósticos Visuales para Hardware y Software (comprimido).pdf');
const FUNIL = path.join(RAIZ, 'funis', 'diagnosticos-hardware-es', 'assets');
const SO_DADOS = process.argv.includes('--dados');

function ff(args) { execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' }); }
function webp(de, para, filtro, q) { ff(['-i', de, '-vf', filtro, '-c:v', 'libwebp', '-quality', String(q), para]); }
function pasta(p) { fs.mkdirSync(p, { recursive: true }); }

/* ── títulos: o plano está em CAIXA ALTA (como na ficha); no app vira frase ── */
const SIGLAS = {
  bios: 'BIOS', post: 'POST', ssd: 'SSD', nvme: 'NVMe', ram: 'RAM', xmp: 'XMP', dll: 'DLL', sfc: 'SFC', ip: 'IP',
  usb: 'USB', dpc: 'DPC', cmos: 'CMOS', f1: 'F1', fps: 'FPS', mbps: 'Mbps', 'wi-fi': 'Wi-Fi', hd: 'HD', led: 'LED',
  pc: 'PC', raw: 'RAW', crystaldiskinfo: 'CrystalDiskInfo', windows: 'Windows', bluetooth: 'Bluetooth', bsod: 'BSOD',
};
function frase(t) {
  let s = String(t).toLowerCase();
  // mensagens entre aspas em inglês ficam como aparecem na tela do equipamento
  s = s.replace(/«([^»]+)»/g, (m, x) => /^(cmos checksum error|secure boot violation|inaccessible boot device)$/.test(x) ? '«' + x.toUpperCase() + '»' : '«' + x.charAt(0).toUpperCase() + x.slice(1) + '»');
  s = s.replace(/[a-záéíóúñü0-9-]+/g, (w) => SIGLAS[w] || w);
  s = s.replace('°c', '°C').replace('Windows update', 'Windows Update').replace('menú inicio', 'menú Inicio');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const CATS = [
  { n: 1, nome: 'Energía / Fuente', sub: 'No enciende, se apaga, ruidos y olor a quemado' },
  { n: 2, nome: 'Video / Pantalla', sub: 'Sin imagen, rayas, colores y monitores' },
  { n: 3, nome: 'Arranque / POST / BIOS', sub: 'Errores de arranque, logo congelado y BIOS' },
  { n: 4, nome: 'Temperatura', sub: 'Calor, ventiladores y apagados por temperatura' },
  { n: 5, nome: 'Memoria RAM', sub: 'Beeps, XMP, canal simple y memoria al 100 %' },
  { n: 6, nome: 'Almacenamiento (SSD / HD)', sub: 'Discos que no aparecen, ruidos y RAW' },
  { n: 7, nome: 'Placa madre / Procesador', sub: 'Capacitores, frecuencia, núcleos y overclock' },
  { n: 8, nome: 'Sistema operativo / Pantalla azul', sub: 'Pantallas azules, Windows Update y DLL' },
  { n: 9, nome: 'Lentitud / Rendimiento', sub: 'Lenta, CPU al 100 % y FPS bajos' },
  { n: 10, nome: 'Controladores (drivers)', sub: 'Dispositivos desconocidos, código 43 y video' },
  { n: 11, nome: 'Red e internet', sub: 'Sin internet, Wi-Fi, IP y red por cable' },
  { n: 12, nome: 'Audio, USB y periféricos', sub: 'Sonido, USB, micrófono, mouse e impresora' },
];

function gerarDados() {
  const plano = JSON.parse(fs.readFileSync(PLANO, 'utf8'));
  const nomeCat = {};
  const fichas = plano.fichas.map((f) => {
    const c = Math.ceil(f.n / 10);
    nomeCat[f.categoria] = c;
    return {
      n: f.n,
      c,
      s: f.selo === 'SOFTWARE' ? 'S' : 'H',
      t: frase(f.titulo),
      d: f.descripcion,
      si: f.sintomas,
      ca: f.causas.map((x) => x.titulo),
    };
  });
  if (fichas.length !== 120) throw new Error('esperava 120 fichas e achei ' + fichas.length);
  // Bono 4 (Tabla de pruebas rápidas): as 3 primeiras pruebas das fallas mais comuns,
  // copiadas do próprio plano para a tabela nunca contradizer a ficha
  const RAPIDAS = [1, 2, 11, 21, 31, 41, 51, 53, 71, 74, 81, 82, 91, 102, 111, 112].map((n) => {
    const f = plano.fichas[n - 1];
    return { n, p: f.pruebas.slice(0, 3).map((x) => [x.accion, x.si]) };
  });
  const js = '// Gerado por preparar.cjs a partir do plano-120.json. Não editar à mão.\n' +
    'window.CATS = ' + JSON.stringify(CATS) + ';\n' +
    'window.FICHAS = ' + JSON.stringify(fichas) + ';\n' +
    'window.RAPIDAS = ' + JSON.stringify(RAPIDAS) + ';\n';
  fs.writeFileSync(path.join(APP, 'datos.js'), js);
  console.log('datos.js:', fichas.length, 'fichas,', (js.length / 1024).toFixed(0), 'KB');
  return fichas;
}

const fichas = gerarDados();
if (SO_DADOS) { fichas.forEach((f) => console.log(String(f.n).padStart(3, '0'), f.s, f.t)); process.exit(0); }

pasta(path.join(APP, 'assets/fichas/p')); pasta(path.join(APP, 'assets/extras/p')); pasta(path.join(APP, 'assets/cats'));
pasta(path.join(APP, 'assets/bonos')); pasta(path.join(APP, 'assets/login')); pasta(path.join(APP, 'pdf'));

// fichas: tamanho nativo (1086 px) e miniatura de 360 px
for (let n = 1; n <= 120; n++) {
  const nnn = String(n).padStart(3, '0');
  const de = path.join(PAGINAS, nnn + '.png');
  webp(de, path.join(APP, 'assets/fichas', nnn + '.webp'), 'scale=1086:-2', 82);
  webp(de, path.join(APP, 'assets/fichas/p', nnn + '.webp'), 'scale=360:-2', 72);
  if (n % 20 === 0) console.log('fichas:', n);
}
// capa, índice e aberturas
const ALTURA_CAT = [0, 513, 549, 513, 624, 552, 537, 552, 513, 531, 555, 624, 624];
const EXTRAS = ['capa', 'indice'].concat(CATS.map((c) => 'cat' + String(c.n).padStart(2, '0')));
for (const x of EXTRAS) {
  const de = path.join(PAGINAS, 'extras', x + '.png');
  webp(de, path.join(APP, 'assets/extras', x + '.webp'), 'scale=1086:-2', 82);
  webp(de, path.join(APP, 'assets/extras/p', x + '.webp'), 'scale=360:-2', 72);
  // a faixa de cima da abertura (de y=52 até a caixa "Diagnósticos de esta categoría"):
  // número, nome da categoria e a peça. A altura muda de abertura para abertura.
  if (x.startsWith('cat')) webp(de, path.join(APP, 'assets/cats', x + '.webp'), 'crop=1086:' + ALTURA_CAT[+x.slice(3)] + ':0:52,scale=720:-2', 78);
}
// capa da coleção no Início (a capa inteira, mais leve) e a imagem de compartilhar
webp(path.join(PAGINAS, 'extras', 'capa.png'), path.join(APP, 'assets/capa-720.webp'), 'scale=720:-2', 80);
// colagem do login: 6 fichas reais, cortadas no topo (título e peça)
[1, 12, 29, 36, 71, 102].forEach((n, i) => {
  const nnn = String(n).padStart(3, '0');
  webp(path.join(PAGINAS, nnn + '.png'), path.join(APP, 'assets/login', 'f' + (i + 1) + '.webp'), 'crop=1086:1358:0:0,scale=416:-2', 74);
});
// bonos: as capas da página de vendas
for (let i = 1; i <= 4; i++) fs.copyFileSync(path.join(FUNIL, 'bonus-' + i + '.webp'), path.join(APP, 'assets/bonos', 'bono-' + i + '.webp'));
// PDF
fs.copyFileSync(PDF, path.join(APP, 'pdf', '120-diagnosticos-visuales.pdf'));
console.log('pronto: fichas, extras, categorias, login, bonos e PDF');
