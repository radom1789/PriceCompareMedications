const products = [
  {
    name: "Ibuprofen 200mg",
    quantity: "100 tablets",
    price: 8.49,
    pharmacy: "CVS Pharmacy",
    phClass: "ph-cvs",
    category: "Pain Relief",
    purpose: "Headache and pain relief",
    city: "Pittsburgh",
    state: "PA",
    zip: "15213",
    comparisonLabel: "Best local value",
  },
  {
    name: "Ibuprofen 200mg",
    quantity: "100 tablets",
    price: 9.29,
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Pain Relief",
    purpose: "Headache and pain relief",
    city: "Pittsburgh",
    state: "PA",
    zip: "15222",
    comparisonLabel: null,
  },
  {
    name: "Ibuprofen 200mg",
    quantity: "100 tablets",
    price: 7.99,
    pharmacy: "Target CVS",
    phClass: "ph-target",
    category: "Pain Relief",
    purpose: "Headache and pain relief",
    city: "Philadelphia",
    state: "PA",
    zip: "19103",
    comparisonLabel: "Lowest by city",
  },
  {
    name: "Ibuprofen 200mg",
    quantity: "100 tablets",
    price: 8.79,
    pharmacy: "Walmart Pharmacy",
    phClass: "ph-walmart",
    category: "Pain Relief",
    purpose: "Headache and pain relief",
    city: "Columbus",
    state: "OH",
    zip: "43215",
    comparisonLabel: null,
  },
  {
    name: "Acetaminophen 500mg",
    quantity: "100 caplets",
    price: 7.49,
    pharmacy: "Target CVS",
    phClass: "ph-target",
    category: "Pain Relief",
    purpose: "Fever and pain relief",
    city: "Pittsburgh",
    state: "PA",
    zip: "15237",
    comparisonLabel: "Best local value",
  },
  {
    name: "Acetaminophen 500mg",
    quantity: "100 caplets",
    price: 8.19,
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Pain Relief",
    purpose: "Fever and pain relief",
    city: "Philadelphia",
    state: "PA",
    zip: "19148",
    comparisonLabel: null,
  },
  {
    name: "Acetaminophen 500mg",
    quantity: "100 caplets",
    price: 6.99,
    pharmacy: "Walmart Pharmacy",
    phClass: "ph-walmart",
    category: "Pain Relief",
    purpose: "Fever and pain relief",
    city: "Cleveland",
    state: "OH",
    zip: "44114",
    comparisonLabel: "Lowest by city",
  },
  {
    name: "Loratadine 10mg",
    quantity: "30 tablets",
    price: 11.29,
    pharmacy: "Giant Eagle Pharmacy",
    phClass: "ph-giant-eagle",
    category: "Allergy",
    purpose: "24-hour allergy relief",
    city: "Pittsburgh",
    state: "PA",
    zip: "15206",
    comparisonLabel: "Best value",
  },
  {
    name: "Loratadine 10mg",
    quantity: "30 tablets",
    price: 12.19,
    pharmacy: "CVS Pharmacy",
    phClass: "ph-cvs",
    category: "Allergy",
    purpose: "24-hour allergy relief",
    city: "Philadelphia",
    state: "PA",
    zip: "19107",
    comparisonLabel: null,
  },
  {
    name: "Loratadine 10mg",
    quantity: "30 tablets",
    price: 10.99,
    pharmacy: "Rite Aid",
    phClass: "ph-rite-aid",
    category: "Allergy",
    purpose: "24-hour allergy relief",
    city: "Columbus",
    state: "OH",
    zip: "43219",
    comparisonLabel: "Lowest by city",
  },
  {
    name: "Cetirizine 10mg",
    quantity: "45 tablets",
    price: 13.79,
    pharmacy: "CVS Pharmacy",
    phClass: "ph-cvs",
    category: "Allergy",
    purpose: "Allergy symptom control",
    city: "Pittsburgh",
    state: "PA",
    zip: "15219",
    comparisonLabel: null,
  },
  {
    name: "Cetirizine 10mg",
    quantity: "45 tablets",
    price: 12.99,
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Allergy",
    purpose: "Allergy symptom control",
    city: "Philadelphia",
    state: "PA",
    zip: "19106",
    comparisonLabel: "Best store offer",
  },
  {
    name: "Cetirizine 10mg",
    quantity: "45 tablets",
    price: 13.19,
    pharmacy: "Walmart Pharmacy",
    phClass: "ph-walmart",
    category: "Allergy",
    purpose: "Allergy symptom control",
    city: "Cleveland",
    state: "OH",
    zip: "44113",
    comparisonLabel: null,
  },
  {
    name: "Omeprazole 20mg",
    quantity: "42 capsules",
    price: 12.49,
    pharmacy: "Costco Pharmacy",
    phClass: "ph-costco",
    category: "Digestive Health",
    purpose: "Frequent heartburn relief",
    city: "Pittsburgh",
    state: "PA",
    zip: "15275",
    comparisonLabel: "Best overall price",
  },
  {
    name: "Omeprazole 20mg",
    quantity: "42 capsules",
    price: 17.99,
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Digestive Health",
    purpose: "Frequent heartburn relief",
    city: "Philadelphia",
    state: "PA",
    zip: "19154",
    comparisonLabel: null,
  },
  {
    name: "Omeprazole 20mg",
    quantity: "42 capsules",
    price: 14.59,
    pharmacy: "Target CVS",
    phClass: "ph-target",
    category: "Digestive Health",
    purpose: "Frequent heartburn relief",
    city: "Columbus",
    state: "OH",
    zip: "43212",
    comparisonLabel: null,
  },
  {
    name: "Vitamin D3 2000 IU",
    quantity: "365 softgels",
    price: 16.99,
    pharmacy: "Amazon Pharmacy",
    phClass: "ph-amazon",
    category: "Vitamins & Supplements",
    purpose: "Bone and immune support",
    city: "Pittsburgh",
    state: "PA",
    zip: "15224",
    comparisonLabel: "Best value",
  },
  {
    name: "Vitamin D3 2000 IU",
    quantity: "365 softgels",
    price: 15.99,
    pharmacy: "Walmart Pharmacy",
    phClass: "ph-walmart",
    category: "Vitamins & Supplements",
    purpose: "Bone and immune support",
    city: "Philadelphia",
    state: "PA",
    zip: "19145",
    comparisonLabel: "Lowest by city",
  },
  {
    name: "Vitamin D3 2000 IU",
    quantity: "365 softgels",
    price: 18.29,
    pharmacy: "Giant Eagle Pharmacy",
    phClass: "ph-giant-eagle",
    category: "Vitamins & Supplements",
    purpose: "Bone and immune support",
    city: "Cleveland",
    state: "OH",
    zip: "44109",
    comparisonLabel: null,
  },
  {
    name: "Famotidine 20mg",
    quantity: "50 tablets",
    price: 14.29,
    pharmacy: "CVS Pharmacy",
    phClass: "ph-cvs",
    category: "Digestive Health",
    purpose: "Acid reducer",
    city: "Pittsburgh",
    state: "PA",
    zip: "15232",
    comparisonLabel: null,
  },
  {
    name: "Famotidine 20mg",
    quantity: "50 tablets",
    price: 13.89,
    pharmacy: "Rite Aid",
    phClass: "ph-rite-aid",
    category: "Digestive Health",
    purpose: "Acid reducer",
    city: "Philadelphia",
    state: "PA",
    zip: "19111",
    comparisonLabel: "Best store offer",
  },
  {
    name: "Famotidine 20mg",
    quantity: "50 tablets",
    price: 15.19,
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Digestive Health",
    purpose: "Acid reducer",
    city: "Columbus",
    state: "OH",
    zip: "43201",
    comparisonLabel: null,
  },
];

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

