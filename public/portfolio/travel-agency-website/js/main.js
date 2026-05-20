document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("mobile-nav"),
    t = document.getElementById("mobile-nav-overlay");
  function n() {
    (e.classList.add("open"),
      e.removeAttribute("aria-hidden"),
      document.body.classList.add("locked"));
  }
  function o() {
    const t = e.querySelector(".mobile-nav-sheet");
    (t && (t.style.transform = ""),
      e.classList.remove("open"),
      e.setAttribute("aria-hidden", "true"),
      document.body.classList.remove("locked"));
  }
  (document
    .querySelectorAll(".mobile-nav-open")
    .forEach((e) => e.addEventListener("click", n)),
    t?.addEventListener("click", o),
    document
      .querySelectorAll(".mobile-nav-close")
      .forEach((e) => e.addEventListener("click", o)),
    document
      .querySelectorAll(".mobile-nav-link")
      .forEach((e) => e.addEventListener("click", o)));
  const s = e.querySelector(".mobile-nav-sheet");
  let i = 0,
    r = 0,
    l = !1;
  var a, c;
  (e.addEventListener(
    "touchstart",
    (t) => {
      e.classList.contains("open") &&
        ((i = t.touches[0].clientX),
        (r = 0),
        (l = !0),
        (s.style.transition = "none"));
    },
    { passive: !0 },
  ),
    e.addEventListener(
      "touchmove",
      (e) => {
        if (!l) return;
        r = e.touches[0].clientX - i;
        const n = Math.min(r, 0);
        ((s.style.transform = `translateX(${n}px)`),
          (t.style.opacity = Math.max(0, 1 + n / s.offsetWidth)));
      },
      { passive: !0 },
    ),
    e.addEventListener("touchend", () => {
      l &&
        ((l = !1),
        (s.style.transition = ""),
        (t.style.opacity = ""),
        r < -0.3 * s.offsetWidth ? o() : (s.style.transform = "translateX(0)"));
    }),
    document.addEventListener("click", (e) => {
      const t = e.target.closest("a");
      if (!t) return;
      const n = t.getAttribute("href");
      if (!n || !n.startsWith("#")) return;
      const o = document.querySelector(n);
      if (!o) return;
      e.preventDefault();
      const s = document.getElementById("main-nav");
      const i = s ? s.offsetHeight : 0;
      window.scrollTo({
        top: o.getBoundingClientRect().top + window.scrollY - i + 60
      });
    }),
    (function (e, t) {
      const n = document.getElementById(t);
      if (!n) return;
      const o =
        "text-white text-sm leading-normal bg-white/15 backdrop-blur-[8px] border border-white/25 py-2 rounded-lg cursor-pointer whitespace-nowrap flex-1 text-center transition-colors duration-200 active:bg-white/30";
      n.innerHTML = e
        .map(
          (e) =>
            `\n      <article class="dest-card group relative overflow-hidden rounded mb-2.5 cursor-default" data-hotel="${e.slug}">\n        <img src="images/hotels/${e.slug}/${e.image}" alt="${e.name}" class="w-full h-72 object-cover rounded" />\n        <div class="absolute inset-0 rounded z-1" style="background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 62%)" aria-hidden="true"></div>\n        <div class="absolute bottom-5 left-5 right-5 z-10">\n          <h3 class="text-white text-md font-semibold uppercase tracking-[0.15em] transition-colors duration-500">${e.name}</h3>\n          <div class="flex justify-between gap-2 mt-1 flex-wrap">\n            <button type="button" class="dest-photos-btn ${o}"><svg width="0.9em" height="0.9em" fill="currentColor" viewBox="0 0 576 512" aria-hidden="true" style="display:inline-block;vertical-align:-0.125em;margin-right:0.25rem"><path d="M160 32c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h352c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zm248 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM192 256l48.8-58.5c8.8-10.6 24.8-11.5 34.7-1.9L320 240l95-114c9.1-10.9 25.8-11.5 35.7-1.4l.6.6L480 160v128H192zM0 224c0-17.7 14.3-32 32-32v256c0 17.7 14.3 32 32 32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H64c-53 0-96-43-96-96V224z"/></svg>Photos</button>\n            <button type="button" class="dest-desc-btn ${o}"><svg width="0.9em" height="0.9em" fill="currentColor" viewBox="-16 -16 544 544" aria-hidden="true" style="display:inline-block;vertical-align:-0.125em;margin-right:0.25rem"><path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-40-176h24v-64h-24c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-80c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/></svg>Description</button>\n          </div>\n        </div>\n      </article>\n    `,
        )
        .join("");
    })(hotels, "hotels-grid"),
    (a = hotels),
    (c = "hotels-grid"),
    document.querySelectorAll(`#${c} .dest-card`).forEach((e) => {
      const t = e.dataset.hotel,
        n = a.find((e) => e.slug === t);
      if (!n) return;
      const o = n.gallery.map((e) => ({
        href: `images/hotels/${t}/${e}`,
        type: "image",
      }));
      e.querySelector(".dest-photos-btn").addEventListener("click", () =>
        GLightbox({ elements: o }).open(),
      );
    }));
  (function (e, t) {
    const n = document.getElementById(t);
    if (!n) return;
    const o =
      "text-white text-sm leading-normal bg-white/15 backdrop-blur-[8px] border border-white/25 py-2 rounded-lg cursor-pointer whitespace-nowrap flex-1 text-center transition-colors duration-200 active:bg-white/30";
    n.innerHTML = e
      .map(
        (e) =>
          `\n      <article class="dest-card group relative overflow-hidden rounded mb-2.5 cursor-default" data-hotel="${e.slug}">\n        <img src="images/camps/${e.slug}/${e.image}" alt="${e.name}" class="w-full h-72 object-cover rounded" />\n        <div class="absolute inset-0 rounded z-1" style="background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 62%)" aria-hidden="true"></div>\n        <div class="absolute bottom-5 left-5 right-5 z-10">\n          <h3 class="text-white text-md font-semibold uppercase tracking-[0.15em] transition-colors duration-500">${e.name}</h3>\n          <div class="flex justify-between gap-2 mt-1 flex-wrap">\n            <button type="button" class="dest-photos-btn ${o}"><svg width="0.9em" height="0.9em" fill="currentColor" viewBox="0 0 576 512" aria-hidden="true" style="display:inline-block;vertical-align:-0.125em;margin-right:0.25rem"><path d="M160 32c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h352c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zm248 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM192 256l48.8-58.5c8.8-10.6 24.8-11.5 34.7-1.9L320 240l95-114c9.1-10.9 25.8-11.5 35.7-1.4l.6.6L480 160v128H192zM0 224c0-17.7 14.3-32 32-32v256c0 17.7 14.3 32 32 32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H64c-53 0-96-43-96-96V224z"/></svg>Photos</button>\n            <button type="button" class="dest-desc-btn ${o}"><svg width="0.9em" height="0.9em" fill="currentColor" viewBox="-16 -16 544 544" aria-hidden="true" style="display:inline-block;vertical-align:-0.125em;margin-right:0.25rem"><path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-40-176h24v-64h-24c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-80c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/></svg>Description</button>\n          </div>\n        </div>\n      </article>\n    `,
      )
      .join("");
  })(camps, "camps-grid");
  document.querySelectorAll("#camps-grid .dest-card").forEach((e) => {
    const t = e.dataset.hotel,
      n = camps.find((c) => c.slug === t);
    if (!n) return;
    const o = n.gallery.map((img) => ({
      href: `images/camps/${t}/${img}`,
      type: "image",
    }));
    e.querySelector(".dest-photos-btn").addEventListener("click", () =>
      GLightbox({ elements: o }).open(),
    );
  });
  const d = document.getElementById("desc-modal"),
    m = document.getElementById("desc-modal-title"),
    u = document.getElementById("desc-modal-text"),
    h = document.getElementById("desc-modal-close"),
    v = document.getElementById("desc-modal-overlay"),
    g = document.getElementById("desc-modal-location");
  function f() {
    (d.classList.replace("flex", "hidden"),
      document.body.classList.remove("locked"));
  }
  (h?.addEventListener("click", f),
    v?.addEventListener("click", f),
    (function (e, t) {
      document.querySelectorAll(`#${t} .dest-card`).forEach((t) => {
        const n = t.dataset.hotel,
          o = e.find((e) => e.slug === n);
        o &&
          t.querySelector(".dest-desc-btn").addEventListener("click", () => {
            ((m.textContent = o.name),
              (u.innerHTML = o.description || "No description available."),
              g && (g.href = o.location || "#"),
              d.classList.replace("hidden", "flex"),
              document.body.classList.add("locked"));
          });
      });
    })(hotels, "hotels-grid"),
    (function (e, t) {
      document.querySelectorAll(`#${t} .dest-card`).forEach((t) => {
        const n = t.dataset.hotel,
          o = e.find((e) => e.slug === n);
        o &&
          t.querySelector(".dest-desc-btn").addEventListener("click", () => {
            ((m.textContent = o.name),
              (u.innerHTML = o.description || "No description available."),
              g && (g.href = o.location || "#"),
              d.classList.replace("hidden", "flex"),
              document.body.classList.add("locked"));
          });
      });
    })(camps, "camps-grid"));
  const y = document.querySelectorAll(".reveal");
  if (y.length && "IntersectionObserver" in window) {
    const e = new IntersectionObserver(
      (t) => {
        t.forEach((t) => {
          t.isIntersecting &&
            (t.target.classList.add("visible"), e.unobserve(t.target));
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -100px 0px" },
    );
    y.forEach((t) => e.observe(t));
  }
});
