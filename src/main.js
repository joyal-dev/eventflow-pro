import "./styles.css";

const heroImage = new URL("./assets/hero-event.jpg", import.meta.url).href;
const productImageMap = {
  "1": new URL("./assets/product-chairs.jpg", import.meta.url).href,
  "2": new URL("./assets/product-tables.jpg", import.meta.url).href,
  "3": new URL("./assets/product-tents.jpg", import.meta.url).href,
  "4": new URL("./assets/product-speakers.jpg", import.meta.url).href,
  "5": new URL("./assets/product-microphones.jpg", import.meta.url).href,
  "6": new URL("./assets/product-projector.jpg", import.meta.url).href,
  "7": new URL("./assets/product-linens.jpg", import.meta.url).href,
  "8": new URL("./assets/product-dinnerware.jpg", import.meta.url).href,
  "9": new URL("./assets/product-cakestand.jpg", import.meta.url).href,
  "10": new URL("./assets/product-backdrop.jpg", import.meta.url).href,
  "11": new URL("./assets/product-popcorn.jpg", import.meta.url).href,
  "12": new URL("./assets/product-chocolate.jpg", import.meta.url).href,
  "13": new URL("./assets/product-smoke.jpg", import.meta.url).href,
  "14": new URL("./assets/product-lights.jpg", import.meta.url).href,
};

const root = document.getElementById("root");
const STORAGE_KEY = "eventrentals_products";
const ADMIN_PASSWORD = "admin123";
const categories = [
  "All",
  "Furniture",
  "Audio & Visual",
  "Tableware",
  "Decor & Effects",
  "Food & Fun",
];

const VALID_ROUTES = new Set(["/", "/products", "/admin"]);

const defaultProducts = [
  {
    id: "1",
    name: "Elegant Chiavari Chairs",
    category: "Furniture",
    description:
      "Premium gold chiavari chairs perfect for weddings, galas, and upscale events. Comfortable cushioned seats included.",
    price: 8,
    priceUnit: "per chair / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "2",
    name: "Round Banquet Tables",
    category: "Furniture",
    description:
      "Sturdy 60-inch round tables seating 8-10 guests. Perfect for dining events and conferences.",
    price: 25,
    priceUnit: "per table / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "3",
    name: "Premium Event Tents",
    category: "Furniture",
    description:
      "Waterproof 20x40 ft marquee tents with elegant draping. Ideal for outdoor ceremonies and receptions.",
    price: 350,
    priceUnit: "per tent / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "4",
    name: "Portable Speakers",
    category: "Audio & Visual",
    description:
      "High-powered 1000W portable speakers with crystal-clear sound. Built-in Bluetooth and wired connectivity.",
    price: 75,
    priceUnit: "per unit / day",
    image: "",
    available: true,
  },
  {
    id: "5",
    name: "Wireless Microphones",
    category: "Audio & Visual",
    description:
      "Professional UHF wireless microphone system with handheld and lapel options. Perfect for speeches and performances.",
    price: 35,
    priceUnit: "per set / day",
    image: "",
    available: true,
  },
  {
    id: "6",
    name: "Projectors & Screens",
    category: "Audio & Visual",
    description:
      "4K ultra-bright projector with 120-inch motorized screen. Great for presentations and movie nights.",
    price: 120,
    priceUnit: "per set / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "7",
    name: "Luxury Tablecloths & Linens",
    category: "Tableware",
    description:
      "Premium satin and organza tablecloths in 20+ colors. Includes matching napkins and table runners.",
    price: 15,
    priceUnit: "per set / day",
    image: "",
    available: true,
  },
  {
    id: "8",
    name: "Fine Dinnerware Sets",
    category: "Tableware",
    description:
      "Complete bone china dinnerware sets including plates, bowls, glassware, and silverware for 10 guests.",
    price: 45,
    priceUnit: "per set / day",
    image: "",
    available: true,
  },
  {
    id: "9",
    name: "Tiered Cake Stands",
    category: "Tableware",
    description:
      "Elegant 3-tier crystal cake stands with LED base lighting. Perfect for wedding cakes and dessert displays.",
    price: 30,
    priceUnit: "per stand / day",
    image: "",
    available: true,
  },
  {
    id: "10",
    name: "Custom Backdrops",
    category: "Decor & Effects",
    description:
      "Stunning floral and fabric backdrops for photo booths and stage areas. Customizable to your event theme.",
    price: 150,
    priceUnit: "per backdrop / day",
    image: "",
    available: true,
    featured: true,
  },
  {
    id: "11",
    name: "Popcorn & Cotton Candy Machines",
    category: "Food & Fun",
    description:
      "Commercial-grade popcorn and cotton candy machines with supplies for up to 200 servings.",
    price: 85,
    priceUnit: "per machine / day",
    image: "",
    available: true,
  },
  {
    id: "12",
    name: "Chocolate Fountains",
    category: "Food & Fun",
    description:
      "Premium 3-tier stainless steel chocolate fountain. Includes 10 lbs of Belgian chocolate.",
    price: 95,
    priceUnit: "per unit / day",
    image: "",
    available: true,
  },
  {
    id: "13",
    name: "Smoke & Bubble Machines",
    category: "Decor & Effects",
    description:
      "Professional-grade fog and bubble machines for dramatic event entrances and dance floors.",
    price: 60,
    priceUnit: "per unit / day",
    image: "",
    available: true,
  },
  {
    id: "14",
    name: "String & LED Fairy Lights",
    category: "Decor & Effects",
    description:
      "Warm white LED fairy lights - 100ft strands with dimmable controls. Transform any venue into a magical space.",
    price: 20,
    priceUnit: "per strand / day",
    image: "",
    available: true,
    featured: true,
  },
];

