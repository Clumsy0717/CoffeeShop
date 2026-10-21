const filterButtons = [...document.querySelectorAll("[data-filter]")];
const coffeeCards = [...document.querySelectorAll("[data-roast]")];
const coffeeCount = document.querySelector("#coffee-count");

function setCoffeeFilter(roast) {
  let visibleCount = 0;

  coffeeCards.forEach((card) => {
    const isVisible = roast === "all" || card.dataset.roast === roast;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === roast;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  coffeeCount.textContent = `${visibleCount} ${visibleCount === 1 ? "COFFEE" : "COFFEES"} ON THE MENU`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setCoffeeFilter(button.dataset.filter));
});

const menuToggle = document.querySelector("#menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  mainNavigation.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

mainNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 650) setMenuOpen(false);
});

const copyButton = document.querySelector("#copy-address");
const addressStatus = document.querySelector("#address-status");
const address = "Little Ember Coffee, 41 Orchard Street, Brooklyn, NY 11211";
let copyResetTimer;

async function copyAddress() {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(address);
    } else {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = address;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.append(temporaryInput);
      temporaryInput.select();
      const copied = document.execCommand("copy");
      temporaryInput.remove();
      if (!copied) throw new Error("Clipboard copy was not available.");
    }

    copyButton.innerHTML = 'Address copied <span aria-hidden="true">✓</span>';
    addressStatus.textContent = "The café address was copied to your clipboard.";
  } catch {
    addressStatus.textContent = "Copying is unavailable. The address is 41 Orchard Street, Brooklyn, NY 11211.";
    copyButton.innerHTML = 'Copy unavailable <span aria-hidden="true">↗</span>';
  }

  window.clearTimeout(copyResetTimer);
  copyResetTimer = window.setTimeout(() => {
    copyButton.innerHTML = 'Copy our address <span aria-hidden="true">↗</span>';
    addressStatus.textContent = "";
  }, 2400);
}

copyButton.addEventListener("click", copyAddress);

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
