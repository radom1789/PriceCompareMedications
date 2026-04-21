(function () {
const medicationService = window.medicationDataService;
const medications = medicationService.getMedications();
const knownStores = medicationService.getKnownStores(medications);

function displayStoreName(name) {
  return medicationService.defaultStoreDisplayName(name);
}

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
    selectedCity: params.get("city"),
    selectedState: params.get("state"),
  };
}

function buildStoreDetailsUrl(slug, storeKey, city, state) {
  const params = new URLSearchParams({
    slug,
    store: storeKey,
    city,
    state,
  });
  return `product-details.html?${params.toString()}`;
}

function renderNotFound() {
  root.innerHTML = `
    <div class="details-panel details-empty">
      <h2 class="text-xl font-bold mb-2">Product not found</h2>
      <p>We could not find the medication you selected.</p>
    </div>
  `;
}

function renderStoreRows(medication, locationOffers, selectedStore) {
  const lowestPriceByStore = locationOffers.reduce((accumulator, offer) => {
    if (!(offer.storeKey in accumulator) || offer.price < accumulator[offer.storeKey]) {
      accumulator[offer.storeKey] = offer.price;
    }
    return accumulator;
  }, {});

  return knownStores
    .map((storeKey) => {
      const rowClass = storeKey === selectedStore ? "details-highlight-row" : "";
      const hasPrice = storeKey in lowestPriceByStore;
      const rowLink = hasPrice
        ? buildStoreDetailsUrl(
            medication.slug,
            storeKey,
            locationOffers[0].city,
            locationOffers[0].state
          )
        : null;
      return `
        <tr class="${rowClass}">
          <td>${
            hasPrice
              ? `<a href="${rowLink}" class="details-store-link">${displayStoreName(storeKey)}</a>`
              : displayStoreName(storeKey)
          }</td>
          <td class="${hasPrice ? "" : "details-price-unavailable"}">${
            hasPrice
              ? `<a href="${rowLink}" class="details-store-link">${formatPrice(lowestPriceByStore[storeKey])}</a>`
              : "N/A"
          }</td>
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

function renderMedication(medication, selectedStore, selectedCity, selectedState) {
  const requestedLocationOffers = medicationService.getOffersForLocation(
    medication,
    selectedCity,
    selectedState
  );
  const locationOffers = requestedLocationOffers.length
    ? requestedLocationOffers
    : medicationService.getOffersForLocation(
        medication,
        medication.offers[0].city,
        medication.offers[0].state
      );
  const activeOffer =
    locationOffers.find((offer) => offer.storeKey === selectedStore) ||
    locationOffers.slice().sort((left, right) => left.price - right.price)[0];
  const activeLocationLabel = `${activeOffer.city}, ${activeOffer.state}`;
  // Match the offer ID format used in the card list: medicationId-state-city-storeKey
  const favoriteId = `${medication.id}-${activeOffer.state}-${activeOffer.city}-${activeOffer.storeKey}`;
  const isFav = window.userService ? window.userService.isFavorite(favoriteId) : false;

  const heartSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

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
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>
              <div class="details-price-store">Current selected store: ${displayStoreName(activeOffer.storeKey)}</div>
              <div class="details-price-value">${formatPrice(activeOffer.price)}</div>
            </div>
            <button class="heart-btn heart-btn-lg${isFav ? " is-favorited" : ""}" type="button" aria-label="Save ${medication.name} to favorites">
              ${heartSvg}
            </button>
          </div>
          <div class="details-price-store" style="margin-top:0.35rem;margin-bottom:0;">Location: ${activeLocationLabel}</div>
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
                ${renderStoreRows(medication, locationOffers, activeOffer.storeKey)}
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
  const { slug, selectedStore, selectedCity, selectedState } = getQueryParams();

  if (!slug) {
    renderNotFound();
    return;
  }

  const medication = medicationService.findMedicationBySlug(slug);

  if (!medication) {
    renderNotFound();
    return;
  }

  renderMedication(medication, selectedStore, selectedCity, selectedState);

  const heartBtn = root.querySelector(".heart-btn");
  if (heartBtn) {
    heartBtn.addEventListener("click", () => {
      if (!window.userService || !window.userService.getSession()) {
        window.authUI.showLoginModal(() => {
          window.userService.toggleFavorite(favoriteId);
          heartBtn.classList.add("is-favorited");
          window.authUI.updateHeader();
        });
      } else {
        const nowFav = window.userService.toggleFavorite(favoriteId);
        heartBtn.classList.toggle("is-favorited", nowFav);
        window.authUI.updateHeader();
      }
    });
  }
}

init();

// Re-render on login/logout so the heart state updates.
document.addEventListener("user-changed", init);
})();
