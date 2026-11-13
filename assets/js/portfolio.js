/* Accessible mobile navigation for the existing static portfolio. */
(() => {
  "use strict";
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-navigation");
  if (!btn || !nav) return;
  const close = () => {
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  };
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", close));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { close(); btn.focus(); }
  });
  document.addEventListener("click", e => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !btn.contains(e.target)) close();
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 820) close(); });
  if ("IntersectionObserver" in window) {
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const targets = links.map(link => ({link, section:document.querySelector(link.getAttribute("href"))})).filter(x => x.section);
    const observer = new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting).forEach(e => {
        links.forEach(a => a.removeAttribute("aria-current"));
        const found = targets.find(x => x.section === e.target);
        if (found) found.link.setAttribute("aria-current","location");
      });
    }, {rootMargin:"-20% 0px -65% 0px",threshold:0});
    targets.forEach(x => observer.observe(x.section));
  }
})();
