// 1. Lazy-load Lightbox Library dependencies on-demand
let glightboxLoaded = false;
function loadGLightbox() {
  return new Promise((resolve) => {
    if (glightboxLoaded) return resolve();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js";
    script.onload = () => {
      glightboxLoaded = true;
      resolve();
    };
    document.head.appendChild(script);
  });
}

// 2. Main UI Engine
document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.getElementById("mobile-nav");
  const navOverlay = document.getElementById("mobile-nav-overlay");
  const navSheet = mobileNav?.querySelector(".mobile-nav-sheet");

  // Mobile Navigation Drawer Actions
  function openMenu() {
    if (!mobileNav) return;
    mobileNav.classList.add("open");
    mobileNav.removeAttribute("aria-hidden");
    document.body.classList.add("locked");
  }

  function closeMenu() {
    if (!mobileNav || !navSheet) return;
    navSheet.style.transform = "";
    mobileNav.classList.remove("open");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
  }

  document
    .querySelectorAll(".mobile-nav-open")
    .forEach((el) => el.addEventListener("click", openMenu));
  navOverlay?.addEventListener("click", closeMenu);
  document
    .querySelectorAll(".mobile-nav-close, .mobile-nav-link")
    .forEach((el) => el.addEventListener("click", closeMenu));

  // Touch Gestures for Mobile Menu (Swipe to close)
  let touchStartX = 0;
  let touchDeltaX = 0;
  let isTrackingTouch = false;

  if (mobileNav && navSheet) {
    mobileNav.addEventListener(
      "touchstart",
      (e) => {
        if (mobileNav.classList.contains("open")) {
          touchStartX = e.touches[0].clientX;
          touchDeltaX = 0;
          isTrackingTouch = true;
          navSheet.style.transition = "none";
        }
      },
      { passive: true },
    );

    mobileNav.addEventListener(
      "touchmove",
      (e) => {
        if (!isTrackingTouch) return;
        touchDeltaX = e.touches[0].clientX - touchStartX;
        const currentTranslate = Math.min(touchDeltaX, 0);

        navSheet.style.transform = `translateX(${currentTranslate}px)`;
        if (navOverlay) {
          navOverlay.style.opacity = Math.max(
            0,
            1 + currentTranslate / navSheet.offsetWidth,
          );
        }
      },
      { passive: true },
    );

    mobileNav.addEventListener("touchend", () => {
      if (!isTrackingTouch) return;
      isTrackingTouch = false;
      navSheet.style.transition = "";
      if (navOverlay) navOverlay.style.opacity = "";

      if (touchDeltaX < -0.3 * navSheet.offsetWidth) {
        closeMenu();
      } else {
        navSheet.style.transform = "translateX(0)";
      }
    });
  }

  // Smooth Intercept Scrolling Layout
  document.addEventListener("click", (e) => {
    const targetAnchor = e.target.closest("a");
    if (!targetAnchor) return;

    let hrefValue = targetAnchor.getAttribute("href");
    if (!hrefValue) return;

    // Sanitize anchor context: Protect active query strings from getting chopped
    if (hrefValue.includes("?")) {
      hrefValue = hrefValue.split("?")[0];
    }

    if (!hrefValue.startsWith("#")) return;

    const destinationElement = document.querySelector(hrefValue);
    if (!destinationElement) return;

    e.preventDefault();
    const mainNav = document.getElementById("main-nav");
    const navOffset = mainNav ? mainNav.offsetHeight : 0;

    window.scrollTo({
      top:
        destinationElement.getBoundingClientRect().top +
        window.scrollY -
        navOffset +
        65,
      behavior: "smooth",
    });
  });

  // Shared Dynamic Grid Standard Styles
  const buttonStyles =
    "text-white text-sm leading-normal bg-white/15 backdrop-blur-[8px] border border-white/25 py-2 rounded-lg cursor-pointer whitespace-nowrap flex-1 text-center transition-colors duration-200 active:bg-white/30";

  // Dynamic Card Compilation Engine
  function renderGrid(targetId, dataset, assetFolder) {
    const container = document.getElementById(targetId);
    if (!container) return;

    container.innerHTML = dataset
      .map(
        (item) => `
      <article class="dest-card group relative overflow-hidden rounded mb-2.5 cursor-default" data-slug="${item.slug}">
        <img src="images/${assetFolder}/${item.slug}/${item.image}" alt="${item.name}" class="w-full h-72 object-cover rounded" />
        <div class="absolute inset-0 rounded z-1" style="background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 62%)" aria-hidden="true"></div>
        <div class="absolute bottom-5 left-5 right-5 z-10">
          <h3 class="text-white text-md font-semibold uppercase tracking-[0.15em] transition-colors duration-500">${item.name}</h3>
          <div class="flex justify-between gap-2 mt-1 flex-wrap">
            <button type="button" class="dest-photos-btn ${buttonStyles}">
              <svg width="0.9em" height="0.9em" fill="currentColor" viewBox="0 0 576 512" aria-hidden="true" style="display:inline-block;vertical-align:-0.125em;margin-right:0.25rem">
                <path d="M160 32c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h352c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zm248 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM192 256l48.8-58.5c8.8-10.6 24.8-11.5 34.7-1.9L320 240l95-114c9.1-10.9 25.8-11.5 35.7-1.4l.6.6L480 160v128H192zM0 224c0-17.7 14.3-32 32-32v256c0 17.7 14.3 32 32 32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H64c-53 0-96-43-96-96V224z"/>
              </svg>Photos
            </button>
            <button type="button" class="dest-desc-btn ${buttonStyles}">
              <svg width="0.9em" height="0.9em" fill="currentColor" viewBox="-16 -16 544 544" aria-hidden="true" style="display:inline-block;vertical-align:-0.125em;margin-right:0.25rem">
                <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-40-176h24v-64h-24c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-80c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/>
              </svg>Description
            </button>
          </div>
        </div>
      </article>
    `,
      )
      .join("");
  }

  function bindGalleryEvents(gridSelector, dataset, assetFolder) {
    document.querySelectorAll(`${gridSelector} .dest-card`).forEach((card) => {
      const slug = card.dataset.slug;
      const dataItem = dataset.find((item) => item.slug === slug);
      if (!dataItem) return;

      const imagesArray = dataItem.gallery.map((img) => ({
        href: `images/${assetFolder}/${slug}/${img}`,
        type: "image",
      }));

      card.querySelector(".dest-photos-btn")?.addEventListener("click", () => {
        loadGLightbox().then(() => GLightbox({ elements: imagesArray }).open());
      });
    });
  }

  // Populate Components
  renderGrid("hotels-grid", hotels, "hotels");
  bindGalleryEvents("#hotels-grid", hotels, "hotels");
  renderGrid("camps-grid", camps, "camps");
  bindGalleryEvents("#camps-grid", camps, "camps");

  // Interactive Information Modals
  const descModal = document.getElementById("desc-modal");
  const modalTitle = document.getElementById("desc-modal-title");
  const modalText = document.getElementById("desc-modal-text");
  const modalClose = document.getElementById("desc-modal-close");
  const modalOverlay = document.getElementById("desc-modal-overlay");
  const modalMapLink = document.getElementById("desc-modal-location");

  function closeModal() {
    if (!descModal) return;
    descModal.classList.replace("flex", "hidden");
    document.body.classList.remove("locked");
  }

  function bindModalEvents(gridSelector, dataset) {
    document.querySelectorAll(`${gridSelector} .dest-card`).forEach((card) => {
      const slug = card.dataset.slug;
      const dataItem = dataset.find((item) => item.slug === slug);

      if (dataItem) {
        card.querySelector(".dest-desc-btn")?.addEventListener("click", () => {
          if (!descModal || !modalTitle || !modalText) return;
          modalTitle.textContent = dataItem.name;
          modalText.innerHTML =
            dataItem.description || "No description available.";
          if (modalMapLink) modalMapLink.href = dataItem.location || "#";

          descModal.classList.replace("hidden", "flex");
          document.body.classList.add("locked");
        });
      }
    });
  }

  modalClose?.addEventListener("click", closeModal);
  modalOverlay?.addEventListener("click", closeModal);
  bindModalEvents("#hotels-grid", hotels);
  bindModalEvents("#camps-grid", camps);

  // Scroll Layout Entrance Revelations
  const cascadingRevealElements = document.querySelectorAll(".reveal");
  if (cascadingRevealElements.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -100px 0px" },
    );

    cascadingRevealElements.forEach((el) => revealObserver.observe(el));
  }
});
