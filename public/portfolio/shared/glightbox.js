// Shared GLightbox lazy-loader for portfolio demos.
// Exposes:
//   window.loadGLightbox() -> Promise<void>
//   window.openImageGallery(hrefs, options?) -> Promise<void>
//     hrefs: array of image URLs (or { href, title, description } objects)
//     options: { title?: string } — applied as the title on every slide
(function () {
  var loadPromise = null;

  function loadGLightbox() {
    if (loadPromise) return loadPromise;
    loadPromise = new Promise(function (resolve) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css";
      document.head.appendChild(link);

      var script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js";
      script.onload = function () {
        resolve();
      };
      document.head.appendChild(script);
    });
    return loadPromise;
  }

  function openImageGallery(hrefs, options) {
    var opts = options || {};
    var elements = hrefs.map(function (item) {
      var base =
        typeof item === "string" ? { href: item, type: "image" } : item;
      if (opts.title && base.title == null) base.title = opts.title;
      return base;
    });
    return loadGLightbox().then(function () {
      GLightbox({ elements: elements }).open();
    });
  }

  window.loadGLightbox = loadGLightbox;
  window.openImageGallery = openImageGallery;
})();
