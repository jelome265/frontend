/* Bean Boutique - progressive enhancement for a static HTML prototype. */
(function () {
  document.documentElement.classList.add("js");
  "use strict";

  const CART_KEY = "bean-boutique-cart-v1";
  const PRODUCTS = Object.freeze({
    "mzuzu-highlands": {
      name: "Mzuzu Highlands",
      price: 18500,
      detail: "250g coffee · Malawi single origin",
      image: "asserts/images/coffee-beans.svg"
    },
    "shire-espresso": {
      name: "Shire Espresso",
      price: 20000,
      detail: "250g coffee · house blend",
      image: "asserts/images/coffee-beans.svg"
    },
    "nyika-natural": {
      name: "Nyika Natural",
      price: 22000,
      detail: "250g coffee · seasonal single origin",
      image: "asserts/images/coffee-beans.svg"
    },
    "dedza-washed": {
      name: "Dedza Washed",
      price: 17000,
      detail: "250g coffee · Malawi single origin",
      image: "asserts/images/coffee-beans.svg"
    },
    "zomba-honey": {
      name: "Zomba Honey",
      price: 19000,
      detail: "250g coffee · Malawi single origin",
      image: "asserts/images/coffee-beans.svg"
    },
    "lake-blend": {
      name: "Lake Blend",
      price: 18000,
      detail: "250g coffee · house blend",
      image: "asserts/images/coffee-beans.svg"
    },
    "espresso-machine": {
      name: "Home Espresso Machine",
      price: 350000,
      detail: "Single unit · illustrative price",
      image: "asserts/images/espresso-machine.svg"
    },
    "kuche-decaf": {
      name: "Kuche Decaf",
      price: 21000,
      detail: "250g coffee · decaffeinated",
      image: "asserts/images/coffee-beans.svg"
    },
    "press-pot": {
      name: "Classic French Press",
      price: 46000,
      detail: "Brewing equipment · each",
      image: "asserts/images/brewing-tools.svg"
    },
    "pour-over-kit": {
      name: "Pour-over Starter Set",
      price: 58000,
      detail: "Brewing equipment · set",
      image: "asserts/images/brewing-tools.svg"
    },
    "hand-grinder": {
      name: "Hand Burr Grinder",
      price: 79000,
      detail: "Brewing equipment · each",
      image: "asserts/images/grinder.svg"
    },
    "gooseneck-kettle": {
      name: "Gooseneck Kettle",
      price: 68000,
      detail: "Brewing equipment · each",
      image: "asserts/images/brewing-tools.svg"
    },
    "sub-explorer": {
      name: "Explorer Subscription",
      price: 30000,
      detail: "Monthly subscription · one 250g bag",
      image: "asserts/images/coffee-beans.svg"
    },
    "sub-enthusiast": {
      name: "Enthusiast Subscription",
      price: 55000,
      detail: "Monthly subscription · two 250g bags",
      image: "asserts/images/coffee-beans.svg"
    },
    "sub-household": {
      name: "Household Subscription",
      price: 96000,
      detail: "Monthly subscription · four 250g bags",
      image: "asserts/images/coffee-beans.svg"
    }
  });

  function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MWK",
      maximumFractionDigits: 0
    }).format(value);
  }

  function readCart() {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

      return Object.entries(parsed).reduce(function (result, entry) {
        const id = entry[0];
        const quantity = Number(entry[1]);
        if (Object.prototype.hasOwnProperty.call(PRODUCTS, id) &&
            Number.isInteger(quantity) && quantity > 0 && quantity <= 99) {
          result[id] = quantity;
        }
        return result;
      }, {});
    } catch (error) {
      return {};
    }
  }

  let cart = readCart();

  function saveCart() {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return true;
    } catch (error) {
      return false;
    }
  }

  function cartQuantity() {
    return Object.values(cart).reduce(function (total, quantity) {
      return total + quantity;
    }, 0);
  }

  function updateCartBadges() {
    document.querySelectorAll("[data-cart-count]").forEach(function (badge) {
      badge.textContent = String(cartQuantity());
    });
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (typeof text === "string") element.textContent = text;
    return element;
  }

  function showToast(message) {
    const existing = document.querySelector(".site-toast");
    if (existing) existing.remove();

    const toast = createElement("div", "site-toast", message);
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);

    window.setTimeout(function () {
      toast.classList.add("site-toast-dismiss");
      window.setTimeout(function () {
        toast.remove();
      }, 250);
    }, 2600);
  }

  function addToCart(productId) {
    if (!Object.prototype.hasOwnProperty.call(PRODUCTS, productId)) return;
    const currentQuantity = cart[productId] || 0;
    if (currentQuantity >= 99) {
      showToast("The maximum quantity for one item is 99.");
      return;
    }

    cart[productId] = currentQuantity + 1;
    const saved = saveCart();
    updateCartBadges();
    renderCart();
    showToast(saved ? PRODUCTS[productId].name + " added to your bag." : "Added for this visit, but browser storage is unavailable.");
  }

  function setCartQuantity(productId, quantity) {
    if (!Object.prototype.hasOwnProperty.call(PRODUCTS, productId)) return;
    if (quantity <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = Math.min(99, quantity);
    }
    saveCart();
    updateCartBadges();
    renderCart();
  }

  function makeEmptyCart(root) {
    const empty = createElement("div", "empty-cart");
    empty.appendChild(createElement("p", "empty-cart-mark", "◎"));
    empty.appendChild(createElement("h3", "", "Your bag is waiting."));
    empty.appendChild(createElement("p", "", "Find a coffee or a tool to get started."));
    const link = createElement("a", "button button-dark", "Explore coffee");
    link.href = "coffee.html";
    empty.appendChild(link);
    root.appendChild(empty);
  }

  function renderCart() {
    const root = document.getElementById("cart-items");
    if (!root) return;

    root.replaceChildren();
    const entries = Object.entries(cart).filter(function (entry) {
      return Object.prototype.hasOwnProperty.call(PRODUCTS, entry[0]) && entry[1] > 0;
    });

    if (entries.length === 0) {
      makeEmptyCart(root);
    } else {
      entries.forEach(function (entry) {
        const productId = entry[0];
        const quantity = entry[1];
        const product = PRODUCTS[productId];
        const row = createElement("article", "cart-item");

        const imageWrap = createElement("div", "cart-item-image");
        const image = createElement("img");
        image.src = product.image;
        image.alt = "";
        image.loading = "lazy";
        imageWrap.appendChild(image);

        const info = createElement("div", "cart-item-info");
        info.appendChild(createElement("h3", "", product.name));
        info.appendChild(createElement("p", "", product.detail));

        const controls = createElement("div", "cart-item-controls");
        const decrease = createElement("button", "quantity-button", "−");
        decrease.type = "button";
        decrease.setAttribute("aria-label", "Decrease quantity of " + product.name);
        decrease.dataset.cartAction = "decrease";
        decrease.dataset.productId = productId;

        const quantityText = createElement("span", "quantity-value", String(quantity));
        quantityText.setAttribute("aria-label", "Quantity " + quantity);

        const increase = createElement("button", "quantity-button", "+");
        increase.type = "button";
        increase.setAttribute("aria-label", "Increase quantity of " + product.name);
        increase.dataset.cartAction = "increase";
        increase.dataset.productId = productId;

        const remove = createElement("button", "remove-item destructive", "Remove");
        remove.type = "button";
        remove.dataset.cartAction = "remove";
        remove.dataset.productId = productId;

        controls.append(decrease, quantityText, increase, remove);
        info.appendChild(controls);

        const lineTotal = createElement("p", "cart-item-price", formatMoney(product.price * quantity));
        lineTotal.setAttribute("aria-label", "Line total");

        row.append(imageWrap, info, lineTotal);
        root.appendChild(row);
      });
    }

    const itemCount = cartQuantity();
    const subtotal = Object.entries(cart).reduce(function (total, entry) {
      const product = PRODUCTS[entry[0]];
      return product ? total + product.price * entry[1] : total;
    }, 0);

    const countNode = document.getElementById("cart-item-count");
    const subtotalNode = document.getElementById("cart-subtotal");
    const totalNode = document.getElementById("cart-total");
    const checkoutButton = document.querySelector("[data-checkout]");

    if (countNode) countNode.textContent = String(itemCount);
    if (subtotalNode) subtotalNode.textContent = formatMoney(subtotal);
    if (totalNode) totalNode.textContent = formatMoney(subtotal);
    if (checkoutButton) checkoutButton.disabled = itemCount === 0;
  }

  function buildCheckoutEmail() {
    const lines = Object.entries(cart).map(function (entry) {
      const product = PRODUCTS[entry[0]];
      if (!product) return "";
      return product.name + " x " + entry[1] + " — " + formatMoney(product.price * entry[1]);
    }).filter(Boolean);

    const subtotal = Object.entries(cart).reduce(function (total, entry) {
      const product = PRODUCTS[entry[0]];
      return product ? total + product.price * entry[1] : total;
    }, 0);

    const body = [
      "Hello Bean Boutique,",
      "",
      "Please confirm availability for this prototype order:",
      lines.join("\n"),
      "",
      "Estimated subtotal: " + formatMoney(subtotal),
      "",
      "This email was generated by the static website prototype."
    ].join("\n");

    return "mailto:orders@beanboutique.example?subject=" +
      encodeURIComponent("Bean Boutique order enquiry") +
      "&body=" + encodeURIComponent(body);
  }

  function initialiseNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const navigation = document.getElementById("site-navigation");
    if (!toggle || !navigation) return;

    toggle.addEventListener("click", function () {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        toggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
      }
    });
  }

  function initialiseCarousel() {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const status = document.querySelector("[data-carousel-status]");
    const previous = document.querySelector("[data-carousel-prev]");
    const next = document.querySelector("[data-carousel-next]");
    if (slides.length < 2) return;

    let activeIndex = 0;
    let timerId = null;
    const reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        slide.hidden = slideIndex !== activeIndex;
      });
      if (status) {
        status.textContent = "Featured item " + (activeIndex + 1) + " of " + slides.length;
      }
    }

    function stopRotation() {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    function startRotation() {
      if (reduceMotion || document.hidden) return;
      stopRotation();
      timerId = window.setInterval(function () {
        showSlide(activeIndex + 1);
      }, 5600);
    }

    if (previous) previous.addEventListener("click", function () {
      showSlide(activeIndex - 1);
      startRotation();
    });
    if (next) next.addEventListener("click", function () {
      showSlide(activeIndex + 1);
      startRotation();
    });

    carousel.addEventListener("mouseenter", stopRotation);
    carousel.addEventListener("mouseleave", startRotation);
    carousel.addEventListener("focusin", stopRotation);
    carousel.addEventListener("focusout", startRotation);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopRotation();
      else startRotation();
    });

    showSlide(0);
    startRotation();
  }

  function initialiseCoffeeSearch() {
    const search = document.getElementById("product-search");
    const filter = document.getElementById("coffee-filter");
    const grid = document.getElementById("coffee-grid");
    const resultLabel = document.getElementById("search-results");
    const noResults = document.getElementById("no-results");
    const clearButton = document.getElementById("clear-search");
    if (!search || !grid) return;

    const cards = Array.from(grid.querySelectorAll("[data-product-card]"));

    function filterCards() {
      const term = search.value.trim().toLocaleLowerCase();
      const category = filter ? filter.value : "all";
      let visibleCount = 0;

      cards.forEach(function (card) {
        const searchable = (card.dataset.search || card.textContent).toLocaleLowerCase();
        const categoryMatches = category === "all" || card.dataset.category === category;
        const textMatches = term.length === 0 || searchable.includes(term);
        const isVisible = categoryMatches && textMatches;
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      if (resultLabel) {
        resultLabel.textContent = "Showing " + visibleCount + " of " + cards.length + " coffees";
      }
      if (noResults) noResults.hidden = visibleCount !== 0;
    }

    search.addEventListener("input", filterCards);
    if (filter) filter.addEventListener("change", filterCards);
    if (clearButton) {
      clearButton.addEventListener("click", function () {
        search.value = "";
        if (filter) filter.value = "all";
        filterCards();
        search.focus();
      });
    }
    filterCards();
  }

  function initialiseCartActions() {
    document.addEventListener("click", function (event) {
      const addButton = event.target.closest("[data-add-to-cart]");
      if (addButton) {
        addToCart(addButton.dataset.productId);
        return;
      }

      const cartAction = event.target.closest("[data-cart-action]");
      if (cartAction) {
        const productId = cartAction.dataset.productId;
        const current = cart[productId] || 0;
        if (cartAction.dataset.cartAction === "increase") {
          setCartQuantity(productId, current + 1);
        } else if (cartAction.dataset.cartAction === "decrease") {
          setCartQuantity(productId, current - 1);
        } else if (cartAction.dataset.cartAction === "remove") {
          setCartQuantity(productId, 0);
        }
        return;
      }

      const clearButton = event.target.closest("[data-clear-cart]");
      if (clearButton) {
        if (!window.confirm("Remove everything from your bag? This cannot be undone.")) return;
        cart = {};
        saveCart();
        updateCartBadges();
        renderCart();
        showToast("Your bag has been cleared.");
        return;
      }

      const checkoutButton = event.target.closest("[data-checkout]");
      if (checkoutButton && !checkoutButton.disabled) {
        window.location.href = buildCheckoutEmail();
      }
    });

    window.addEventListener("storage", function (event) {
      if (event.key === CART_KEY) {
        cart = readCart();
        updateCartBadges();
        renderCart();
      }
    });
  }

  function initialiseWelcomeModal() {
    const dialog = document.getElementById("welcome-modal");
    if (!dialog || typeof dialog.showModal !== "function") return;

    const closeButton = dialog.querySelector("[data-close-welcome]");
    const form = document.getElementById("welcome-form");
    const status = document.getElementById("welcome-status");
    let alreadySeen = false;

    try {
      alreadySeen = window.sessionStorage.getItem("bean-boutique-welcome-seen") === "yes";
    } catch (error) {
      alreadySeen = false;
    }

    if (!alreadySeen) {
      window.setTimeout(function () {
        if (!dialog.open) dialog.showModal();
      }, 800);
    }

    function closeDialog() {
      try {
        window.sessionStorage.setItem("bean-boutique-welcome-seen", "yes");
      } catch (error) {
        /* The modal still works when browser storage is blocked. */
      }
      if (dialog.open) dialog.close();
    }

    if (closeButton) closeButton.addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("close", function () {
      try {
        window.sessionStorage.setItem("bean-boutique-welcome-seen", "yes");
      } catch (error) {
        /* No persistent state is required for the modal. */
      }
    });

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (status) {
          status.textContent = "Thank you. Your 10% welcome offer is shown for this demo; your email has not been sent or stored.";
        }
        form.reset();
        try {
          window.sessionStorage.setItem("bean-boutique-welcome-seen", "yes");
        } catch (error) {
          /* Keep the interaction usable when storage is unavailable. */
        }
      });
    }
  }

  function initialiseEventRegistration() {
    const form = document.getElementById("event-registration");
    const status = document.getElementById("registration-status");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      const recipient = form.dataset.recipient || "events@beanboutique.example";
      const firstName = String(formData.get("firstName") || "").trim();
      const lastName = String(formData.get("lastName") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const eventName = String(formData.get("event") || "").trim();

      if (!firstName || !lastName || !email || !eventName) return;

      const body = [
        "Hello Bean Boutique,",
        "",
        "I would like to register for:",
        eventName,
        "",
        "Name: " + firstName + " " + lastName,
        "Email: " + email,
        "",
        "Please confirm availability and any next steps.",
        "",
        "Sent from the Bean Boutique website prototype."
      ].join("\n");

      if (status) {
        status.textContent = "Opening your email application. Review the draft and send it to complete this prototype registration. Replace the example recipient before launch.";
      }

      /* This static prototype cannot validate Turnstile tokens server-side. */
      window.location.href = "mailto:" + recipient +
        "?subject=" + encodeURIComponent("Workshop registration — " + eventName) +
        "&body=" + encodeURIComponent(body);
    });
  }

  function initialiseFooterYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (element) {
      element.textContent = year;
    });
  }

  function initialiseTickerToggle() {
    const toggle = document.querySelector("[data-ticker-toggle]");
    const track = document.querySelector(".ticker-track");
    if (!toggle || !track) return;
    const reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      track.classList.add("is-paused");
      toggle.setAttribute("aria-pressed", "true");
      toggle.textContent = "Play";
    }
    toggle.addEventListener("click", function () {
      const paused = track.classList.toggle("is-paused");
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.textContent = paused ? "Play" : "Pause";
    });
  }

  function initialisePageFind() {
    const form = document.querySelector("[data-page-find]");
    const main = document.getElementById("main-content");
    if (!form || !main) return;
    const input = form.querySelector("input");
    const status = form.querySelector("[data-find-status]");
    const prev = form.querySelector("[data-find-prev]");
    const next = form.querySelector("[data-find-next]");
    const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, INPUT: 1, TEXTAREA: 1, SELECT: 1, BUTTON: 1, IFRAME: 1, MARK: 1 };
    let hits = [];
    let current = -1;

    function clearHits() {
      document.querySelectorAll("mark.find-hit").forEach(function (mark) {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
      hits = [];
      current = -1;
    }

    function wrapMatches(term) {
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
          let el = node.parentNode;
          while (el && el !== main) {
            if (SKIP[el.nodeName] || el.hidden) return NodeFilter.FILTER_REJECT;
            el = el.parentNode;
          }
          return node.nodeValue.toLocaleLowerCase().indexOf(term) !== -1
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      });
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach(function (node) {
        const text = node.nodeValue;
        const lower = text.toLocaleLowerCase();
        let index = 0;
        const fragment = document.createDocumentFragment();
        let found = lower.indexOf(term, index);
        while (found !== -1) {
          if (found > index) fragment.appendChild(document.createTextNode(text.slice(index, found)));
          const mark = document.createElement("mark");
          mark.className = "find-hit";
          mark.textContent = text.slice(found, found + term.length);
          fragment.appendChild(mark);
          hits.push(mark);
          index = found + term.length;
          found = lower.indexOf(term, index);
        }
        if (index < text.length) fragment.appendChild(document.createTextNode(text.slice(index)));
        node.parentNode.replaceChild(fragment, node);
      });
    }

    function focusHit(index) {
      if (!hits.length) return;
      if (current >= 0) hits[current].classList.remove("is-current");
      current = (index + hits.length) % hits.length;
      const target = hits[current];
      target.classList.add("is-current");
      target.scrollIntoView({ block: "center" });
      if (status) status.textContent = "Match " + (current + 1) + " of " + hits.length;
    }

    function runSearch() {
      clearHits();
      const term = input.value.trim().toLocaleLowerCase();
      if (term.length < 2) {
        if (status) status.textContent = term ? "Type at least two characters." : "";
        prev.disabled = next.disabled = true;
        return;
      }
      wrapMatches(term);
      const count = hits.length;
      prev.disabled = next.disabled = count === 0;
      if (count === 0) {
        if (status) status.textContent = "No matches on this page.";
        return;
      }
      focusHit(0);
    }

    let debounce = null;
    input.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(runSearch, 180);
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!hits.length) runSearch(); else focusHit(current + 1);
    });
    prev.addEventListener("click", function () { focusHit(current - 1); });
    form.querySelector("[data-find-clear]").addEventListener("click", function () {
      input.value = "";
      clearHits();
      if (status) status.textContent = "";
      prev.disabled = next.disabled = true;
      input.focus();
    });
  }

  function initialiseScoreSheets() {
    const sheets = document.querySelectorAll("[data-score-sheet]");
    if (!sheets.length) return;
    const reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      sheets.forEach(function (sheet) { sheet.classList.add("is-in"); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    sheets.forEach(function (sheet) { observer.observe(sheet); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initialiseNavigation();
    initialiseCarousel();
    initialiseTickerToggle();
    initialisePageFind();
    initialiseScoreSheets();
    initialiseCoffeeSearch();
    initialiseCartActions();
    initialiseWelcomeModal();
    initialiseEventRegistration();
    initialiseFooterYear();
    updateCartBadges();
    renderCart();
  });
}());