const state = {
  route: getCurrentRoute(),
  navOpen: false,
  selectedCategory: "All",
  searchQuery: "",
  selectedProductId: null,
  adminAuthenticated: false,
  adminPassword: "",
  editingProductId: null,
  adminFormOpen: false,
  adminForm: getEmptyForm(),
  toastTimer: null,
};

function getEmptyForm() {
  return {
    name: "",
    category: "Furniture",
    description: "",
    price: 0,
    priceUnit: "per unit / day",
    image: "",
    available: true,
  };
}

function normalizeRoute(route) {
  if (VALID_ROUTES.has(route)) {
    return route;
  }
  return "/404";
}

function getRouteHref(route) {
  const normalized = normalizeRoute(route);
  return normalized === "/" ? "#/" : `#${normalized}`;
}

function getCurrentRoute() {
  const hashRoute = window.location.hash.replace(/^#/, "");

  if (hashRoute) {
    return normalizeRoute(hashRoute);
  }

  const pathname = window.location.pathname;

  if (pathname.endsWith("/products")) {
    return "/products";
  }

  if (pathname.endsWith("/admin")) {
    return "/admin";
  }

  return "/";
}

function getProducts() {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse saved products", error);
    }
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  return structuredClone(defaultProducts);
}

function saveProducts(products) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function addProduct(product) {
  const products = getProducts();
  const created = { ...product, id: Date.now().toString() };
  products.push(created);
  saveProducts(products);
  return created;
}

function updateProduct(id, updates) {
  const products = getProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
}

function deleteProduct(id) {
  saveProducts(getProducts().filter((product) => product.id !== id));
}

