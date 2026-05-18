export default function useSmoothScroll() {
  const handleScroll = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const elem = document.getElementById(href.replace("#", ""));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }
    }
  };
  return handleScroll;
}
