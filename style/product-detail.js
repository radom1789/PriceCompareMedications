import { mockMedications } from "../data/mockData.js";

const root = document.getElementById("product-details-root");

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function getImagePath(medication) {
  return medication.image || "assets/medications/placeholder.png";
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    slug: params.get("slug"),
    selectedStore: params.get("store"),
  };
}

function renderNotFound() {
  root.innerHTML = `
    <div class="details-panel details-empty">
      <h2 class="text-xl font-bold mb-2">Product not found</h2>
      <p>We could not find the medication you selected.</p>
    </div>
  `;
}

function renderStoreRows(pricesByStore, selectedStore) {
  return Object.entries(pricesByStore)
    .sort((a, b) => a[1] - b[1])
    .map(([store, price]) => {
      const rowClass = store === selectedStore ? "details-highlight-row" : "";
      return `
        <tr class="${rowClass}">
          <td>${store}</td>
          <td>${formatPrice(price)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderHistoricalRows(historicalPrices) {
  return historicalPrices
    .slice()
    .reverse()
    .map((entry) => {
      return `
        <tr>
          <td>${entry.date}</td>
          <td>${formatPrice(entry.price)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderMedication(medication, selectedStore) {
  const fallbackStore = Object.keys(medication.pricesByStore)[0];
  const activeStore =
    selectedStore && medication.pricesByStore[selectedStore]
      ? selectedStore
      : fallbackStore;

  const activePrice = medication.pricesByStore[activeStore];

  root.innerHTML = `
    <div class="details-layout">
      <section class="details-panel details-image-panel">
        <div class="details-image-wrap">
          <img
            class="details-image"
            src="${getImagePath(medication)}"
            alt="${medication.name} product image"
            onerror="this.onerror=null;this.src='assets/medications/placeholder.png';"
          />
        </div>
      </section>

      <section class="details-panel details-info-panel">
        <div class="details-category-badge">${medication.category}</div>

        <h1 class="details-title">${medication.name}</h1>
        <p class="details-subtitle">
          Generic name: ${medication.genericName}
          ${medication.brandNames?.length ? `• Brand names: ${medication.brandNames.join(", ")}` : ""}
        </p>

        <div class="details-price-card">
          <div class="details-price-store">Current selected store: ${activeStore}</div>
          <div class="details-price-value">${formatPrice(activePrice)}</div>
        </div>

        <div class="details-pill-row">
          <span class="details-pill">${medication.strength}</span>
          <span class="details-pill">${medication.form}</span>
          <span class="details-pill">${medication.isPrescription ? "Prescription" : "Over the counter"}</span>
          <span class="details-pill">Max dosage: ${medication.maxDosage}</span>
        </div>

        <div class="details-section">
          <h3>Description</h3>
          <p>${medication.description}</p>
        </div>

        <div class="details-section">
          <h3>Purpose</h3>
          <p>${medication.purpose}</p>
        </div>

        <div class="details-section">
          <h3>Conditions treated</h3>
          <ul>
            ${
              medication.conditions?.length
                ? medication.conditions.map((condition) => `<li>${condition}</li>`).join("")
                : "<li>No conditions listed</li>"
            }
          </ul>
        </div>

        <div class="details-section">
          <h3>Common symptoms</h3>
          <ul>
            ${
              medication.symptoms?.length
                ? medication.symptoms.map((symptom) => `<li>${symptom}</li>`).join("")
                : "<li>No symptoms listed</li>"
            }
          </ul>
        </div>
      </section>
    </div>

    <div class="details-grid-bottom">
      <section class="details-panel details-info-panel">
        <div class="details-section" style="margin-top:0;">
          <h3>Store price comparison</h3>
          <div class="details-table-wrap">
            <table class="details-table">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${renderStoreRows(medication.pricesByStore, activeStore)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="details-panel details-info-panel">
        <div class="details-section" style="margin-top:0;">
          <h3>Recent price history</h3>
          <div class="details-table-wrap">
            <table class="details-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${renderHistoricalRows(medication.historicalPrices || [])}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  `;
}

function init() {
  const { slug, selectedStore } = getQueryParams();

  if (!slug) {
    renderNotFound();
    return;
  }

  const medication = mockMedications.find((med) => med.slug === slug);

  if (!medication) {
    renderNotFound();
    return;
  }

  renderMedication(medication, selectedStore);
}

init();