window.ChefLayout = (function () {
  var NAV_ITEMS = [
    { key: "nav.home", href: "index.html", page: "home" },
    { key: "nav.categories", href: "categories.html", page: "categories" },
    { key: "nav.certificates", href: "certificates.html", page: "certificates" },
    { key: "nav.contacts", href: "contacts.html", page: "contacts" },
  ];

  function navLinks(className) {
    return NAV_ITEMS.map(function (item) {
      return (
        '<a class="' +
        className +
        '" data-nav="' +
        item.page +
        '" href="' +
        item.href +
        '" data-i18n="' +
        item.key +
        '"></a>'
      );
    }).join("");
  }

  function headerMarkup() {
    return (
      '<div class="container header-inner">' +
      '<a class="brand" href="index.html"><span class="brand-mark">🧁</span>Chef Portfolio</a>' +
      '<nav class="nav-desktop">' +
      navLinks("nav-link") +
      "</nav>" +
      '<div class="header-actions">' +
      '<div class="lang-switch" role="group" aria-label="Language">' +
      '<button class="lang-btn" type="button" data-lang="uk">UA</button>' +
      '<button class="lang-btn" type="button" data-lang="en">EN</button>' +
      "</div>" +
      '<button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobile-nav">' +
      '<img class="icon-open" src="assets/images/icons/burger-menu.svg" alt="" width="24" height="24">' +
      '<img class="icon-close" src="assets/images/icons/close-burger.svg" alt="" width="24" height="24">' +
      "</button>" +
      "</div>" +
      "</div>" +
      '<nav class="nav-mobile" id="mobile-nav">' +
      navLinks("nav-link") +
      "</nav>"
    );
  }

  function footerMarkup() {
    var info = window.ChefData.contactInfo;
    return (
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-col">' +
      '<h3>Chef Portfolio</h3>' +
      '<p class="muted" data-i18n="footer.tagline"></p>' +
      "</div>" +
      '<div class="footer-col">' +
      '<h3 data-i18n="footer.navHeading"></h3>' +
      '<ul class="footer-links">' +
      NAV_ITEMS.map(function (item) {
        return '<li><a href="' + item.href + '" data-i18n="' + item.key + '"></a></li>';
      }).join("") +
      "</ul>" +
      "</div>" +
      '<div class="footer-col">' +
      '<h3 data-i18n="footer.contactsHeading"></h3>' +
      '<ul class="footer-links">' +
      '<li><a href="tel:' +
      info.phone.replace(/\s/g, "") +
      '">' +
      info.phone +
      "</a></li>" +
      '<li><a href="mailto:' +
      info.email +
      '">' +
      info.email +
      "</a></li>" +
      '<li class="muted" data-contact="city"></li>' +
      "</ul>" +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom">© <span data-year></span> ' +
      info.name +
      '. <span data-i18n="footer.rights"></span></div>' +
      "</div>"
    );
  }

  function markActiveLink() {
    var page = document.body.getAttribute("data-page");
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("data-nav") === page);
    });
  }

  function applyContactInfo() {
    var info = window.ChefData.contactInfo;
    document.querySelectorAll("[data-contact='city']").forEach(function (node) {
      node.textContent = info.city[window.ChefI18n.getLocale()] || info.city.uk;
    });
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = new Date().getFullYear();
    });
  }

  function bindBurger() {
    var burger = document.querySelector(".burger");
    if (!burger) return;
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-mobile .nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
        document.body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768 && document.body.classList.contains("menu-open")) {
        document.body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  function init() {
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    if (header) header.innerHTML = headerMarkup();
    if (footer) footer.innerHTML = footerMarkup();
    markActiveLink();
    setYear();
    bindBurger();
    applyContactInfo();
    document.addEventListener("chef:languagechange", applyContactInfo);
  }

  return { init: init, markActiveLink: markActiveLink };
})();
