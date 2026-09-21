window.ChefI18n = (function () {
  var STORAGE_KEY = "chef-portfolio-locale";
  var SUPPORTED = ["uk", "en"];
  var current = "uk";

  function resolve(source, key) {
    return key.split(".").reduce(function (acc, part) {
      return acc && acc[part] != null ? acc[part] : undefined;
    }, source);
  }

  function interpolate(text, params) {
    if (!params) return text;
    return text.replace(/\{(\w+)\}/g, function (match, name) {
      return params[name] != null ? params[name] : match;
    });
  }

  function t(key, params) {
    var dict = window.ChefTranslations[current] || window.ChefTranslations.uk;
    var value = resolve(dict, key);
    if (value == null) {
      value = resolve(window.ChefTranslations.uk, key);
    }
    if (value == null) return key;
    return interpolate(value, params);
  }

  function get(key) {
    var dict = window.ChefTranslations[current] || window.ChefTranslations.uk;
    var value = resolve(dict, key);
    return value == null ? resolve(window.ChefTranslations.uk, key) : value;
  }

  function getLocale() {
    return current;
  }

  function setLocale(locale) {
    if (SUPPORTED.indexOf(locale) === -1) return;
    current = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (error) {
      void error;
    }
    document.documentElement.lang = locale;
    applyTranslations();
    updateSwitchers();
    document.dispatchEvent(new CustomEvent("chef:languagechange", { detail: { locale: locale } }));
  }

  function applyTranslations(root) {
    var scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    scope.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
      node.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }

  function updateSwitchers() {
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-lang") === current);
    });
  }

  function refresh() {
    applyTranslations();
    updateSwitchers();
  }

  function init() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      void error;
    }
    var preferred = stored && SUPPORTED.indexOf(stored) !== -1 ? stored : null;
    var browser = (navigator.language || "uk").toLowerCase();
    current = preferred || (browser.indexOf("en") === 0 ? "en" : "uk");
    document.documentElement.lang = current;

    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-lang]");
      if (!button) return;
      setLocale(button.getAttribute("data-lang"));
    });

    applyTranslations();
    updateSwitchers();
  }

  return {
    init: init,
    t: t,
    get: get,
    getLocale: getLocale,
    setLocale: setLocale,
    applyTranslations: applyTranslations,
    refresh: refresh,
  };
})();
