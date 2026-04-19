// Mock/demo data for frontend prototype only. Not real medical or pricing advice.
window.mockMedications = (() => {
  const providers = [
    { name: "CVS", multiplier: 1.18 },
    { name: "Walgreens", multiplier: 1.2 },
    { name: "Walmart", multiplier: 0.94 },
    { name: "Costco", multiplier: 0.9 },
    { name: "Amazon Pharmacy", multiplier: 0.97 },
    { name: "Rite Aid", multiplier: 1.12 },
  ];

  const states = [
    { state: "CA", cities: [{ city: "Los Angeles", zip: "90012" }, { city: "San Diego", zip: "92101" }, { city: "San Jose", zip: "95113" }] },
    { state: "TX", cities: [{ city: "Houston", zip: "77002" }, { city: "San Antonio", zip: "78205" }, { city: "Dallas", zip: "75201" }] },
    { state: "FL", cities: [{ city: "Jacksonville", zip: "32202" }, { city: "Miami", zip: "33131" }, { city: "Tampa", zip: "33602" }] },
    { state: "NY", cities: [{ city: "New York", zip: "10001" }, { city: "Buffalo", zip: "14202" }, { city: "Rochester", zip: "14604" }] },
    { state: "PA", cities: [{ city: "Philadelphia", zip: "19107" }, { city: "Pittsburgh", zip: "15222" }, { city: "Allentown", zip: "18101" }] },
    { state: "IL", cities: [{ city: "Chicago", zip: "60601" }, { city: "Aurora", zip: "60505" }, { city: "Naperville", zip: "60540" }] },
    { state: "OH", cities: [{ city: "Columbus", zip: "43215" }, { city: "Cleveland", zip: "44114" }, { city: "Cincinnati", zip: "45202" }] },
    { state: "GA", cities: [{ city: "Atlanta", zip: "30303" }, { city: "Augusta", zip: "30901" }, { city: "Columbus", zip: "31901" }] },
    { state: "NC", cities: [{ city: "Charlotte", zip: "28202" }, { city: "Raleigh", zip: "27601" }, { city: "Greensboro", zip: "27401" }] },
    { state: "MI", cities: [{ city: "Detroit", zip: "48226" }, { city: "Grand Rapids", zip: "49503" }, { city: "Warren", zip: "48089" }] },
    { state: "NJ", cities: [{ city: "Newark", zip: "07102" }, { city: "Jersey City", zip: "07302" }, { city: "Paterson", zip: "07505" }] },
    { state: "VA", cities: [{ city: "Virginia Beach", zip: "23451" }, { city: "Chesapeake", zip: "23320" }, { city: "Norfolk", zip: "23510" }] },
    { state: "WA", cities: [{ city: "Seattle", zip: "98101" }, { city: "Spokane", zip: "99201" }, { city: "Tacoma", zip: "98402" }] },
    { state: "AZ", cities: [{ city: "Phoenix", zip: "85004" }, { city: "Tucson", zip: "85701" }, { city: "Mesa", zip: "85201" }] },
    { state: "MA", cities: [{ city: "Boston", zip: "02108" }, { city: "Worcester", zip: "01608" }, { city: "Springfield", zip: "01103" }] },
  ];

  function slugify(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function makeHistoricalPrices(basePrice, index) {
    const offsets = [0.14, 0.08, 0.04, -0.02, -0.05];
    const dates = ["2026-01-15", "2026-02-01", "2026-02-20", "2026-03-15", "2026-04-05"];
    return offsets.map((offset, offsetIndex) => ({
      date: dates[offsetIndex],
      price: Number((basePrice * (1 + offset + ((index % 3) * 0.01))).toFixed(2)),
    }));
  }

  function makeOffers(basePrice, medicationIndex) {
    return states.flatMap((stateEntry, stateIndex) =>
      stateEntry.cities.flatMap((location, cityIndex) =>
        providers.map((provider, providerIndex) => {
          const regionalFactor = 1 + (stateIndex * 0.012) + (cityIndex * 0.008);
          const medicationFactor = 1 + ((medicationIndex % 5) - 2) * 0.015;
          const providerFactor = provider.multiplier + (providerIndex % 2) * 0.005;
          return {
            storeKey: provider.name,
            city: location.city,
            state: stateEntry.state,
            zip: location.zip,
            price: Number((basePrice * regionalFactor * medicationFactor * providerFactor).toFixed(2)),
          };
        })
      )
    );
  }

  const otcDrugs = [
    { name: "Acetaminophen", brandNames: ["Tylenol"], category: "Pain Relief", conditions: ["Headache", "Fever"], symptoms: ["Body aches", "Pain"], description: "Pain reliever and fever reducer used for everyday aches and headaches.", purpose: "Relieves mild pain and reduces fever", maxDosage: "3000 mg daily", form: "Tablet", strength: "500 mg", basePrice: 7.49 },
    { name: "Ibuprofen", brandNames: ["Advil", "Motrin"], category: "Pain Relief", conditions: ["Pain", "Inflammation"], symptoms: ["Headache", "Muscle soreness"], description: "NSAID that helps reduce inflammation, pain, and fever.", purpose: "Relieves inflammation, pain, and fever", maxDosage: "1200 mg daily", form: "Tablet", strength: "200 mg", basePrice: 8.29 },
    { name: "Naproxen Sodium", brandNames: ["Aleve"], category: "Pain Relief", conditions: ["Back pain", "Joint pain"], symptoms: ["Muscle pain", "Swelling"], description: "Longer-lasting NSAID often used for arthritis and back pain.", purpose: "Provides longer-lasting pain relief", maxDosage: "660 mg daily", form: "Tablet", strength: "220 mg", basePrice: 9.39 },
    { name: "Aspirin", brandNames: ["Bayer"], category: "Pain Relief", conditions: ["Headache", "Minor pain"], symptoms: ["Pain", "Fever"], description: "Pain reliever and anti-inflammatory medicine commonly used for aches.", purpose: "Relieves pain and reduces fever", maxDosage: "4000 mg daily", form: "Tablet", strength: "81 mg", basePrice: 5.69 },
    { name: "Diclofenac", brandNames: ["Voltaren"], category: "Pain Relief", conditions: ["Arthritis", "Joint pain"], symptoms: ["Swelling", "Stiffness"], description: "Topical anti-inflammatory gel for localized joint and muscle pain.", purpose: "Relieves joint pain where applied", maxDosage: "4 applications daily", form: "Gel", strength: "1%", basePrice: 14.79 },
    { name: "Lidocaine", brandNames: ["Aspercreme"], category: "Pain Relief", conditions: ["Back pain", "Nerve pain"], symptoms: ["Localized pain", "Soreness"], description: "Numbing patch for temporary relief of pain on the skin surface.", purpose: "Temporarily numbs localized pain", maxDosage: "3 patches daily", form: "Patch", strength: "4%", basePrice: 13.49 },
    { name: "Cetirizine", brandNames: ["Zyrtec"], category: "Allergy", conditions: ["Seasonal allergies"], symptoms: ["Sneezing", "Runny nose"], description: "Once-daily antihistamine used for common indoor and outdoor allergies.", purpose: "Relieves sneezing, itching, and runny nose", maxDosage: "10 mg daily", form: "Tablet", strength: "10 mg", basePrice: 11.29 },
    { name: "Loratadine", brandNames: ["Claritin"], category: "Allergy", conditions: ["Seasonal allergies"], symptoms: ["Sneezing", "Watery eyes"], description: "Non-drowsy antihistamine for seasonal allergy symptoms.", purpose: "Relieves seasonal allergy symptoms", maxDosage: "10 mg daily", form: "Tablet", strength: "10 mg", basePrice: 10.99 },
    { name: "Fexofenadine", brandNames: ["Allegra"], category: "Allergy", conditions: ["Seasonal allergies"], symptoms: ["Itchy eyes", "Congestion"], description: "Fast-acting antihistamine used for all-day allergy relief.", purpose: "Provides all-day allergy relief", maxDosage: "180 mg daily", form: "Tablet", strength: "180 mg", basePrice: 13.59 },
    { name: "Diphenhydramine", brandNames: ["Benadryl"], category: "Allergy", conditions: ["Allergies"], symptoms: ["Itching", "Hives"], description: "Sedating antihistamine often used for short-term allergy relief.", purpose: "Relieves itching, hives, and allergy symptoms", maxDosage: "300 mg daily", form: "Capsule", strength: "25 mg", basePrice: 7.19 },
    { name: "Fluticasone", brandNames: ["Flonase"], category: "Allergy", conditions: ["Allergic rhinitis"], symptoms: ["Nasal congestion", "Sneezing"], description: "Corticosteroid nasal spray that reduces inflammation from allergies.", purpose: "Relieves nasal allergy congestion", maxDosage: "2 sprays per nostril daily", form: "Nasal Spray", strength: "50 mcg", basePrice: 15.49 },
    { name: "Triamcinolone", brandNames: ["Nasacort"], category: "Allergy", conditions: ["Allergic rhinitis"], symptoms: ["Sneezing", "Nasal congestion"], description: "Daily allergy spray that helps control inflammation in the nose.", purpose: "Controls nasal allergy symptoms", maxDosage: "2 sprays per nostril daily", form: "Nasal Spray", strength: "55 mcg", basePrice: 15.99 },
    { name: "Omeprazole", brandNames: ["Prilosec"], category: "Digestive Health", conditions: ["Heartburn", "GERD"], symptoms: ["Heartburn", "Acid reflux"], description: "Proton pump inhibitor used for frequent heartburn.", purpose: "Reduces stomach acid and frequent heartburn", maxDosage: "20 mg daily", form: "Capsule", strength: "20 mg", basePrice: 12.79 },
    { name: "Famotidine", brandNames: ["Pepcid"], category: "Digestive Health", conditions: ["Heartburn"], symptoms: ["Indigestion", "Acid reflux"], description: "H2 blocker that lowers acid production for heartburn relief.", purpose: "Relieves and prevents heartburn", maxDosage: "40 mg daily", form: "Tablet", strength: "20 mg", basePrice: 9.89 },
    { name: "Calcium Carbonate", brandNames: ["Tums"], category: "Digestive Health", conditions: ["Indigestion"], symptoms: ["Heartburn", "Upset stomach"], description: "Chewable antacid that quickly neutralizes stomach acid.", purpose: "Quick relief for heartburn and indigestion", maxDosage: "7500 mg daily", form: "Chewable Tablet", strength: "500 mg", basePrice: 6.39 },
    { name: "Bismuth Subsalicylate", brandNames: ["Pepto-Bismol"], category: "Digestive Health", conditions: ["Upset stomach"], symptoms: ["Nausea", "Diarrhea"], description: "Soothing medicine used for nausea, indigestion, and diarrhea.", purpose: "Relieves upset stomach and diarrhea", maxDosage: "8 doses daily", form: "Chewable Tablet", strength: "262 mg", basePrice: 8.49 },
    { name: "Loperamide", brandNames: ["Imodium"], category: "Digestive Health", conditions: ["Diarrhea"], symptoms: ["Loose stool", "Urgency"], description: "Anti-diarrheal medicine that slows gut movement.", purpose: "Controls diarrhea symptoms", maxDosage: "8 mg daily", form: "Capsule", strength: "2 mg", basePrice: 6.99 },
    { name: "Simethicone", brandNames: ["Gas-X"], category: "Digestive Health", conditions: ["Gas"], symptoms: ["Bloating", "Pressure"], description: "Anti-gas medicine that helps break up bubbles in the stomach.", purpose: "Relieves gas and bloating", maxDosage: "500 mg daily", form: "Chewable Tablet", strength: "125 mg", basePrice: 7.29 },
    { name: "Psyllium Husk", brandNames: ["Metamucil"], category: "Digestive Health", conditions: ["Constipation"], symptoms: ["Irregularity", "Bloating"], description: "Fiber supplement used to support regular bowel movements.", purpose: "Supports regular bowel movements", maxDosage: "3 doses daily", form: "Powder", strength: "3.4 g", basePrice: 13.29 },
    { name: "Polyethylene Glycol", brandNames: ["MiraLAX"], category: "Digestive Health", conditions: ["Constipation"], symptoms: ["Irregularity", "Hard stool"], description: "Osmotic laxative that helps draw water into the colon.", purpose: "Relieves occasional constipation", maxDosage: "17 g daily", form: "Powder", strength: "17 g", basePrice: 15.19 },
    { name: "Docusate Sodium", brandNames: ["Colace"], category: "Digestive Health", conditions: ["Constipation"], symptoms: ["Hard stool", "Straining"], description: "Stool softener for occasional constipation relief.", purpose: "Softens stool for easier bowel movements", maxDosage: "300 mg daily", form: "Capsule", strength: "100 mg", basePrice: 8.19 },
    { name: "Guaifenesin", brandNames: ["Mucinex"], category: "Cold & Flu", conditions: ["Chest congestion"], symptoms: ["Cough", "Mucus"], description: "Expectorant that thins mucus to help clear the chest.", purpose: "Relieves chest congestion", maxDosage: "2400 mg daily", form: "Tablet", strength: "600 mg", basePrice: 12.39 },
    { name: "Dextromethorphan", brandNames: ["Delsym"], category: "Cold & Flu", conditions: ["Cough"], symptoms: ["Dry cough", "Throat irritation"], description: "Cough suppressant used for short-term cough relief.", purpose: "Temporarily suppresses cough", maxDosage: "120 mg daily", form: "Liquid", strength: "30 mg", basePrice: 9.59 },
    { name: "Phenylephrine", brandNames: ["Sudafed PE"], category: "Cold & Flu", conditions: ["Congestion"], symptoms: ["Stuffy nose", "Sinus pressure"], description: "Decongestant commonly used for temporary nasal congestion relief.", purpose: "Temporarily relieves nasal congestion", maxDosage: "60 mg daily", form: "Tablet", strength: "10 mg", basePrice: 6.79 },
    { name: "Pseudoephedrine", brandNames: ["Sudafed"], category: "Cold & Flu", conditions: ["Congestion"], symptoms: ["Stuffy nose", "Sinus pressure"], description: "Behind-the-counter decongestant for stronger congestion relief.", purpose: "Relieves severe nasal congestion", maxDosage: "240 mg daily", form: "Tablet", strength: "30 mg", basePrice: 7.49 },
    { name: "Chlorpheniramine", brandNames: ["Chlor-Trimeton"], category: "Cold & Flu", conditions: ["Allergies", "Cold symptoms"], symptoms: ["Sneezing", "Runny nose"], description: "Older antihistamine used for allergy and cold relief.", purpose: "Relieves sneezing and runny nose", maxDosage: "24 mg daily", form: "Tablet", strength: "4 mg", basePrice: 5.79 },
    { name: "Menthol Cough Drops", brandNames: ["Halls"], category: "Cold & Flu", conditions: ["Sore throat"], symptoms: ["Cough", "Scratchy throat"], description: "Soothing lozenges that cool the throat and suppress cough.", purpose: "Soothes sore throat and suppresses cough", maxDosage: "As directed", form: "Lozenge", strength: "7.6 mg", basePrice: 4.99 },
    { name: "Vitamin C", brandNames: ["Nature Made"], category: "Vitamins & Supplements", conditions: ["Immune support"], symptoms: ["Supplemental wellness"], description: "Common vitamin supplement used for immune support.", purpose: "Supports immune health", maxDosage: "2000 mg daily", form: "Tablet", strength: "1000 mg", basePrice: 9.29 },
    { name: "Vitamin D3", brandNames: ["Nature's Bounty"], category: "Vitamins & Supplements", conditions: ["Bone health"], symptoms: ["Supplemental wellness"], description: "Vitamin supplement often used for bone and immune support.", purpose: "Supports bone and immune health", maxDosage: "4000 IU daily", form: "Softgel Capsule", strength: "2000 IU", basePrice: 8.89 },
    { name: "Multivitamin", brandNames: ["One A Day"], category: "Vitamins & Supplements", conditions: ["General wellness"], symptoms: ["Supplemental wellness"], description: "Daily vitamin blend intended to support general nutrition.", purpose: "Supports overall daily nutrition", maxDosage: "1 tablet daily", form: "Tablet", strength: "One daily", basePrice: 11.59 },
    { name: "Zinc", brandNames: ["Nature Made"], category: "Vitamins & Supplements", conditions: ["Immune support"], symptoms: ["Supplemental wellness"], description: "Mineral supplement often used for immune support.", purpose: "Supports immune health", maxDosage: "40 mg daily", form: "Tablet", strength: "50 mg", basePrice: 7.49 },
    { name: "Melatonin", brandNames: ["Natrol"], category: "Sleep Support", conditions: ["Trouble sleeping"], symptoms: ["Difficulty falling asleep"], description: "Hormone supplement commonly used for occasional sleeplessness.", purpose: "Supports falling asleep faster", maxDosage: "10 mg nightly", form: "Tablet", strength: "5 mg", basePrice: 8.19 },
    { name: "Doxylamine Succinate", brandNames: ["Unisom"], category: "Sleep Support", conditions: ["Trouble sleeping"], symptoms: ["Restlessness"], description: "Nighttime sleep aid with sedating antihistamine properties.", purpose: "Helps with occasional sleeplessness", maxDosage: "25 mg nightly", form: "Tablet", strength: "25 mg", basePrice: 8.69 },
    { name: "Meclizine", brandNames: ["Bonine"], category: "Motion Sickness", conditions: ["Motion sickness"], symptoms: ["Nausea", "Dizziness"], description: "Anti-nausea medicine used for travel-related motion sickness.", purpose: "Prevents and relieves motion sickness", maxDosage: "50 mg daily", form: "Chewable Tablet", strength: "25 mg", basePrice: 6.89 },
    { name: "Dimenhydrinate", brandNames: ["Dramamine"], category: "Motion Sickness", conditions: ["Motion sickness"], symptoms: ["Nausea", "Dizziness"], description: "Motion sickness medicine used before and during travel.", purpose: "Prevents nausea and dizziness from motion", maxDosage: "400 mg daily", form: "Tablet", strength: "50 mg", basePrice: 7.89 },
    { name: "Nicotine Polacrilex", brandNames: ["Nicorette"], category: "Smoking Cessation", conditions: ["Smoking cessation"], symptoms: ["Nicotine cravings"], description: "Nicotine gum used to help reduce cigarette cravings.", purpose: "Helps reduce nicotine cravings", maxDosage: "24 pieces daily", form: "Gum", strength: "4 mg", basePrice: 28.99 },
    { name: "Nicotine Patch", brandNames: ["NicoDerm"], category: "Smoking Cessation", conditions: ["Smoking cessation"], symptoms: ["Nicotine cravings"], description: "Transdermal nicotine patch for gradual nicotine replacement.", purpose: "Provides steady nicotine replacement", maxDosage: "1 patch daily", form: "Patch", strength: "14 mg/24 hr", basePrice: 31.49 },
    { name: "Hydrocortisone", brandNames: ["Cortizone-10"], category: "Skin Care", conditions: ["Itching", "Rash"], symptoms: ["Redness", "Irritation"], description: "Topical steroid cream for itch relief from minor skin irritation.", purpose: "Relieves itching and irritation", maxDosage: "As directed", form: "Cream", strength: "1%", basePrice: 7.19 },
    { name: "Clotrimazole", brandNames: ["Lotrimin AF"], category: "Skin Care", conditions: ["Athlete's foot"], symptoms: ["Itching", "Scaling"], description: "Antifungal cream for common skin fungal infections.", purpose: "Treats fungal skin infections", maxDosage: "2 applications daily", form: "Cream", strength: "1%", basePrice: 8.49 },
    { name: "Miconazole Nitrate", brandNames: ["Monistat"], category: "Skin Care", conditions: ["Fungal irritation"], symptoms: ["Itching", "Discomfort"], description: "Antifungal medicine used for common yeast and fungal irritation.", purpose: "Treats common fungal irritation", maxDosage: "As directed", form: "Cream", strength: "2%", basePrice: 9.49 },
    { name: "Benzoyl Peroxide", brandNames: ["PanOxyl"], category: "Skin Care", conditions: ["Acne"], symptoms: ["Breakouts", "Oily skin"], description: "Topical acne wash that helps clear pores and reduce bacteria.", purpose: "Helps treat acne breakouts", maxDosage: "As directed", form: "Wash", strength: "5%", basePrice: 10.99 },
    { name: "Saline Nasal Spray", brandNames: ["Ocean"], category: "Respiratory", conditions: ["Dry nasal passages"], symptoms: ["Congestion", "Dryness"], description: "Simple saline spray used to moisturize and rinse nasal passages.", purpose: "Moisturizes and clears nasal passages", maxDosage: "As needed", form: "Nasal Spray", strength: "0.65%", basePrice: 4.89 },
    { name: "Epinephrine Inhalation Aerosol", brandNames: ["Primatene Mist"], category: "Respiratory", conditions: ["Mild asthma"], symptoms: ["Wheezing", "Shortness of breath"], description: "Over-the-counter inhaled mist for temporary relief of mild intermittent asthma symptoms.", purpose: "Temporarily relieves mild asthma symptoms", maxDosage: "8 inhalations daily", form: "Inhaler", strength: "0.125 mg", basePrice: 27.99 },
    { name: "Artificial Tears", brandNames: ["Refresh Tears"], category: "Eye Care", conditions: ["Dry eye"], symptoms: ["Burning", "Eye dryness"], description: "Lubricating eye drops used for temporary relief of dry eyes.", purpose: "Lubricates and relieves dry eyes", maxDosage: "As needed", form: "Eye Drops", strength: "0.5%", basePrice: 9.19 },
    { name: "Ketotifen", brandNames: ["Zaditor"], category: "Eye Care", conditions: ["Eye allergies"], symptoms: ["Itchy eyes", "Redness"], description: "Antihistamine eye drops used for itchy allergy eyes.", purpose: "Relieves itchy allergy eyes", maxDosage: "2 drops daily", form: "Eye Drops", strength: "0.035%", basePrice: 12.49 },
    { name: "Hemorrhoid Relief Cream", brandNames: ["Preparation H"], category: "Personal Care", conditions: ["Hemorrhoids"], symptoms: ["Itching", "Burning"], description: "Topical cream used to temporarily relieve hemorrhoid discomfort.", purpose: "Relieves hemorrhoid discomfort", maxDosage: "4 applications daily", form: "Cream", strength: "1%", basePrice: 8.79 },
    { name: "Milk of Magnesia", brandNames: ["Phillips'"], category: "Digestive Health", conditions: ["Constipation"], symptoms: ["Irregularity", "Bloating"], description: "Liquid laxative and antacid used for occasional constipation relief.", purpose: "Relieves occasional constipation", maxDosage: "60 mL daily", form: "Liquid", strength: "1200 mg", basePrice: 7.99 },
    { name: "Lansoprazole", brandNames: ["Prevacid 24HR"], category: "Digestive Health", conditions: ["Heartburn"], symptoms: ["Acid reflux", "Burning"], description: "Acid reducer used for frequent heartburn over a 14-day course.", purpose: "Prevents frequent heartburn", maxDosage: "15 mg daily", form: "Capsule", strength: "15 mg", basePrice: 13.89 },
    { name: "Cranberry", brandNames: ["AZO Cranberry"], category: "Vitamins & Supplements", conditions: ["Urinary wellness"], symptoms: ["Supplemental wellness"], description: "Supplement often used to support urinary tract wellness.", purpose: "Supports urinary tract health", maxDosage: "2 softgels daily", form: "Softgel Capsule", strength: "500 mg", basePrice: 11.49 },
    { name: "Probiotic", brandNames: ["Align"], category: "Vitamins & Supplements", conditions: ["Digestive balance"], symptoms: ["Bloating", "Irregularity"], description: "Daily probiotic supplement used to support digestive balance.", purpose: "Supports digestive balance", maxDosage: "1 capsule daily", form: "Capsule", strength: "10 Billion CFU", basePrice: 18.99 },
  ];

  return otcDrugs.map((seed, index) => ({
    id: index + 1,
    name: seed.name,
    genericName: seed.name,
    brandNames: seed.brandNames,
    category: seed.category,
    conditions: seed.conditions,
    symptoms: seed.symptoms,
    description: seed.description,
    purpose: seed.purpose,
    maxDosage: seed.maxDosage,
    form: seed.form,
    strength: seed.strength,
    slug: `${slugify(seed.name)}-${slugify(seed.strength)}`,
    isPrescription: false,
    image: "assets/medications/placeholder.png",
    offers: makeOffers(seed.basePrice, index),
    historicalPrices: makeHistoricalPrices(seed.basePrice, index),
  }));
})();
