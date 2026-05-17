window.addEventListener("load",()=>{const e=document.getElementById("loading-gate"),t=document.getElementById("main-content");gsap.to(e,{opacity:0,duration:.5,ease:"power2.inOut",onComplete:()=>{e.style.display="none"}}),gsap.to(t,{opacity:1,duration:.5,ease:"power2.out"})});

// <base> tag rewrites fragment hrefs into full URLs, causing page reloads.
// Intercept and scroll instead.
document.addEventListener("click",e=>{const t=e.target.closest("a");if(!t)return;const n=t.getAttribute("href");if(!n||!n.startsWith("#"))return;const o=document.querySelector(n);if(!o)return;e.preventDefault();o.scrollIntoView({behavior:"smooth"});});