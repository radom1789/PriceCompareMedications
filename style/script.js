(function () {
const medicationService = window.medicationDataService;
const medications = medicationService.getMedications();

function displayStoreName(name) {
  return medicationService.defaultStoreDisplayName(name);
}

function softHyphenateWord(word) {
  if (word.length < 10 || /[\d-]/.test(word)) return word;
  return word.replace(/(.{8})(?=.{4,})/g, "$1&shy;");
}

function softHyphenateText(text) {
  return text
    .split(/(\s+)/)
    .map((part) => (/^\s+$/.test(part) ? part : softHyphenateWord(part)))
    .join("");
}

const products = medicationService.expandMedicationOffers(medications, {
  city: "Pittsburgh",
  state: "PA",
  zip: "15213",
  getStoreDisplayName: displayStoreName,
});

const grid = document.getElementById("product-grid");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");
const resultsMeta = document.getElementById("results-meta");
const searchInput = document.getElementById("search-input");
const stateFilter = document.getElementById("state-filter");
const cityFilterGroup = document.getElementById("city-filter-group");
const cityFilter = document.getElementById("city-filter");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const storeFilterList = document.getElementById("store-filter-list");
const clearStoresButton = document.getElementById("clear-stores");
const clearAllFiltersButton = document.getElementById("clear-all-filters");
const paginationBar = document.getElementById("pagination-bar");
const paginationPrev = document.getElementById("pagination-prev");
const paginationNext = document.getElementById("pagination-next");
const paginationPages = document.getElementById("pagination-pages");
const paginationLoader = document.getElementById("pagination-loader");
const locationBadge = document.getElementById("location-badge");

const selectedStores = new Set();
const pageSize = 30;
let currentPage = 1;
let hasUserInteractedWithState = false;
let isPaginationLoading = false;
let paginationTransitionToken = 0;

const geotagReferenceCities = [
  { state: "CA", city: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { state: "CA", city: "San Diego", latitude: 32.7157, longitude: -117.1611 },
  { state: "CA", city: "San Jose", latitude: 37.3382, longitude: -121.8863 },
  { state: "TX", city: "Houston", latitude: 29.7604, longitude: -95.3698 },
  { state: "TX", city: "San Antonio", latitude: 29.4241, longitude: -98.4936 },
  { state: "TX", city: "Dallas", latitude: 32.7767, longitude: -96.7970 },
  { state: "FL", city: "Jacksonville", latitude: 30.3322, longitude: -81.6557 },
  { state: "FL", city: "Miami", latitude: 25.7617, longitude: -80.1918 },
  { state: "FL", city: "Tampa", latitude: 27.9506, longitude: -82.4572 },
  { state: "NY", city: "New York", latitude: 40.7128, longitude: -74.0060 },
  { state: "NY", city: "Buffalo", latitude: 42.8864, longitude: -78.8784 },
  { state: "NY", city: "Rochester", latitude: 43.1566, longitude: -77.6088 },
  { state: "PA", city: "Philadelphia", latitude: 39.9526, longitude: -75.1652 },
  { state: "PA", city: "Pittsburgh", latitude: 40.4406, longitude: -79.9959 },
  { state: "PA", city: "Allentown", latitude: 40.6023, longitude: -75.4714 },
  { state: "IL", city: "Chicago", latitude: 41.8781, longitude: -87.6298 },
  { state: "IL", city: "Aurora", latitude: 41.7606, longitude: -88.3201 },
  { state: "IL", city: "Naperville", latitude: 41.7508, longitude: -88.1535 },
  { state: "OH", city: "Columbus", latitude: 39.9612, longitude: -82.9988 },
  { state: "OH", city: "Cleveland", latitude: 41.4993, longitude: -81.6944 },
  { state: "OH", city: "Cincinnati", latitude: 39.1031, longitude: -84.5120 },
  { state: "GA", city: "Atlanta", latitude: 33.7490, longitude: -84.3880 },
  { state: "GA", city: "Augusta", latitude: 33.4735, longitude: -82.0105 },
  { state: "GA", city: "Columbus", latitude: 32.4609, longitude: -84.9877 },
  { state: "NC", city: "Charlotte", latitude: 35.2271, longitude: -80.8431 },
  { state: "NC", city: "Raleigh", latitude: 35.7796, longitude: -78.6382 },
  { state: "NC", city: "Greensboro", latitude: 36.0726, longitude: -79.7920 },
  { state: "MI", city: "Detroit", latitude: 42.3314, longitude: -83.0458 },
  { state: "MI", city: "Grand Rapids", latitude: 42.9634, longitude: -85.6681 },
  { state: "MI", city: "Warren", latitude: 42.5145, longitude: -83.0147 },
  { state: "NJ", city: "Newark", latitude: 40.7357, longitude: -74.1724 },
  { state: "NJ", city: "Jersey City", latitude: 40.7178, longitude: -74.0431 },
  { state: "NJ", city: "Paterson", latitude: 40.9168, longitude: -74.1718 },
  { state: "VA", city: "Virginia Beach", latitude: 36.8529, longitude: -75.9780 },
  { state: "VA", city: "Chesapeake", latitude: 36.7682, longitude: -76.2875 },
  { state: "VA", city: "Norfolk", latitude: 36.8508, longitude: -76.2859 },
  { state: "WA", city: "Seattle", latitude: 47.6062, longitude: -122.3321 },
  { state: "WA", city: "Spokane", latitude: 47.6588, longitude: -117.4260 },
  { state: "WA", city: "Tacoma", latitude: 47.2529, longitude: -122.4443 },
  { state: "AZ", city: "Phoenix", latitude: 33.4484, longitude: -112.0740 },
  { state: "AZ", city: "Tucson", latitude: 32.2226, longitude: -110.9747 },
  { state: "AZ", city: "Mesa", latitude: 33.4152, longitude: -111.8315 },
  { state: "MA", city: "Boston", latitude: 42.3601, longitude: -71.0589 },
  { state: "MA", city: "Worcester", latitude: 42.2626, longitude: -71.8023 },
  { state: "MA", city: "Springfield", latitude: 42.1015, longitude: -72.5898 },
];

function uniqueValues(field) {
  return [...new Set(products.map((product) => product[field]))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function getUnitCount(quantity) {
  const match = quantity.match(/\d+/);
  return match ? Number(match[0]) : null;
}

function formatPriceParts(price) {
  const [dollars, cents] = price.toFixed(2).split(".");
  return { dollars, cents };
}

function formatUnitPrice(price, quantity) {
  const count = getUnitCount(quantity);
  if (!count) return null;
  return (price / count).toFixed(2);
}

function splitProductName(name) {
  const match = name.match(/^(.*?)(\s+\d+\s*(?:mg|mcg|iu)(?:\s*[a-zA-Z]*)?)$/i);
  if (!match) {
    return { title: name, strength: "" };
  }

  const rawStrength = match[2].trim();
  const formattedStrength = rawStrength
    .replace(/\bmg\b/gi, "mg")
    .replace(/\bmcg\b/gi, "mcg")
    .replace(/\biu\b/gi, "IU");

  return {
    title: match[1].trim(),
    strength: formattedStrength,
  };
}

function slugifyProductName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugifyLabel(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProductImagePath(name) {
  return `assets/medications/${slugifyProductName(name)}.png`;
}

function buildDetailsUrl(product) {
  const params = new URLSearchParams({
    slug: product.slug,
    store: product.storeKey,
    city: product.city,
    state: product.state,
    zip: product.zip,
  });
  return `product-details.html?${params.toString()}`;
}

function populateStateOptions() {
  uniqueValues("state").forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateFilter.appendChild(option);
  });
}

function updateLocationBadge(state) {
  locationBadge.textContent = state && state !== "all" ? state : "All states";
}

function degreesToRadians(value) {
  return (value * Math.PI) / 180;
}

function calculateDistanceMiles(fromLatitude, fromLongitude, toLatitude, toLongitude) {
  const earthRadiusMiles = 3958.8;
  const latitudeDelta = degreesToRadians(toLatitude - fromLatitude);
  const longitudeDelta = degreesToRadians(toLongitude - fromLongitude);
  const fromLatitudeRadians = degreesToRadians(fromLatitude);
  const toLatitudeRadians = degreesToRadians(toLatitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitudeRadians) *
      Math.cos(toLatitudeRadians) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

function findNearestSupportedState(latitude, longitude) {
  let closestMatch = null;

  geotagReferenceCities.forEach((entry) => {
    const distance = calculateDistanceMiles(
      latitude,
      longitude,
      entry.latitude,
      entry.longitude
    );

    if (!closestMatch || distance < closestMatch.distance) {
      closestMatch = { state: entry.state, distance };
    }
  });

  return closestMatch ? closestMatch.state : null;
}

function applyDetectedState(state) {
  if (!state || hasUserInteractedWithState || ![...stateFilter.options].some((option) => option.value === state)) {
    updateLocationBadge(stateFilter.value);
    return;
  }

  stateFilter.value = state;
  populateCityOptions(state);
  cityFilter.value = "all";
  updateLocationBadge(state);
  resetToFirstPageAndRender();
}

function attemptAutoDetectState() {
  if (!navigator.geolocation) {
    updateLocationBadge("all");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const detectedState = findNearestSupportedState(
        position.coords.latitude,
        position.coords.longitude
      );
      applyDetectedState(detectedState);
    },
    () => {
      updateLocationBadge("all");
    },
    {
      enableHighAccuracy: false,
      timeout: 6000,
      maximumAge: 300000,
    }
  );
}

function populateCityOptions(selectedState) {
  cityFilter.innerHTML = '<option value="all">All cities</option>';

  if (selectedState === "all") {
    cityFilter.disabled = true;
    cityFilterGroup.classList.add("is-hidden");
    return;
  }

  const cities = [
    ...new Set(
      products
        .filter((product) => product.state === selectedState)
        .map((product) => product.city)
    ),
  ].sort((a, b) => a.localeCompare(b));

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });

  cityFilter.disabled = false;
  cityFilterGroup.classList.remove("is-hidden");
}

function populateCategoryOptions() {
  uniqueValues("category").forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function populateStoreFilters() {
  uniqueValues("pharmacy").forEach((store) => {
    const label = document.createElement("label");
    label.className = "store-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = store;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedStores.add(store);
      } else {
        selectedStores.delete(store);
      }
      render();
    });

    const text = document.createElement("span");
    text.textContent = displayStoreName(store);

    label.appendChild(checkbox);
    label.appendChild(text);
    storeFilterList.appendChild(label);
  });
}