const selectedStores = new Set();

function uniqueValues(field) {
  return [...new Set(products.map((product) => product[field]))].sort((a, b) => a.localeCompare(b));
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
  const match = name.match(/^(.*?)(\s+\d+\s*(?:mg|iu)(?:\s*[a-zA-Z]*)?)$/i);
  if (!match) {
    return { title: name, strength: "" };
  }

  const rawStrength = match[2].trim();
  const formattedStrength = rawStrength.replace(/\bmg\b/gi, "mg").replace(/\biu\b/gi, "IU");

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

function populateStateOptions() {
  uniqueValues("state").forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateFilter.appendChild(option);
  });
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
    text.textContent = store;

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

    return matchesQuery && matchesState && matchesCity && matchesCategory && matchesStore && matchesPrice;
  });
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

  sorted.forEach((product, index) => {
    const priceParts = formatPriceParts(product.price);
    const unitPrice = formatUnitPrice(product.price, product.quantity);
    const nameParts = splitProductName(product.name);
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.animationDelay = index * 0.04 + "s";
    card.innerHTML = `
      <div class="store-banner category-${slugifyLabel(product.category)}">
        <span class="store-banner-category">${product.category}</span>
        <span class="store-banner-name">${nameParts.title}</span>
        <span class="store-banner-quantity">${product.quantity}${nameParts.strength ? ` · ${nameParts.strength}` : ""}</span>
      </div>
      <h3 class="product-title">${product.pharmacy}</h3>
      <div class="product-content-row">
        <div class="product-copy">
          <p class="product-purpose">${product.purpose}</p>
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
        </div>
        <div class="product-image-wrap">
          <img
            class="product-image"
            src="${getProductImagePath(product.name)}"
            alt="${product.name} demo product image"
            loading="lazy"
          />
        </div>
      </div>
      <div class="location-banner">
        <span>${product.city}, ${product.state}</span>
        <small>ZIP ${product.zip}</small>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderResultsMeta(filtered) {
  const stores = new Set(filtered.map((product) => product.pharmacy)).size;
  const locations = new Set(filtered.map((product) => product.city)).size;

  resultsCount.textContent = `Showing ${filtered.length} offer${filtered.length !== 1 ? "s" : ""}`;
  resultsMeta.textContent = `Across ${stores} store${stores !== 1 ? "s" : ""} and ${locations} location${locations !== 1 ? "s" : ""}`;
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
}

searchInput.addEventListener("input", render);
stateFilter.addEventListener("change", () => {
  populateCityOptions(stateFilter.value);
  cityFilter.value = "all";
  render();
});
cityFilter.addEventListener("change", render);
categoryFilter.addEventListener("change", render);
priceFilter.addEventListener("change", render);

clearStoresButton.addEventListener("click", () => {
  clearStoreSelections();
  render();
});

clearAllFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  stateFilter.value = "all";
  populateCityOptions("all");
  cityFilter.value = "all";
  categoryFilter.value = "all";
  priceFilter.value = "all";
  clearStoreSelections();
  render();
});

populateStateOptions();
populateCityOptions("all");
populateCategoryOptions();
populateStoreFilters();
render();
