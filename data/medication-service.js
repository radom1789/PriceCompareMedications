(function () {
  function defaultStoreDisplayName(name) {
    return name === "Amazon Pharmacy" ? "Amazon" : name;
  }

  function normalizeOffer(rawOffer, fallbackLocation) {
    const fallback = fallbackLocation || {};
    return {
      storeKey: rawOffer.storeKey || rawOffer.pharmacy || rawOffer.store || "",
      price: Number(rawOffer.price || 0),
      city: rawOffer.city || fallback.city || "Pittsburgh",
      state: rawOffer.state || fallback.state || "PA",
      zip: rawOffer.zip || fallback.zip || "15213",
    };
  }

  function buildOffersFromLegacyPrices(rawMedication) {
    const fallbackLocation = {
      city: "Pittsburgh",
      state: "PA",
      zip: "15213",
    };

    return Object.entries(rawMedication.pricesByStore || {}).map(([storeKey, price]) =>
      normalizeOffer({ storeKey, price }, fallbackLocation)
    );
  }

  function buildPricesByStore(offers) {
    return offers.reduce((accumulator, offer) => {
      if (!(offer.storeKey in accumulator) || offer.price < accumulator[offer.storeKey]) {
        accumulator[offer.storeKey] = offer.price;
      }
      return accumulator;
    }, {});
  }

  function buildPricesByLocation(offers) {
    return offers.reduce((accumulator, offer) => {
      const locationKey = `${offer.city}, ${offer.state}`;
      if (!(locationKey in accumulator) || offer.price < accumulator[locationKey]) {
        accumulator[locationKey] = offer.price;
      }
      return accumulator;
    }, {});
  }

  function normalizeMedication(rawMedication) {
    const offers = Array.isArray(rawMedication.offers) && rawMedication.offers.length
      ? rawMedication.offers.map((offer) => normalizeOffer(offer))
      : buildOffersFromLegacyPrices(rawMedication);

    return {
      id: rawMedication.id,
      name: rawMedication.name,
      genericName: rawMedication.genericName || rawMedication.name,
      brandNames: rawMedication.brandNames || [],
      category: rawMedication.category || "Uncategorized",
      conditions: rawMedication.conditions || [],
      symptoms: rawMedication.symptoms || [],
      description: rawMedication.description || "",
      purpose: rawMedication.purpose || "",
      maxDosage: rawMedication.maxDosage || "",
      form: rawMedication.form || "",
      strength: rawMedication.strength || "",
      slug: rawMedication.slug || "",
      isPrescription: Boolean(rawMedication.isPrescription),
      image: rawMedication.image || "assets/medications/placeholder.png",
      offers,
      pricesByStore: buildPricesByStore(offers),
      pricesByLocation: buildPricesByLocation(offers),
      historicalPrices: rawMedication.historicalPrices || [],
    };
  }

  function getQuantityLabel(medication) {
    if (medication.form.includes("Tablet") || medication.form.includes("Capsule") || medication.form.includes("Chewable")) {
      return "30 count";
    }

    if (medication.form.includes("Inhaler")) {
      return "1 inhaler";
    }

    if (medication.form.includes("Patch")) {
      return "14 patches";
    }

    if (medication.form.includes("Cream") || medication.form.includes("Gel") || medication.form.includes("Wash")) {
      return "1 tube";
    }

    if (medication.form.includes("Spray") || medication.form.includes("Drops") || medication.form.includes("Solution") || medication.form.includes("Liquid")) {
      return "1 bottle";
    }

    if (medication.form.includes("Lozenge")) {
      return "30 count";
    }

    if (medication.form.includes("Gum")) {
      return "100 pieces";
    }

    if (medication.form.includes("Powder")) {
      return "1 bottle";
    }

    return medication.form;
  }

  function expandMedicationOffers(medications, options) {
    const config = options || {};
    const getStoreDisplayName = config.getStoreDisplayName || defaultStoreDisplayName;

    return medications.flatMap((medication) => {
      return medication.offers.map((offer) => ({
        id: `${medication.id}-${offer.state}-${offer.city}-${offer.storeKey}`,
        medicationId: medication.id,
        name: `${medication.name} ${medication.strength}`.trim(),
        baseName: medication.name,
        genericName: medication.genericName,
        brandNames: medication.brandNames,
        quantity: getQuantityLabel(medication),
        price: offer.price,
        storeKey: offer.storeKey,
        pharmacy: offer.storeKey,
        displayPharmacy: getStoreDisplayName(offer.storeKey),
        phClass: `ph-${offer.storeKey.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        category: medication.category,
        purpose: medication.purpose,
        city: offer.city,
        state: offer.state,
        zip: offer.zip,
        comparisonLabel: null,
        image: medication.image,
        slug: medication.slug,
        isPrescription: medication.isPrescription,
        strength: medication.strength,
        form: medication.form,
        description: medication.description,
        conditions: medication.conditions,
        symptoms: medication.symptoms,
        maxDosage: medication.maxDosage,
      }));
    });
  }

  function getRawMedicationSource() {
    return window.mockMedications || [];
  }

  function getMedications() {
    return getRawMedicationSource().map(normalizeMedication);
  }

  function findMedicationBySlug(slug) {
    return getMedications().find((medication) => medication.slug === slug) || null;
  }

  function getOffersForLocation(medication, city, state) {
    return medication.offers.filter((offer) => offer.city === city && offer.state === state);
  }

  function getKnownStores(medications) {
    return [...new Set(
      medications.flatMap((medication) => medication.offers.map((offer) => offer.storeKey))
    )].sort((left, right) => left.localeCompare(right));
  }

  window.medicationDataService = {
    defaultStoreDisplayName,
    normalizeMedication,
    expandMedicationOffers,
    getMedications,
    findMedicationBySlug,
    getOffersForLocation,
    getKnownStores,
  };
})();
