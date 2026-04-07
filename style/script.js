const products = [
  {
    name: "Ibuprofen 200mg (100 tablets)",
    price: "8.49",
    pharmacy: "CVS Pharmacy",
    phClass: "ph-cvs",
    category: "Pain Relief",
    location: "Pittsburgh, PA",
    savings: "Cheapest nearby",
  },
  {
    name: "Ibuprofen 200mg (200 tablets)",
    price: "14.99",
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Pain Relief",
    location: "Pittsburgh, PA",
    savings: null,
  },
  {
    name: "Loratadine 10mg – Allergy Relief (30 tabs)",
    price: "11.29",
    pharmacy: "Giant Eagle Pharmacy",
    phClass: "ph-giant-eagle",
    category: "Allergy",
    location: "Oakland, Pittsburgh",
    savings: "Best value",
  },
  {
    name: "Cetirizine HCl 10mg – Allergy (45 tabs)",
    price: "13.79",
    pharmacy: "CVS Pharmacy",
    phClass: "ph-cvs",
    category: "Allergy",
    location: "Shadyside, Pittsburgh",
    savings: null,
  },
  {
    name: "Lisinopril 10mg – Blood Pressure (30 tabs)",
    price: "9.00",
    pharmacy: "Amazon Pharmacy",
    phClass: "ph-amazon",
    category: "Blood Pressure",
    location: "Online",
    savings: "Lowest price",
  },
  {
    name: "Amlodipine 5mg – Blood Pressure (30 tabs)",
    price: "10.49",
    pharmacy: "Rite Aid",
    phClass: "ph-rite-aid",
    category: "Blood Pressure",
    location: "Squirrel Hill, Pittsburgh",
    savings: null,
  },
  {
    name: "Omeprazole 20mg – Acid Reflux (42 caps)",
    price: "17.99",
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Digestive Health",
    location: "Downtown, Pittsburgh",
    savings: null,
  },
  {
    name: "Omeprazole 20mg – Acid Reflux (42 caps)",
    price: "12.49",
    pharmacy: "Costco Pharmacy",
    phClass: "ph-costco",
    category: "Digestive Health",
    location: "Waterfront, Pittsburgh",
    savings: "Save $5.50 vs Walgreens",
  },
  {
    name: "Vitamin D3 2000 IU (365 softgels)",
    price: "16.99",
    pharmacy: "Amazon Pharmacy",
    phClass: "ph-amazon",
    category: "Vitamins & Supplements",
    location: "Online",
    savings: "Best value",
  },
  {
    name: "Metformin 500mg – Diabetes (60 tabs)",
    price: "7.00",
    pharmacy: "Giant Eagle Pharmacy",
    phClass: "ph-giant-eagle",
    category: "Diabetes",
    location: "Shadyside, Pittsburgh",
    savings: "Lowest price",
  },
];

const grid = document.getElementById("product-grid");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");
const searchInput = document.getElementById("search-input");

const storeFilter = document.getElementById("store-filter");
const locationFilter = document.getElementById("location-filter");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");
const clearFiltersBtn = document.getElementById("clear-filters");
const lowestPriceChip = document.getElementById("lowest-price-chip");
const activeFiltersChip = document.getElementById("active-filters-chip");

function categoryIcon(cat) {
  const map = {
    "Pain Relief": "🩹",
    "Allergy": "🌿",
    "Blood Pressure": "❤️",
    "Digestive Health": "💊",
    "Vitamins & Supplements": "🌟",
    "Diabetes": "🩺",
  };
  return map[cat] || "💊";
}

function uniqueValues(key) {
  return [...new Set(products.map(p => p[key]))].sort();
}

function populateSelect(selectEl, values, defaultLabel) {
  selectEl.innerHTML = `<option value="all">${defaultLabel}</option>`;
  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectEl.appendChild(option);
  });
}

function getFilteredProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedStore = storeFilter.value;
  const selectedLocation = locationFilter.value;
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortFilter.value;

  let filtered = products.filter(p => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.pharmacy.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query);

    const matchesStore = selectedStore === "all" || p.pharmacy === selectedStore;
    const matchesLocation = selectedLocation === "all" || p.location === selectedLocation;
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;

    return matchesQuery && matchesStore && matchesLocation && matchesCategory;
  });

  if (selectedSort === "lowest") {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (selectedSort === "highest") {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (selectedSort === "az") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}

function updateSummary(filtered) {
  if (!filtered.length) {
    lowestPriceChip.textContent = "Lowest price: --";
    activeFiltersChip.textContent = "No matching products";
    return;
  }

  const lowest = Math.min(...filtered.map(p => Number(p.price)));
  lowestPriceChip.textContent = `Lowest price: $${lowest.toFixed(2)}`;

  const parts = [];
  if (storeFilter.value !== "all") parts.push(storeFilter.value);
  if (locationFilter.value !== "all") parts.push(locationFilter.value);
  if (categoryFilter.value !== "all") parts.push(categoryFilter.value);

  activeFiltersChip.textContent = parts.length ? parts.join(" • ") : "All products";
}

function renderCards(filtered) {
  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    resultsCount.textContent = "No results found";
    updateSummary(filtered);
    return;
  }

  emptyState.style.display = "none";
  resultsCount.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}`;
  updateSummary(filtered);

  filtered.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = (i * 0.04) + "s";
    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 mb-3">
        <span class="text-xl leading-none">${categoryIcon(p.category)}</span>
        <span class="pharmacy-badge ${p.phClass}">${p.pharmacy}</span>
      </div>

      <h3 class="font-semibold text-gray-900 leading-snug mb-3" style="font-size:0.92rem">${p.name}</h3>

      <div class="flex items-end justify-between gap-2">
        <div>
          <div class="price-tag">$${p.price}</div>
          <div class="price-subtext">Current listed price</div>
          ${p.savings ? `<div class="compare-hint">✓ ${p.savings}</div>` : ""}
        </div>

        <div class="text-right">
          <div class="location-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            ${p.location}
          </div>
          <div class="product-meta">${p.category}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  renderCards(getFilteredProducts());
}

function clearFilters() {
  searchInput.value = "";
  storeFilter.value = "all";
  locationFilter.value = "all";
  categoryFilter.value = "all";
  sortFilter.value = "lowest";
  applyFilters();
}

populateSelect(storeFilter, uniqueValues("pharmacy"), "All stores");
populateSelect(locationFilter, uniqueValues("location"), "All locations");
populateSelect(categoryFilter, uniqueValues("category"), "All categories");

searchInput.addEventListener("input", applyFilters);
storeFilter.addEventListener("change", applyFilters);
locationFilter.addEventListener("change", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);
clearFiltersBtn.addEventListener("click", clearFilters);

// Initial render
applyFilters();