document.addEventListener("DOMContentLoaded", function () {
  window.ChefI18n.init();
  window.ChefLayout.init();
  window.ChefI18n.refresh();

  var page = document.body.getAttribute("data-page");
  if (window.ChefPages && typeof window.ChefPages[page] === "function") {
    window.ChefPages[page]();
  }
});
