const products = [
  {
    name: "Ibuprofen 200mg (100 tablets)",
    price: "8.49",
    pharmacy: "CVS Pharmacy",
    phClass: "ph-cvs",
    category: "Pain Relief",
    savings: "Cheapest nearby",
  },
  {
    name: "Ibuprofen 200mg (200 tablets)",
    price: "14.99",
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Pain Relief",
    savings: null,
  },
  {
    name: "Loratadine 10mg – Allergy Relief (30 tabs)",
    price: "11.29",
    pharmacy: "Giant Eagle Pharmacy",
    phClass: "ph-giant-eagle",
    category: "Allergy",
    savings: "Best value",
  },
  {
    name: "Cetirizine HCl 10mg – Allergy (45 tabs)",
    price: "13.79",
    pharmacy: "CVS Pharmacy",
    phClass: "ph-cvs",
    category: "Allergy",
    savings: null,
  },
  {
    name: "Lisinopril 10mg – Blood Pressure (30 tabs)",
    price: "9.00",
    pharmacy: "Amazon Pharmacy",
    phClass: "ph-amazon",
    category: "Blood Pressure",
    savings: "Lowest price",
  },
  {
    name: "Amlodipine 5mg – Blood Pressure (30 tabs)",
    price: "10.49",
    pharmacy: "Rite Aid",
    phClass: "ph-rite-aid",
    category: "Blood Pressure",
    savings: null,
  },
  {
    name: "Omeprazole 20mg – Acid Reflux (42 caps)",
    price: "17.99",
    pharmacy: "Walgreens",
    phClass: "ph-walgreens",
    category: "Digestive Health",
    savings: null,
  },
  {
    name: "Omeprazole 20mg – Acid Reflux (42 caps)",
    price: "12.49",
    pharmacy: "Costco Pharmacy",
    phClass: "ph-costco",
    category: "Digestive Health",
    savings: "Save $5.50 vs Walgreens",
  },
  {
    name: "Vitamin D3 2000 IU (365 softgels)",
    price: "16.99",
    pharmacy: "Amazon Pharmacy",
    phClass: "ph-amazon",
    category: "Vitamins & Supplements",
    savings: "Best value",
  },
  {
    name: "Metformin 500mg – Diabetes (60 tabs)",
    price: "7.00",
    pharmacy: "Giant Eagle Pharmacy",
    phClass: "ph-giant-eagle",
    category: "Diabetes",
    savings: "Lowest price",
  },
];

const grid = document.getElementById("product-grid");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");
const searchInput = document.getElementById("search-input");

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

function renderCards(filtered) {
  grid.innerHTML = "";
  if (filtered.length === 0) {
    emptyState.style.display = "block";
    resultsCount.textContent = "No results found";
    return;
  }
  emptyState.style.display = "none";
  resultsCount.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}`;

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
          ${p.savings ? `<div class="compare-hint">✓ ${p.savings}</div>` : ''}
        </div>
        <div class="text-right">
          <div class="location-tag">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Pittsburgh, PA
          </div>
          <div style="font-size:0.68rem;color:#94a3b8;margin-top:2px">${p.category}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.pharmacy.toLowerCase().includes(q)
  );
}

searchInput.addEventListener("input", () => {
  renderCards(filterProducts(searchInput.value));
});

// Initial render
renderCards(products);