function getProductImage(id, customImage) {
  if (customImage) {
    return customImage;
  }

  return productImageMap[id] || productImageMap["1"];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isActiveRoute(route) {
  return state.route === route ? "is-active" : "";
}

function getFeaturedProducts() {
  return getProducts()
    .filter((product) => product.featured)
    .slice(0, 6);
}

function getFilteredProducts() {
  const query = state.searchQuery.trim().toLowerCase();

  return getProducts().filter((product) => {
    const matchesCategory =
      state.selectedCategory === "All" || product.category === state.selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

function getSelectedProduct() {
  if (!state.selectedProductId) {
    return null;
  }

  return getProducts().find((product) => product.id === state.selectedProductId) || null;
}

function getEditingProduct() {
  if (!state.editingProductId) {
    return null;
  }

  return getProducts().find((product) => product.id === state.editingProductId) || null;
}

function showToast(message, variant = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast--${variant}`;
  toast.textContent = message;

  const host = document.querySelector("[data-toast-root]");
  host.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  if (state.toastTimer) {
    window.clearTimeout(state.toastTimer);
  }

  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 220);
  }, 2400);
}

function navigateTo(route) {
  const nextRoute = normalizeRoute(route);

  if (getCurrentRoute() !== nextRoute) {
    window.location.hash = getRouteHref(nextRoute);
    return;
  }

  state.route = nextRoute;
  state.navOpen = false;
  if (nextRoute !== "/products") {
    state.searchQuery = "";
    state.selectedCategory = "All";
  }
  renderApp();
}

function handleDocumentClick(event) {
  const target = event.target;
  const routeLink = target.closest("[data-route]");

  if (routeLink) {
    event.preventDefault();
    navigateTo(routeLink.getAttribute("data-route"));
    return;
  }

  const productTrigger = target.closest("[data-product-open]");
  if (productTrigger) {
    state.selectedProductId = productTrigger.getAttribute("data-product-open");
    renderApp();
    return;
  }

  const modalClose = target.closest("[data-modal-close]");
  if (modalClose || target.matches(".modal.is-open")) {
    state.selectedProductId = null;
    if (!modalClose || modalClose.getAttribute("data-modal-close") === "product") {
      renderApp();
      return;
    }
  }

  const categoryButton = target.closest("[data-category]");
  if (categoryButton) {
    state.selectedCategory = categoryButton.getAttribute("data-category");
    renderApp();
    return;
  }

  const navToggle = target.closest("[data-nav-toggle]");
  if (navToggle) {
    state.navOpen = !state.navOpen;
    renderApp();
    return;
  }

  const adminAdd = target.closest("[data-admin-add]");
  if (adminAdd) {
    state.adminFormOpen = true;
    state.editingProductId = null;
    state.adminForm = getEmptyForm();
    renderApp();
    return;
  }

  const adminEdit = target.closest("[data-admin-edit]");
  if (adminEdit) {
    const product = getProducts().find(
      (entry) => entry.id === adminEdit.getAttribute("data-admin-edit"),
    );

    if (product) {
      state.editingProductId = product.id;
      state.adminForm = {
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        priceUnit: product.priceUnit,
        image: product.image,
        available: product.available,
      };
      state.adminFormOpen = true;
      renderApp();
    }
    return;
  }

  const adminDelete = target.closest("[data-admin-delete]");
  if (adminDelete) {
    deleteProduct(adminDelete.getAttribute("data-admin-delete"));
    showToast("Product deleted");

    if (state.selectedProductId === adminDelete.getAttribute("data-admin-delete")) {
      state.selectedProductId = null;
    }

    renderApp();
    return;
  }

  const adminImageRemove = target.closest("[data-admin-image-remove]");
  if (adminImageRemove) {
    state.adminForm = {
      ...state.adminForm,
      image: "",
    };
    renderApp();
    return;
  }

  const adminModalClose = target.closest("[data-admin-modal-close]");
  if (adminModalClose || target.matches(".modal.is-open[data-admin-dialog]")) {
    state.adminFormOpen = false;
    state.editingProductId = null;
    state.adminForm = getEmptyForm();
    renderApp();
  }
}

function handleDocumentInput(event) {
  const target = event.target;

  if (target.matches("[data-product-search]")) {
    state.searchQuery = target.value;
    renderApp();
    return;
  }

  if (target.matches("[data-admin-password]")) {
    state.adminPassword = target.value;
    return;
  }

  if (target.matches("[data-admin-field]")) {
    const field = target.getAttribute("data-admin-field");
    state.adminForm = {
      ...state.adminForm,
      [field]: target.type === "checkbox" ? target.checked : target.value,
    };
    return;
  }

  if (target.matches("[data-admin-image-input]")) {
    const file = target.files && target.files[0];
    if (!file) {
      return;
    }

    readFileAsDataUrl(file)
      .then((dataUrl) => {
        state.adminForm = {
          ...state.adminForm,
          image: dataUrl,
        };
        renderApp();
      })
      .catch((error) => {
        console.error("Failed to read selected image", error);
        showToast("Could not load that image", "error");
      });
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function handleDocumentSubmit(event) {
  const target = event.target;

  if (target.matches("[data-admin-login-form]")) {
    event.preventDefault();

    if (state.adminPassword === ADMIN_PASSWORD) {
      state.adminAuthenticated = true;
      state.adminPassword = "";
      showToast("Welcome, Admin!");
      renderApp();
    } else {
      showToast("Incorrect password", "error");
    }
    return;
  }

  if (target.matches("[data-admin-product-form]")) {
    event.preventDefault();

    if (!state.adminForm.name.trim()) {
      showToast("Name is required", "error");
      return;
    }

    const payload = {
      ...state.adminForm,
      price: Number(state.adminForm.price) || 0,
    };

    if (state.editingProductId) {
      updateProduct(state.editingProductId, payload);
      showToast("Product updated");
    } else {
      addProduct(payload);
      showToast("Product added");
    }

    state.adminFormOpen = false;
    state.editingProductId = null;
    state.adminForm = getEmptyForm();
    renderApp();
  }
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    if (state.selectedProductId) {
      state.selectedProductId = null;
      renderApp();
      return;
    }

    if (state.adminFormOpen) {
      state.adminFormOpen = false;
      state.editingProductId = null;
      state.adminForm = getEmptyForm();
      renderApp();
    }
  }
}

function getNavbar() {
  return `
    <nav class="navbar">
      <div class="container nav-shell">
        <a href="${getRouteHref("/")}" data-route="/" class="brand">Event<span>Luxe</span></a>
        <div class="nav-links nav-links--desktop">
          <a href="${getRouteHref("/")}" data-route="/" class="nav-link ${isActiveRoute("/")}">Home</a>
          <a href="${getRouteHref("/products")}" data-route="/products" class="nav-link ${isActiveRoute("/products")}">Products</a>
          <a href="${getRouteHref("/admin")}" data-route="/admin" class="nav-link ${isActiveRoute("/admin")}">Admin</a>
        </div>
        <button class="menu-button" type="button" data-nav-toggle aria-label="Toggle menu">
          ${state.navOpen ? "Close" : "Menu"}
        </button>
      </div>
      <div class="nav-links nav-links--mobile ${state.navOpen ? "is-open" : ""}">
        <a href="${getRouteHref("/")}" data-route="/" class="nav-link ${isActiveRoute("/")}">Home</a>
        <a href="${getRouteHref("/products")}" data-route="/products" class="nav-link ${isActiveRoute("/products")}">Products</a>
        <a href="${getRouteHref("/admin")}" data-route="/admin" class="nav-link ${isActiveRoute("/admin")}">Admin</a>
      </div>
    </nav>
  `;
}

function getFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <h3 class="footer-brand">Event<span>Luxe</span></h3>
          <p class="footer-copy">Premium event rental equipment for unforgettable occasions.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div class="footer-links">
            <a href="${getRouteHref("/")}" data-route="/">Home</a>
            <a href="${getRouteHref("/products")}" data-route="/products">Products</a>
            <a href="${getRouteHref("/admin")}" data-route="/admin">Admin</a>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <p>info@eventluxe.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
      <div class="container footer-bottom">© 2026 EventLuxe. All rights reserved.</div>
    </footer>
  `;
}

function getProductCard(product) {
  return `
    <article class="product-card" data-product-open="${product.id}">
      <div class="product-card__media">
        <img src="${escapeHtml(getProductImage(product.id, product.image))}" alt="${escapeHtml(product.name)}" loading="lazy">
      </div>
      <div class="product-card__body">
        <div class="product-card__header">
          <h3>${escapeHtml(product.name)}</h3>
          ${product.available ? "" : '<span class="badge badge--muted">Unavailable</span>'}
        </div>
        <p>${escapeHtml(product.description)}</p>
        <div class="product-card__price">
          <strong>$${escapeHtml(product.price)}</strong>
          <span>/ ${escapeHtml(product.priceUnit)}</span>
        </div>
      </div>
    </article>
  `;
}

function getProductModal() {
  const product = getSelectedProduct();

  if (!product) {
    return "";
  }

  return `
    <div class="modal is-open" data-modal-root>
      <div class="modal__panel modal__panel--product">
        <button class="modal__close" type="button" data-modal-close="product" aria-label="Close">×</button>
        <div class="modal__media">
          <img src="${escapeHtml(getProductImage(product.id, product.image))}" alt="${escapeHtml(product.name)}">
        </div>
        <div class="modal__body">
          <div class="eyebrow-row">
            <span class="badge badge--outline">${escapeHtml(product.category)}</span>
            <span class="availability ${product.available ? "is-available" : "is-unavailable"}">
              ${product.available ? "Available" : "Unavailable"}
            </span>
          </div>
          <h2>${escapeHtml(product.name)}</h2>
          <p class="modal__description">${escapeHtml(product.description)}</p>
          <div class="modal__price">
            <strong>$${escapeHtml(product.price)}</strong>
            <span>/ ${escapeHtml(product.priceUnit)}</span>
          </div>
          <a class="button button--dark button--full" href="mailto:info@eventluxe.com?subject=${encodeURIComponent(`Rental inquiry for ${product.name}`)}">
            Inquire to Rent
          </a>
        </div>
      </div>
    </div>
  `;
}

function getAdminModal() {
  if (!state.adminFormOpen) {
    return "";
  }

  const title = state.editingProductId ? "Edit Product" : "Add Product";

  return `
    <div class="modal is-open" data-admin-dialog>
      <div class="modal__panel">
        <button class="modal__close" type="button" data-admin-modal-close aria-label="Close">×</button>
        <div class="modal__body">
          <h2>${title}</h2>
          <form class="admin-form" data-admin-product-form>
            <label>
              <span>Name</span>
              <input type="text" data-admin-field="name" value="${escapeHtml(state.adminForm.name)}">
            </label>
            <label>
              <span>Category</span>
              <select data-admin-field="category">
                ${categories
                  .filter((category) => category !== "All")
                  .map(
                    (category) => `
                      <option value="${escapeHtml(category)}" ${
                        state.adminForm.category === category ? "selected" : ""
                      }>${escapeHtml(category)}</option>
                    `,
                  )
                  .join("")}
              </select>
            </label>
            <label>
              <span>Description</span>
              <textarea rows="4" data-admin-field="description">${escapeHtml(state.adminForm.description)}</textarea>
            </label>
            <div class="admin-form__split">
              <label>
                <span>Price ($)</span>
                <input type="number" min="0" step="1" data-admin-field="price" value="${escapeHtml(state.adminForm.price)}">
              </label>
              <label>
                <span>Price Unit</span>
                <input type="text" data-admin-field="priceUnit" value="${escapeHtml(state.adminForm.priceUnit)}">
              </label>
            </div>
            <label>
              <span>Product Image (optional)</span>
              <div class="admin-image-picker">
                ${
                  state.adminForm.image
                    ? `
                      <div class="admin-image-preview">
                        <img src="${escapeHtml(state.adminForm.image)}" alt="Selected product image">
                        <button type="button" class="admin-image-remove" data-admin-image-remove aria-label="Remove image">Remove</button>
                      </div>
                    `
                    : ""
                }
                <label class="admin-image-upload-button">
                  <span>${state.adminForm.image ? "Change image" : "Choose from gallery"}</span>
                  <input type="file" accept="image/*" data-admin-image-input hidden>
                </label>
              </div>
            </label>
            <label class="toggle-row">
              <input type="checkbox" data-admin-field="available" ${state.adminForm.available ? "checked" : ""}>
              <span>Available for rent</span>
            </label>
            <button class="button button--dark button--full" type="submit">${title}</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function getHomePage() {
  const features = [
    {
      title: "Premium Quality",
      description: "Curated, well-maintained equipment for flawless events.",
    },
    {
      title: "Delivery & Setup",
      description: "We deliver and set up everything at your venue.",
    },
    {
      title: "24/7 Support",
      description: "Dedicated event support whenever you need us.",
    },
  ];

  return `
    <section class="hero">
      <div class="hero__media">
        <img src="${heroImage}" alt="Elegant event setup">
      </div>
      <div class="container hero__content">
        <div class="hero__copy reveal">
          <p class="hero__kicker">Premium Event Rentals</p>
          <h1>Make Every Event <span>Unforgettable.</span></h1>
          <p class="hero__description">
            Premium rental equipment for weddings, galas, corporate events, and celebrations. Curated quality, delivered to your venue.
          </p>
          <div class="hero__actions">
            <a href="${getRouteHref("/products")}" data-route="/products" class="button">Browse Collection</a>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--soft">
      <div class="container feature-grid">
        ${features
          .map(
            (feature) => `
              <article class="feature-card reveal">
                <div class="feature-card__icon">${feature.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}</div>
                <h3>${escapeHtml(feature.title)}</h3>
                <p>${escapeHtml(feature.description)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="section-heading__eyebrow">Featured Inventory</p>
            <h2>Featured Rentals</h2>
            <p>Our most popular event essentials.</p>
          </div>
          <a href="${getRouteHref("/products")}" data-route="/products" class="section-link">View all</a>
        </div>
        <div class="product-grid">
          ${getFeaturedProducts()
            .map((product) => getProductCard(product))
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function getProductsPage() {
  const products = getFilteredProducts();

  return `
    <section class="section section--compact">
      <div class="container">
        <div class="section-heading section-heading--stacked">
          <div>
            <p class="section-heading__eyebrow">Catalog</p>
            <h1>Our Collection</h1>
            <p>Everything you need for a spectacular event.</p>
          </div>
        </div>
        <div class="toolbar">
          <div class="pill-group">
            ${categories
              .map(
                (category) => `
                  <button
                    type="button"
                    class="pill ${state.selectedCategory === category ? "is-selected" : ""}"
                    data-category="${escapeHtml(category)}"
                  >
                    ${escapeHtml(category)}
                  </button>
                `,
              )
              .join("")}
          </div>
          <label class="search">
            <span>Search</span>
            <input type="search" placeholder="Search products..." value="${escapeHtml(state.searchQuery)}" data-product-search>
          </label>
        </div>
        ${
          products.length
            ? `<div class="product-grid">${products.map((product) => getProductCard(product)).join("")}</div>`
            : '<div class="empty-state">No products found.</div>'
        }
      </div>
    </section>
  `;
}

function getAdminPage() {
  if (!state.adminAuthenticated) {
    return `
      <section class="section section--centered">
        <div class="auth-card reveal">
          <div class="auth-card__badge">Admin</div>
          <h1>Admin Access</h1>
          <p>Enter password to continue</p>
          <form class="auth-card__form" data-admin-login-form>
            <input type="password" placeholder="Password" value="${escapeHtml(state.adminPassword)}" data-admin-password>
            <button class="button button--dark button--full" type="submit">Sign In</button>
          </form>
          <small>Demo password: admin123</small>
        </div>
      </section>
    `;
  }

  const products = getProducts();

  return `
    <section class="section section--compact">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="section-heading__eyebrow">Admin Console</p>
            <h1>Product Management</h1>
            <p>${products.length} products total</p>
          </div>
          <button type="button" class="button button--dark" data-admin-add>Add Product</button>
        </div>
        <div class="admin-list admin-list--mobile">
          ${products
            .map(
              (product) => `
                <article class="admin-card">
                  <div class="admin-card__meta">
                    <img src="${escapeHtml(getProductImage(product.id, product.image))}" alt="${escapeHtml(product.name)}">
                    <div>
                      <h3>${escapeHtml(product.name)}</h3>
                      <p>${escapeHtml(product.category)}</p>
                    </div>
                  </div>
                  <div class="admin-card__side">
                    <strong>$${escapeHtml(product.price)}</strong>
                    <span class="${product.available ? "status-ok" : "status-bad"}">${product.available ? "Available" : "Unavailable"}</span>
                  </div>
                  <div class="admin-card__actions">
                    <button type="button" data-admin-edit="${product.id}">Edit</button>
                    <button type="button" class="danger" data-admin-delete="${product.id}">Delete</button>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
        <div class="admin-table-shell">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${products
                .map(
                  (product) => `
                    <tr>
                      <td>
                        <div class="admin-product">
                          <img src="${escapeHtml(getProductImage(product.id, product.image))}" alt="${escapeHtml(product.name)}">
                          <span>${escapeHtml(product.name)}</span>
                        </div>
                      </td>
                      <td>${escapeHtml(product.category)}</td>
                      <td>$${escapeHtml(product.price)}</td>
                      <td><span class="${product.available ? "status-pill status-ok" : "status-pill status-bad"}">${product.available ? "Available" : "Unavailable"}</span></td>
                      <td class="admin-table__actions">
                        <button type="button" data-admin-edit="${product.id}">Edit</button>
                        <button type="button" class="danger" data-admin-delete="${product.id}">Delete</button>
                      </td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function getNotFoundPage() {
  return `
    <section class="section section--centered">
      <div class="not-found">
        <p class="section-heading__eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The route you requested does not exist.</p>
        <a href="${getRouteHref("/")}" data-route="/" class="button">Return Home</a>
      </div>
    </section>
  `;
}

function getPageMarkup() {
  switch (state.route) {
    case "/":
      return getHomePage();
    case "/products":
      return getProductsPage();
    case "/admin":
      return getAdminPage();
    default:
      return getNotFoundPage();
  }
}

function renderApp() {
  root.innerHTML = `
    <div class="site-shell">
      ${getNavbar()}
      <main class="main-content">${getPageMarkup()}</main>
      ${getFooter()}
      ${getProductModal()}
      ${getAdminModal()}
      <div class="toast-root" data-toast-root></div>
    </div>
  `;

  document.body.classList.toggle("has-modal", Boolean(state.selectedProductId || state.adminFormOpen));
}

window.addEventListener("hashchange", () => {
  state.route = getCurrentRoute();
  state.navOpen = false;
  renderApp();
});

document.addEventListener("click", handleDocumentClick);
document.addEventListener("input", handleDocumentInput);
document.addEventListener("submit", handleDocumentSubmit);
document.addEventListener("keydown", handleKeydown);

renderApp();