function matchesPriceBand(price, band) {
  if (band === "under-10") return price < 10;
  if (band === "10-15") return price >= 10 && price < 15;
  if (band === "15-20") return price >= 15 && price < 20;
  if (band === "20-plus") return price >= 20;
  return true;
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedState = stateFilter.value;
  const selectedCity = cityFilter.value;
  const selectedCategory = categoryFilter.value;
  const selectedPriceBand = priceFilter.value;

  return products.filter((product) => {
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.purpose.toLowerCase().includes(query) ||
      product.city.toLowerCase().includes(query);

    const matchesState =
      selectedState === "all" || product.state === selectedState;

    const matchesCity =
      selectedState === "all" || selectedCity === "all" || product.city === selectedCity;

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesStore =
      selectedStores.size === 0 || selectedStores.has(product.pharmacy);

    const matchesPrice = matchesPriceBand(product.price, selectedPriceBand);

    return (
      matchesQuery &&
      matchesState &&
      matchesCity &&
      matchesCategory &&
      matchesStore &&
      matchesPrice
    );
  });
}

function paginateProducts(products) {
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  currentPage = Math.min(currentPage, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  return {
    totalPages,
    visibleProducts: products.slice(startIndex, startIndex + pageSize),
  };
}

function renderCards(filtered) {
  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  const sorted = [...filtered].sort((left, right) => {
    if (left.name === right.name) {
      return left.price - right.price;
    }
    return left.name.localeCompare(right.name);
  });

  const { visibleProducts } = paginateProducts(sorted);

  visibleProducts.forEach((product, index) => {
    const priceParts = formatPriceParts(product.price);
    const unitPrice = formatUnitPrice(product.price, product.quantity);
    const nameParts = splitProductName(product.name);
    const detailsUrl = buildDetailsUrl(product);
    const displayDrugTitle = softHyphenateText(nameParts.title);
    const displayStoreTitle = softHyphenateText(product.displayPharmacy);
    const displayPurpose = softHyphenateText(product.purpose);

    const card = document.createElement("article");
    card.className = "product-card";
    card.style.animationDelay = index * 0.04 + "s";
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.setAttribute(
      "aria-label",
      `View details for ${product.name} at ${product.displayPharmacy} in ${product.city}, ${product.state}`
    );

    card.innerHTML = `
      <div class="store-banner category-${slugifyLabel(product.category)}">
        <span class="store-banner-category">${product.category}</span>
        <div class="product-image-stage">
          <div class="product-image-link" aria-hidden="true">
            <img
              class="product-image"
              src="${product.image || getProductImagePath(product.name)}"
              alt="${product.name} demo product image"
              loading="lazy"
              onerror="this.onerror=null;this.src='assets/medications/placeholder.png';"
            />
          </div>
        </div>
        <span class="store-banner-name">${displayDrugTitle}</span>
        <span class="store-banner-quantity">${product.quantity}${nameParts.strength ? ` · ${nameParts.strength}` : ""}</span>
      </div>

      <div class="product-content-row">
        <div class="product-copy">
          <div class="card-price-row">
            <div>
              <div class="price-block">
                <div class="price-tag" aria-label="${formatPrice(product.price)}">
                  <span class="price-symbol">$</span>
                  <span class="price-dollars">${priceParts.dollars}</span>
                  <span class="price-cents">${priceParts.cents}</span>
                </div>
                ${
                  unitPrice
                    ? `<div class="unit-price">($${unitPrice}/count)</div>`
                    : ""
                }
              </div>

              <div class="compare-hint${product.comparisonLabel ? "" : " compare-hint-placeholder"}">
                ${product.comparisonLabel || "&nbsp;"}
              </div>
            </div>
          </div>

          <h3 class="product-title">${displayStoreTitle}</h3>

          <p class="product-purpose">${displayPurpose}</p>
        </div>
      </div>

      <div class="product-card-actions">
        <span class="details-button">View details</span>
      </div>

      <div class="location-banner">
        <span>${product.city}, ${product.state}</span>
        <small>ZIP ${product.zip}</small>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = detailsUrl;
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.href = detailsUrl;
      }
    });

    grid.appendChild(card);
  });
}

function renderResultsMeta(filtered) {
  const stores = new Set(filtered.map((product) => product.pharmacy)).size;
  const locations = new Set(filtered.map((product) => `${product.city}, ${product.state}`)).size;

  resultsCount.textContent = `Showing ${filtered.length} offer${filtered.length !== 1 ? "s" : ""}`;
  resultsMeta.textContent = `Across ${stores} store${stores !== 1 ? "s" : ""} and ${locations} location${locations !== 1 ? "s" : ""}`;
}

function renderPagination(filtered) {
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  if (filtered.length === 0 || totalPages === 1) {
    paginationBar.style.display = "none";
    paginationPages.innerHTML = "";
    return;
  }

  paginationBar.style.display = "flex";
  paginationPrev.disabled = isPaginationLoading || currentPage === 1;
  paginationNext.disabled = isPaginationLoading || currentPage === totalPages;
  paginationPages.innerHTML = "";

  const pageItems = [currentPage];

  for (let pageNumber = currentPage + 1; pageNumber <= Math.min(totalPages, currentPage + 2); pageNumber += 1) {
    pageItems.push(pageNumber);
  }

  const shouldShowEllipsis = totalPages > pageItems[pageItems.length - 1] + 1;
  const shouldShowLastPage = totalPages > currentPage + 2;

  pageItems.forEach((pageNumber) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pagination-page${pageNumber === currentPage ? " is-active" : ""}`;
    button.textContent = String(pageNumber);
    button.disabled = isPaginationLoading || pageNumber === currentPage;
    button.addEventListener("click", () => {
      runPaginationTransition(pageNumber);
    });
    paginationPages.appendChild(button);
  });

  if (shouldShowEllipsis) {
    const ellipsis = document.createElement("span");
    ellipsis.className = "pagination-ellipsis";
    ellipsis.textContent = "...";
    paginationPages.appendChild(ellipsis);
  }

  if (shouldShowLastPage) {
    const lastPageButton = document.createElement("button");
    lastPageButton.type = "button";
    lastPageButton.className = "pagination-page";
    lastPageButton.textContent = String(totalPages);
    lastPageButton.disabled = isPaginationLoading;
    lastPageButton.addEventListener("click", () => {
      runPaginationTransition(totalPages);
    });
    paginationPages.appendChild(lastPageButton);
  }
}

function setPaginationLoading(nextValue) {
  isPaginationLoading = nextValue;
  paginationLoader.classList.toggle("is-visible", nextValue);
  paginationLoader.setAttribute("aria-hidden", nextValue ? "false" : "true");
}

function runPaginationTransition(targetPage) {
  if (
    isPaginationLoading ||
    targetPage === currentPage ||
    targetPage < 1
  ) {
    return;
  }

  paginationTransitionToken += 1;
  const transitionToken = paginationTransitionToken;
  setPaginationLoading(true);
  window.scrollTo({ top: 0, behavior: "smooth" });

  window.setTimeout(() => {
    if (transitionToken !== paginationTransitionToken) return;
    currentPage = targetPage;
    setPaginationLoading(false);
    render();
  }, 280);
}

function clearStoreSelections() {
  selectedStores.clear();
  storeFilterList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function render() {
  const filtered = filterProducts();
  renderResultsMeta(filtered);
  renderCards(filtered);
  renderPagination(filtered);
}

function resetToFirstPageAndRender() {
  currentPage = 1;
  render();
}

searchInput.addEventListener("input", resetToFirstPageAndRender);

stateFilter.addEventListener("change", () => {
  hasUserInteractedWithState = true;
  populateCityOptions(stateFilter.value);
  cityFilter.value = "all";
  updateLocationBadge(stateFilter.value);
  resetToFirstPageAndRender();
});

cityFilter.addEventListener("change", resetToFirstPageAndRender);
categoryFilter.addEventListener("change", resetToFirstPageAndRender);
priceFilter.addEventListener("change", resetToFirstPageAndRender);

clearStoresButton.addEventListener("click", () => {
  clearStoreSelections();
  resetToFirstPageAndRender();
});

clearAllFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  stateFilter.value = "all";
  populateCityOptions("all");
  cityFilter.value = "all";
  categoryFilter.value = "all";
  priceFilter.value = "all";
  clearStoreSelections();
  updateLocationBadge("all");
  resetToFirstPageAndRender();
});

paginationPrev.addEventListener("click", () => {
  if (currentPage === 1) return;
  runPaginationTransition(currentPage - 1);
});

paginationNext.addEventListener("click", () => {
  runPaginationTransition(currentPage + 1);
});

populateStateOptions();
populateCityOptions("all");
populateCategoryOptions();
populateStoreFilters();
updateLocationBadge("all");
render();
attemptAutoDetectState();
})();
