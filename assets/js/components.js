/* ==========================================================================
   Aeternum Vital — Header y Footer reutilizables (idénticos en las 10 páginas)
   Uso: <div data-component="header" data-active="index"></div>
        <div data-component="footer"></div>
   No requiere build. Detecta la ruta base con data-base si la página no está
   en la raíz del proyecto.
   ========================================================================== */
(function () {
  "use strict";

  // Base de enlaces (todas las páginas están en la misma carpeta).
  var B = (document.currentScript && document.currentScript.getAttribute("data-base")) || "";

  // Enlaces del funil (navegación principal)
  var NAV = [
    { href: "index.html",               label: "Inicio" },
    { href: "metodo.html",              label: "El método" },
    { href: "articulo.html",            label: "Artículo" },
    { href: "historias.html",           label: "Historias" },
    { href: "preguntas-frecuentes.html",label: "Preguntas" }
  ];

  // Enlaces legales (footer)
  var LEGAL = [
    { href: "politica-de-privacidad.html",       label: "Política de privacidad" },
    { href: "terminos-y-condiciones.html",       label: "Términos y condiciones" },
    { href: "politica-de-reembolso.html",        label: "Política de reembolso" },
    { href: "aviso-legal-cookies-contacto.html", label: "Aviso legal y cookies" }
  ];

  function brand() {
    return '<a class="brand" href="' + B + 'index.html" aria-label="Aeternum Vital — inicio">' +
           '<span class="logo" aria-hidden="true">AV</span><span>Aeternum Vital</span></a>';
  }

  function header(active) {
    var links = NAV.map(function (n) {
      var cur = n.href.indexOf(active) === 0 && active ? ' aria-current="page"' : "";
      return '<li><a href="' + B + n.href + '"' + cur + '>' + n.label + "</a></li>";
    }).join("");

    return (
      '<a class="skip-link" href="#main">Saltar al contenido</a>' +
      '<header class="site-header"><div class="container"><nav class="nav" aria-label="Principal">' +
        brand() +
        '<ul class="nav-links">' + links + "</ul>" +
        '<a class="btn btn-primary nav-cta" href="' + B + 'oferta.html">Empezar</a>' +
        '<button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileMenu">' +
          "<span></span><span></span><span></span></button>" +
      "</nav></div>" +
      '<div class="mobile-menu" id="mobileMenu"><ul>' +
        NAV.map(function (n) { return '<li><a href="' + B + n.href + '">' + n.label + "</a></li>"; }).join("") +
        '<li><a class="btn btn-primary btn-block" href="' + B + 'oferta.html">Empezar ahora</a></li>' +
      "</ul></div></header>"
    );
  }

  function footer() {
    var legalLinks = LEGAL.map(function (l) {
      return '<li><a href="' + B + l.href + '">' + l.label + "</a></li>";
    }).join("");
    var navLinks = NAV.map(function (n) {
      return '<li><a href="' + B + n.href + '">' + n.label + "</a></li>";
    }).join("");

    return (
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            brand() +
            "<p>Programa educativo de hábitos saludables: alimentación consciente, " +
            "movimiento y constancia. Acompañamiento para construir un estilo de vida sostenible.</p>" +
            '<div class="footer-18"><span class="badge-18" aria-hidden="true">18+</span>' +
            "<span>Contenido para mayores de 18 años.</span></div>" +
          "</div>" +
          '<div><h4>Navegación</h4><ul>' + navLinks + "</ul></div>" +
          '<div><h4>Legal</h4><ul>' + legalLinks + "</ul></div>" +
        "</div>" +

        '<div class="footer-disclaimer">' +
          "<p>Los resultados pueden variar de persona a persona y dependen de hábitos, " +
          "alimentación y constancia.</p>" +
          "<p>Este contenido no sustituye el consejo de un profesional de la salud. " +
          "Consulta a tu médico antes de iniciar cualquier programa.</p>" +
          "<p>Promovemos un estilo de vida saludable. Contenido para mayores de 18 años.</p>" +
        "</div>" +

        '<div class="footer-bottom">' +
          "<span>&copy; <span data-year></span> AM AETERNUM LTDA. Todos los derechos reservados.</span>" +
          "<span>AM AETERNUM LTDA</span>" +
        "</div>" +
      "</div></footer>"
    );
  }

  function mount() {
    document.querySelectorAll('[data-component="header"]').forEach(function (el) {
      el.outerHTML = header(el.getAttribute("data-active") || "");
    });
    document.querySelectorAll('[data-component="footer"]').forEach(function (el) {
      el.outerHTML = footer();
    });
    // Año dinámico (sin exponer fecha exacta; solo el año en curso)
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
    // Menú móvil
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("mobileMenu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
