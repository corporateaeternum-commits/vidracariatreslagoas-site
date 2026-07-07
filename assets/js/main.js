/* ==========================================================================
   Aeternum Vital — Lógica de página
   - Banner de consentimiento de cookies (Aceptar / Rechazar) estilo GDPR/LGPD
   - El pixel de TikTok SOLO se carga tras consentimiento explícito
   - Acordeón de FAQ accesible
   ========================================================================== */
(function () {
  "use strict";

  var STORE_KEY = "av_cookie_consent"; // valores: "accepted" | "rejected"

  /* ---------- Pixel de TikTok (carga diferida tras consentimiento) ---------- */
  function loadTikTokPixel() {
    var PIXEL_ID = "{{TIKTOK_PIXEL_ID}}";
    if (!PIXEL_ID || PIXEL_ID.indexOf("{{") === 0) return; // placeholder sin rellenar -> no cargar
    /* Plantilla oficial de TikTok Pixel; se activa solo si hay ID real y consentimiento. */
    /* eslint-disable */
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
      ttq.setAndDefer = function (e, n) { e[n] = function () { e.push([n].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (e, n) {
        var r = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r; ttq._t = ttq._t || {}; ttq._t[e] = +new Date();
        ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        var o = d.createElement("script"); o.type = "text/javascript"; o.async = !0; o.src = r + "?sdkid=" + e + "&lib=" + t;
        var a = d.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a);
      };
      ttq.load(PIXEL_ID); ttq.page();
    }(window, document, "ttq");
    /* eslint-enable */
  }

  function applyConsent(value) {
    if (value === "accepted") loadTikTokPixel();
    // Si "rejected": no se cargan cookies de marketing/analítica.
  }

  /* ---------- Banner ---------- */
  function initCookieBanner() {
    var existing;
    try { existing = localStorage.getItem(STORE_KEY); } catch (e) { existing = null; }

    if (existing) { applyConsent(existing); return; }

    var banner = document.createElement("div");
    banner.className = "cookie-banner show";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.innerHTML =
      "<p>Usamos cookies propias y de terceros para mejorar tu experiencia y medir " +
      "nuestras campañas. Puedes aceptar o rechazar las cookies no esenciales. " +
      'Más información en nuestra <a href="aviso-legal-cookies-contacto.html">política de cookies</a>.</p>' +
      '<div class="actions">' +
        '<button class="btn btn-outline" data-cookie="rejected">Rechazar</button>' +
        '<button class="btn btn-primary" data-cookie="accepted">Aceptar</button>' +
      "</div>";

    document.body.appendChild(banner);

    banner.addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-cookie]");
      if (!btn) return;
      var val = btn.getAttribute("data-cookie");
      try { localStorage.setItem(STORE_KEY, val); } catch (e) {}
      banner.classList.remove("show");
      banner.remove();
      applyConsent(val);
    });
  }

  /* ---------- Acordeón FAQ ---------- */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var open = item.classList.toggle("open");
        q.setAttribute("aria-expanded", open ? "true" : "false");
        a.style.maxHeight = open ? a.scrollHeight + "px" : null;
      });
    });
  }

  function init() { initCookieBanner(); initFaq(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
