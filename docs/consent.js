/* PC su Misura - gestione consenso cookie (Google Consent Mode v2)
   Per attivare il tracciamento inserisci i tuoi ID qui sotto.
   GA_ID  = ID misurazione Google Analytics 4 (inizia con G-)
   ADS_ID = ID tag Google Ads (inizia con AW-)
   Finche' sono vuoti non viene caricato nessuno script di terze parti. */
(function () {
  var GA_ID = '';
  var ADS_ID = '';

  var KEY = 'pcsm_consent';
  var MAX_AGE = 1000 * 60 * 60 * 24 * 180; // 6 mesi
  var me = document.currentScript;
  var ACCENT = (me && me.getAttribute('data-accent')) || '#2b7fff';
  var INK = (me && me.getAttribute('data-ink')) || '#ffffff';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Tutto negato finche' l'utente non sceglie
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  var tagLoaded = false;

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (!c || typeof c.t !== 'number' || Date.now() - c.t > MAX_AGE) return null;
      return c;
    } catch (e) { return null; }
  }
  function write(a, m) {
    var c = { a: !!a, m: !!m, t: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    return c;
  }

  function clearGoogleCookies() {
    var host = location.hostname;
    var parts = host.split('.');
    var domains = ['', host, '.' + host];
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function (raw) {
      var name = raw.split('=')[0].trim();
      if (/^(_ga|_gid|_gat|_gcl|_gac)/.test(name)) {
        domains.forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  function loadTag() {
    var id = GA_ID || ADS_ID;
    if (tagLoaded || !id) return;
    tagLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    gtag('js', new Date());
    if (GA_ID) gtag('config', GA_ID);
    if (ADS_ID) gtag('config', ADS_ID);
  }

  function apply(c) {
    gtag('consent', 'update', {
      analytics_storage: c.a ? 'granted' : 'denied',
      ad_storage: c.m ? 'granted' : 'denied',
      ad_user_data: c.m ? 'granted' : 'denied',
      ad_personalization: c.m ? 'granted' : 'denied'
    });
    if (c.a || c.m) loadTag(); else clearGoogleCookies();
  }

  // Eventi utili per le conversioni (solo se c'e' consenso e il tag e' caricato)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !tagLoaded) return;
    var h = a.getAttribute('href') || '';
    var name = h.indexOf('tel:') === 0 ? 'click_telefono'
      : h.indexOf('mailto:') === 0 ? 'click_email'
      : h.indexOf('wa.me') !== -1 ? 'click_whatsapp' : '';
    if (name) gtag('event', name, { link_url: h });
  }, true);

  // ---------- Interfaccia ----------
  var css = '' +
    '#pcsm-cc{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);width:calc(100% - 32px);max-width:780px;z-index:2147483000;' +
    'background:#0e1420;color:#e8eefc;border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:18px 20px;' +
    'font:14px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;box-shadow:0 18px 50px rgba(0,0,0,.55)}' +
    '#pcsm-cc h2{margin:0 0 6px;font-size:16px;font-weight:700;color:#fff}' +
    '#pcsm-cc p{margin:0 0 12px;color:#c5cde0}' +
    '#pcsm-cc a{color:' + ACCENT + ';text-decoration:underline}' +
    '#pcsm-cc .pcsm-row{display:flex;gap:10px;flex-wrap:wrap}' +
    '#pcsm-cc button{font:inherit;font-weight:700;cursor:pointer;border-radius:10px;padding:11px 18px;min-width:140px;flex:1 1 140px;border:2px solid ' + ACCENT + '}' +
    '#pcsm-cc .pcsm-main{background:' + ACCENT + ';color:' + INK + '}' +
    '#pcsm-cc .pcsm-alt{background:transparent;color:#fff;border-color:rgba(255,255,255,.35)}' +
    '#pcsm-cc button:focus-visible,#pcsm-cc input:focus-visible{outline:3px solid #fff;outline-offset:2px}' +
    '#pcsm-cc .pcsm-opt{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-top:1px solid rgba(255,255,255,.1)}' +
    '#pcsm-cc .pcsm-opt input{margin-top:3px;width:18px;height:18px;accent-color:' + ACCENT + '}' +
    '#pcsm-cc .pcsm-opt b{display:block;color:#fff}' +
    '#pcsm-cc .pcsm-opt span{color:#aab4cc;font-size:13px}' +
    '#pcsm-fab{position:fixed;left:12px;bottom:12px;z-index:2147482000;background:#0e1420;color:#c5cde0;border:1px solid rgba(255,255,255,.2);' +
    'border-radius:999px;padding:7px 13px;font:12px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;cursor:pointer}' +
    '#pcsm-fab:hover{color:#fff}';

  var box = null;

  function close() {
    if (box) { box.remove(); box = null; }
  }

  function choose(a, m) {
    var c = write(a, m);
    apply(c);
    close();
  }

  function el(html) {
    var d = document.createElement('div');
    d.id = 'pcsm-cc';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Preferenze cookie');
    d.innerHTML = html;
    return d;
  }

  function show(detail) {
    close();
    var cur = read() || { a: false, m: false };
    var html;
    if (!detail) {
      html = '<h2>Cookie e privacy</h2>' +
        '<p>Usiamo cookie di terze parti (Google) solo se acconsenti: servono a capire come viene usato il sito e a misurare le nostre pubblicità. ' +
        'Senza il tuo consenso il sito funziona comunque. Puoi cambiare idea in ogni momento. <a href="/privacy/">Informativa privacy e cookie</a>.</p>' +
        '<div class="pcsm-row">' +
        '<button type="button" class="pcsm-main" data-act="no">Rifiuta tutti</button>' +
        '<button type="button" class="pcsm-alt" data-act="custom">Personalizza</button>' +
        '<button type="button" class="pcsm-main" data-act="yes">Accetta tutti</button></div>';
    } else {
      html = '<h2>Scegli i cookie</h2>' +
        '<div class="pcsm-opt"><input type="checkbox" checked disabled id="pcsm-n"><label for="pcsm-n"><b>Necessari</b><span>Servono al funzionamento del sito. Non raccolgono dati personali e non si possono disattivare.</span></label></div>' +
        '<div class="pcsm-opt"><input type="checkbox" id="pcsm-a"' + (cur.a ? ' checked' : '') + '><label for="pcsm-a"><b>Statistiche</b><span>Google Analytics: ci dice quante persone visitano il sito e quali pagine guardano.</span></label></div>' +
        '<div class="pcsm-opt"><input type="checkbox" id="pcsm-m"' + (cur.m ? ' checked' : '') + '><label for="pcsm-m"><b>Marketing</b><span>Google Ads: misura se le nostre pubblicità portano contatti.</span></label></div>' +
        '<div class="pcsm-row" style="margin-top:12px">' +
        '<button type="button" class="pcsm-alt" data-act="back">Indietro</button>' +
        '<button type="button" class="pcsm-main" data-act="save">Salva le scelte</button></div>';
    }
    box = el(html);
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'yes') choose(true, true);
      else if (act === 'no') choose(false, false);
      else if (act === 'custom') show(true);
      else if (act === 'back') show(false);
      else if (act === 'save') choose(box.querySelector('#pcsm-a').checked, box.querySelector('#pcsm-m').checked);
    });
    document.body.appendChild(box);
    var first = box.querySelector('button');
    if (first) first.focus({ preventScroll: true });
  }

  window.pcsmCookieSettings = function () { show(true); };

  function init() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (t) { e.preventDefault(); show(true); }
    });

    // Se la pagina non ha un link "Gestisci cookie", mostra un piccolo pulsante fisso
    if (!document.querySelector('[data-cookie-settings]')) {
      var fab = document.createElement('button');
      fab.id = 'pcsm-fab';
      fab.type = 'button';
      fab.textContent = 'Cookie';
      fab.setAttribute('aria-label', 'Gestisci le preferenze sui cookie');
      fab.addEventListener('click', function () { show(true); });
      document.body.appendChild(fab);
    }

    var c = read();
    if (c) apply(c); else show(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
