#!/usr/bin/env node
/**
 * Gera o index.html a partir de products.json.
 *
 * Roda automaticamente pela GitHub Action (.github/workflows/build-site.yml)
 * toda vez que products.json ou a pasta images/ mudam — inclusive quando o
 * painel em /admin salva uma edição. Também pode ser rodado manualmente:
 *
 *   node scripts/build-site.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WHATSAPP_NUMBER = '556296514773';
const INSTAGRAM_URL = 'https://www.instagram.com/renata.anoana/';

const CATEGORY_LABELS = {
  aneis: 'Anéis',
  colares: 'Colares',
  brincos: 'Brincos',
  pulseiras: 'Pulseiras',
  conjuntos: 'Conjuntos',
  'sem-categoria': 'Sem categoria'
};
const CATEGORY_ORDER = ['aneis', 'colares', 'brincos', 'pulseiras', 'conjuntos'];

function categoryLabel(slug) {
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function formatBRL(n) {
  const v = Number(n || 0);
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function waLink(title, price) {
  const msg = `Olá! Tenho interesse em ${title} (${formatBRL(price)}). Pode me passar mais detalhes?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// só mostra, nos filtros, categorias que têm pelo menos um produto —
// igual ao comportamento do painel de teste (admin.html).
function currentCategories(items) {
  const order = CATEGORY_ORDER.slice();
  const extra = [];
  items.forEach((p) => {
    if (order.indexOf(p.category) === -1 && extra.indexOf(p.category) === -1) {
      extra.push(p.category);
    }
  });
  return order.concat(extra).filter((c) => items.some((p) => p.category === c));
}

function buildCardHtml(p) {
  const descHtml = p.description
    ? `\n        <p class="desc">${escapeHtml(p.description)}</p>`
    : '';
  return `    <article class="card" data-category="${p.category}">
      <div class="media">
        <img src="${p.image}" alt="" loading="lazy" />
      </div>
      <div class="body">
        <span class="tag">${escapeHtml(categoryLabel(p.category))}</span>
        <h3>${escapeHtml(p.title)}</h3>${descHtml}
        <span class="price">${formatBRL(p.price)}</span>
        <a class="buy" href="${waLink(p.title, p.price)}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.4-4.1A7.7 7.7 0 1 1 9 18.6L4 20z"/></svg>
          Comprar no WhatsApp
        </a>
      </div>
    </article>`;
}

function buildFiltersHtml(cats) {
  let html = '<button class="pill" data-filter="todos" aria-pressed="true">Todos</button>\n';
  cats.forEach((c) => {
    html += `    <button class="pill" data-filter="${c}" aria-pressed="false">${escapeHtml(categoryLabel(c))}</button>\n`;
  });
  return html;
}

function main() {
  const dataPath = path.join(ROOT, 'products.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const items = data.items || [];

  const cats = currentCategories(items);
  const filtersHtml = buildFiltersHtml(cats);
  const cardsHtml = items.map(buildCardHtml).join('\n\n');
  const floatMsg = encodeURIComponent('Olá! Vim do site e queria saber mais sobre as peças.');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
(function(){
  try{
    var t = localStorage.getItem('ra-theme');
    if(!t){ t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
    document.documentElement.setAttribute('data-theme', t);
  }catch(e){}
})();
<\/script>
<title>Renata Anoana</title>
<link rel="icon" type="image/png" href="images/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="style.css">
</head>
<body>

<header class="site">
  <div class="header-inner">
    <div class="brand-group">
      <div class="logo-badge" aria-hidden="true">
        <img src="images/logo.png" alt="" />
      </div>
      <div class="brand">Renata Anoana<small>Pratas com pedras naturais</small></div>
    </div>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Alternar tema claro ou escuro">
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.55 1.55M18.25 18.25l1.55 1.55M2 12h2.2M19.8 12H22M4.2 19.8l1.55-1.55M18.25 5.75l1.55-1.55"/></svg>
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>
    </button>
  </div>
</header>

<main class="wrap">
  <section class="hero">
    <h1>Prata com pedras naturais, <em>lapidada à mão.</em></h1>
    <p>Anéis, colares, brincos e pulseiras com pedras naturais, garimpados um a um. Escolha a peça e finalize o pedido direto pelo WhatsApp — enviamos para todo o Brasil.</p>
  </section>

  <nav class="filters" aria-label="Filtrar por categoria">
    ${filtersHtml}  </nav>

  <section class="grid" id="grid">
${cardsHtml}
  </section>
</main>

<footer>
  <div class="footer-inner">
    <div>
      <div class="brand">Renata Anoana</div>
      <p>Pratas com pedras naturais. Pedidos, dúvidas e encomendas sob medida, direto pelo WhatsApp — enviamos para todo o Brasil.</p>
    </div>
    <div class="footer-social">
      <a class="social-link" href="${INSTAGRAM_URL}" target="_blank" rel="noopener" aria-label="Instagram da Renata Anoana">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/>
        </svg>
      </a>
    </div>
  </div>
</footer>

<a class="float-cta" href="https://wa.me/${WHATSAPP_NUMBER}?text=${floatMsg}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
  <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.4-4.1A7.7 7.7 0 1 1 9 18.6L4 20z"/></svg>
</a>

<script>
(function(){
  var pills = document.querySelectorAll('.pill');
  var cards = document.querySelectorAll('.card');
  pills.forEach(function(pill){
    pill.addEventListener('click', function(){
      pills.forEach(function(p){ p.setAttribute('aria-pressed','false'); });
      pill.setAttribute('aria-pressed','true');
      var filter = pill.getAttribute('data-filter');
      cards.forEach(function(card){
        var match = filter === 'todos' || card.getAttribute('data-category') === filter;
        card.hidden = !match;
      });
    });
  });
})();
<\/script>

<script>
(function(){
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var sun = toggle.querySelector('.icon-sun');
  var moon = toggle.querySelector('.icon-moon');
  function setHidden(el, isHidden){ if(isHidden){ el.setAttribute('hidden',''); } else { el.removeAttribute('hidden'); } }
  function applyIcon(theme){ setHidden(sun, theme !== 'light'); setHidden(moon, theme !== 'dark'); }
  applyIcon(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  toggle.addEventListener('click', function(){
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    applyIcon(next);
    try{ localStorage.setItem('ra-theme', next); }catch(e){}
  });
})();
<\/script>
</body>
</html>
`;

  fs.writeFileSync(path.join(ROOT, 'index.html'), html);
  console.log(`index.html gerado com ${items.length} produto(s) em ${cats.length} categoria(s).`);
}

main();
