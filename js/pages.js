window.ChefPages = (function () {
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function localized(field) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    var locale = window.ChefI18n.getLocale();
    return field[locale] || field.uk || field.en || "";
  }

  function mediaMarkup(item, alt) {
    if (item.image) {
      return '<img src="' + esc(item.image) + '" alt="' + esc(alt) + '" loading="lazy">';
    }
    return esc(item.emoji || "🍰");
  }

  function dishCard(dish) {
    return (
      '<article class="card">' +
      '<div class="card-media">' +
      mediaMarkup(dish, localized(dish.name)) +
      "</div>" +
      '<div class="card-body">' +
      '<h3 class="card-title">' +
      esc(localized(dish.name)) +
      "</h3>" +
      '<p class="card-text">' +
      esc(localized(dish.description)) +
      "</p>" +
      '<div class="card-footer">' +
      '<span class="badge">' +
      esc(dish.weight) +
      "</span>" +
      "</div></div></article>"
    );
  }

  function renderHome() {
    var featuresRoot = document.getElementById("home-features");
    var quickRoot = document.getElementById("home-quick-links");
    var statsRoot = document.getElementById("home-stats");
    var philosophyRoot = document.getElementById("home-philosophy");

    function draw() {
      if (featuresRoot) {
        featuresRoot.innerHTML = (window.ChefI18n.get("home.features") || [])
          .map(function (feature) {
            return "<li>" + esc(feature) + "</li>";
          })
          .join("");
      }
      if (statsRoot) {
        statsRoot.innerHTML = (window.ChefI18n.get("home.stats") || [])
          .map(function (stat) {
            return (
              '<div class="stat"><span class="stat-value">' +
              esc(stat.value) +
              '</span><span class="stat-label">' +
              esc(stat.label) +
              "</span></div>"
            );
          })
          .join("");
      }
      if (philosophyRoot) {
        philosophyRoot.innerHTML = (window.ChefI18n.get("home.philosophy") || [])
          .map(function (item) {
            return (
              '<article class="value-card"><span class="value-icon">' +
              esc(item.icon) +
              "</span><h3>" +
              esc(item.title) +
              "</h3><p>" +
              esc(item.text) +
              "</p></article>"
            );
          })
          .join("");
      }
      if (quickRoot) {
        var links = [
          { href: "categories.html", icon: "🎂", title: "home.quickCategoriesTitle", text: "home.quickCategoriesText" },
          { href: "certificates.html", icon: "🏅", title: "home.quickCertificatesTitle", text: "home.quickCertificatesText" },
          { href: "contacts.html", icon: "✉️", title: "home.quickContactsTitle", text: "home.quickContactsText" },
        ];
        quickRoot.innerHTML = links
          .map(function (link) {
            return (
              '<a class="quick-link" href="' +
              link.href +
              '"><span class="quick-link-icon">' +
              link.icon +
              "</span><h3>" +
              esc(window.ChefI18n.t(link.title)) +
              "</h3><p>" +
              esc(window.ChefI18n.t(link.text)) +
              "</p></a>"
            );
          })
          .join("");
      }
    }

    draw();
    document.addEventListener("chef:languagechange", draw);
  }

  function renderCategories() {
    var root = document.getElementById("categories-grid");
    if (!root) return;

    function draw() {
      root.innerHTML = window.ChefData.categories
        .map(function (category) {
          var count = window.ChefData.getDishesByCategory(category.id).length;
          return (
            '<a class="card card-link" href="category.html?id=' +
            encodeURIComponent(category.id) +
            '">' +
            '<div class="card-media">' +
            esc(category.emoji) +
            "</div>" +
            '<div class="card-body">' +
            '<h3 class="card-title">' +
            esc(localized(category.name)) +
            "</h3>" +
            '<p class="card-text">' +
            esc(localized(category.description)) +
            "</p>" +
            '<div class="card-footer"><span class="badge">' +
            esc(window.ChefI18n.t("categories.dishesCount", { count: count })) +
            '</span><span class="btn btn-outline">' +
            esc(window.ChefI18n.t("common.view")) +
            "</span></div></div></a>"
          );
        })
        .join("");
    }

    draw();
    document.addEventListener("chef:languagechange", draw);
  }

  function renderCategory() {
    var root = document.getElementById("category-root");
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");

    function draw() {
      var category = window.ChefData.getCategoryById(id);
      if (!category) {
        root.innerHTML =
          '<div class="not-found"><h1>' +
          esc(window.ChefI18n.t("category.notFoundTitle")) +
          '</h1><p class="muted">' +
          esc(window.ChefI18n.t("category.notFoundText")) +
          '</p><a class="btn btn-primary" href="categories.html">' +
          esc(window.ChefI18n.t("common.backToCategories")) +
          "</a></div>";
        return;
      }

      var dishes = window.ChefData.getDishesByCategory(category.id);
      var dishesHtml = dishes.length
        ? '<div class="grid">' + dishes.map(dishCard).join("") + "</div>"
        : '<p class="muted">' + esc(window.ChefI18n.t("category.empty")) + "</p>";

      root.innerHTML =
        '<a class="muted" href="categories.html">' +
        esc(window.ChefI18n.t("category.back")) +
        "</a>" +
        '<div class="category-hero"><span class="category-hero-emoji">' +
        esc(category.emoji) +
        "</span><div><h1>" +
        esc(localized(category.name)) +
        "</h1><p>" +
        esc(localized(category.description)) +
        "</p></div></div>" +
        dishesHtml;
    }

    draw();
    document.addEventListener("chef:languagechange", draw);
  }

  function ensureModal() {
    var modal = document.getElementById("cert-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "cert-modal";
    modal.className = "modal";
    modal.innerHTML =
      '<div class="modal-backdrop" data-modal-close></div>' +
      '<div class="modal-panel" role="dialog" aria-modal="true">' +
      '<button class="modal-close" type="button" data-modal-close aria-label="Close">×</button>' +
      '<div id="cert-modal-content"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener("click", function (event) {
      if (event.target.closest("[data-modal-close]")) closeModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });
    return modal;
  }

  function openModal(certificate) {
    var modal = ensureModal();
    var media = certificate.image
      ? '<img src="' + esc(certificate.image) + '" alt="' + esc(localized(certificate.title)) + '">'
      : esc(certificate.emoji);
    document.getElementById("cert-modal-content").innerHTML =
      '<div class="modal-media">' +
      media +
      "</div><h2>" +
      esc(localized(certificate.title)) +
      '</h2><p class="muted">' +
      esc(localized(certificate.organization)) +
      " · " +
      esc(certificate.year) +
      "</p><p>" +
      esc(localized(certificate.description)) +
      "</p>";
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    var modal = document.getElementById("cert-modal");
    if (modal && modal.classList.contains("open")) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function renderCertificates() {
    var root = document.getElementById("certificates-grid");
    if (!root) return;

    function draw() {
      root.innerHTML = window.ChefData.certificates
        .map(function (certificate) {
          return (
            '<button type="button" class="card certificate-card" data-cert="' +
            esc(certificate.id) +
            '"><div class="card-media">' +
            mediaMarkup(certificate, localized(certificate.title)) +
            '</div><div class="card-body"><span class="certificate-year">' +
            esc(certificate.year) +
            '</span><h3 class="card-title">' +
            esc(localized(certificate.title)) +
            '</h3><p class="card-text">' +
            esc(localized(certificate.organization)) +
            '</p><div class="card-footer"><span class="btn btn-outline">' +
            esc(window.ChefI18n.t("certificates.view")) +
            "</span></div></div></button>"
          );
        })
        .join("");
    }

    draw();
    document.addEventListener("chef:languagechange", draw);
    root.addEventListener("click", function (event) {
      var button = event.target.closest("[data-cert]");
      if (!button) return;
      var certificate = window.ChefData.certificates.find(function (item) {
        return item.id === button.getAttribute("data-cert");
      });
      if (certificate) openModal(certificate);
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function bindContactForm(info) {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("contact-status");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();

      var errors = {};
      if (!name) errors.name = window.ChefI18n.t("contacts.errorName");
      if (!validateEmail(email)) errors.email = window.ChefI18n.t("contacts.errorEmail");
      if (!message) errors.message = window.ChefI18n.t("contacts.errorMessage");

      ["name", "email", "message"].forEach(function (field) {
        var wrap = form.querySelector('[data-field="' + field + '"]');
        var errorNode = form.querySelector('[data-error="' + field + '"]');
        var hasError = Boolean(errors[field]);
        wrap.classList.toggle("error", hasError);
        errorNode.textContent = errors[field] || "";
      });

      if (Object.keys(errors).length) {
        status.textContent = "";
        status.className = "form-status";
        return;
      }

      var subject = "Website message from " + name;
      var body = message + "\n\n" + name + " (" + email + ")";
      window.location.href =
        "mailto:" + info.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      status.textContent = window.ChefI18n.t("contacts.success");
      status.className = "form-status success";
      form.reset();
    });
  }

  function renderContacts() {
    var listRoot = document.getElementById("contact-list");
    var socialRoot = document.getElementById("social-list");
    var info = window.ChefData.contactInfo;

    function draw() {
      if (listRoot) {
        listRoot.innerHTML =
          '<li><span class="contact-icon">👤</span><span>' +
          esc(info.name) +
          '<br><span class="muted">' +
          esc(localized(info.role)) +
          "</span></span></li>" +
          '<li><span class="contact-icon">📞</span><a href="tel:' +
          esc(info.phone.replace(/\s/g, "")) +
          '">' +
          esc(info.phone) +
          "</a></li>" +
          '<li><span class="contact-icon">✉️</span><a href="mailto:' +
          esc(info.email) +
          '">' +
          esc(info.email) +
          "</a></li>" +
          '<li><span class="contact-icon">📍</span><span>' +
          esc(localized(info.city)) +
          "</span></li>" +
          '<li><span class="contact-icon">🕘</span><span>' +
          esc(localized(info.workHours)) +
          "</span></li>";
      }
      if (socialRoot) {
        socialRoot.innerHTML = info.socials
          .map(function (social) {
            return (
              '<li><a href="' +
              esc(social.url) +
              '" target="_blank" rel="noopener noreferrer">' +
              esc(social.label) +
              "</a></li>"
            );
          })
          .join("");
      }
    }

    draw();
    document.addEventListener("chef:languagechange", draw);
    bindContactForm(info);
  }

  return {
    home: renderHome,
    categories: renderCategories,
    category: renderCategory,
    certificates: renderCertificates,
    contacts: renderContacts,
  };
})();
