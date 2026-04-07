// Mock/demo data for frontend prototype only. Not real medical or pricing advice.
export const mockMedications = [
  {
    id: 1,
    name: "Atorvastatin",
    genericName: "Atorvastatin",
    brandNames: ["Lipitor"],
    category: "Cardiovascular",
    conditions: ["High Cholesterol", "Heart Disease Prevention"],
    symptoms: [],
    description: "Statin medication that lowers LDL cholesterol and triglycerides while raising HDL.",
    purpose: "Reduces risk of heart attack and stroke",
    maxDosage: "80 mg daily",
    form: "Tablet",
    strength: "20 mg",
    slug: "atorvastatin-20mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 8.99,
      "CVS": 14.99,
      "Walgreens": 15.49,
      "Amazon Pharmacy": 9.99,
      "Costco": 7.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 12.99,
      "National": 11.49
    },
    historicalPrices: [
      { date: "2026-01-15", price: 13.99 },
      { date: "2026-02-01", price: 13.49 },
      { date: "2026-02-15", price: 12.99 },
      { date: "2026-03-01", price: 12.49 },
      { date: "2026-03-15", price: 11.99 }
    ]
  },
  {
    id: 2,
    name: "Lisinopril",
    genericName: "Lisinopril",
    brandNames: ["Prinivil", "Zestril"],
    category: "Cardiovascular",
    conditions: ["High Blood Pressure", "Heart Failure"],
    symptoms: ["Shortness of breath", "Fatigue"],
    description: "ACE inhibitor that relaxes blood vessels to lower blood pressure.",
    purpose: "Treats hypertension and improves survival after heart attack",
    maxDosage: "40 mg daily",
    form: "Tablet",
    strength: "10 mg",
    slug: "lisinopril-10mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 6.99,
      "CVS": 11.99,
      "Walgreens": 12.49,
      "Amazon Pharmacy": 7.49,
      "Costco": 5.99
    },
    pricesByLocation: {
      "Pittsburgh, PA": 9.99,
      "National": 8.99
    },
    historicalPrices: [
      { date: "2026-01-10", price: 10.49 },
      { date: "2026-02-05", price: 10.29 },
      { date: "2026-02-20", price: 9.99 },
      { date: "2026-03-10", price: 9.49 },
      { date: "2026-03-25", price: 9.29 }
    ]
  },
  {
    id: 3,
    name: "Metformin",
    genericName: "Metformin",
    brandNames: ["Glucophage"],
    category: "Diabetes",
    conditions: ["Type 2 Diabetes"],
    symptoms: ["Increased thirst", "Frequent urination"],
    description: "Oral diabetes medicine that helps control blood sugar levels.",
    purpose: "Improves insulin sensitivity and lowers glucose production",
    maxDosage: "2000 mg daily",
    form: "Tablet ER",
    strength: "500 mg",
    slug: "metformin-500mg-er",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 7.49,
      "CVS": 13.99,
      "Walgreens": 14.49,
      "Amazon Pharmacy": 8.49,
      "Costco": 6.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 10.99,
      "National": 9.99
    },
    historicalPrices: [
      { date: "2026-01-20", price: 11.49 },
      { date: "2026-02-10", price: 11.29 },
      { date: "2026-03-05", price: 10.99 },
      { date: "2026-03-20", price: 10.49 },
      { date: "2026-04-01", price: 10.29 }
    ]
  },
  {
    id: 4,
    name: "Omeprazole",
    genericName: "Omeprazole",
    brandNames: ["Prilosec"],
    category: "Gastrointestinal",
    conditions: ["Acid Reflux", "Heartburn", "GERD"],
    symptoms: ["Heartburn", "Regurgitation"],
    description: "Proton pump inhibitor that reduces stomach acid production.",
    purpose: "Treats frequent heartburn and prevents ulcers",
    maxDosage: "40 mg daily",
    form: "Capsule",
    strength: "20 mg",
    slug: "omeprazole-20mg",
    isPrescription: false,
    image: "assets/medications/omeprazole-20mg.png",
    pricesByStore: {
      "Walmart": 9.99,
      "CVS": 15.99,
      "Walgreens": 16.49,
      "Amazon Pharmacy": 10.99,
      "Costco": 8.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 13.99,
      "National": 12.49
    },
    historicalPrices: [
      { date: "2026-01-05", price: 14.49 },
      { date: "2026-02-15", price: 13.99 },
      { date: "2026-03-10", price: 13.49 },
      { date: "2026-03-25", price: 13.29 },
      { date: "2026-04-05", price: 12.99 }
    ]
  },
  {
    id: 5,
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    brandNames: ["Advil", "Motrin"],
    category: "Pain Relief",
    conditions: ["Pain", "Fever", "Inflammation"],
    symptoms: ["Headache", "Muscle pain"],
    description: "NSAID that reduces hormones causing inflammation and pain.",
    purpose: "Relieves minor aches, pains, and reduces fever",
    maxDosage: "1200 mg daily (OTC)",
    form: "Tablet",
    strength: "200 mg",
    slug: "ibuprofen-200mg",
    isPrescription: false,
    image: "assets/medications/ibuprofen-200mg.png",
    pricesByStore: {
      "Walmart": 4.99,
      "CVS": 6.99,
      "Walgreens": 7.49,
      "Amazon Pharmacy": 5.49,
      "Costco": 4.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 5.99,
      "National": 5.49
    },
    historicalPrices: [
      { date: "2026-01-12", price: 6.29 },
      { date: "2026-02-08", price: 6.09 },
      { date: "2026-02-22", price: 5.99 },
      { date: "2026-03-18", price: 5.79 },
      { date: "2026-04-02", price: 5.49 }
    ]
  },
  {
    id: 6,
    name: "Cetirizine",
    genericName: "Cetirizine",
    brandNames: ["Zyrtec"],
    category: "Allergy",
    conditions: ["Seasonal Allergies", "Hay Fever"],
    symptoms: ["Sneezing", "Itchy eyes", "Runny nose"],
    description: "Antihistamine that relieves allergy symptoms.",
    purpose: "Relieves sneezing, itching, and watery eyes",
    maxDosage: "10 mg daily",
    form: "Tablet",
    strength: "10 mg",
    slug: "cetirizine-10mg",
    isPrescription: false,
    image: "assets/medications/cetirizine-10mg.png",
    pricesByStore: {
      "Walmart": 7.99,
      "CVS": 12.99,
      "Walgreens": 13.49,
      "Amazon Pharmacy": 8.99,
      "Costco": 6.99
    },
    pricesByLocation: {
      "Pittsburgh, PA": 10.49,
      "National": 9.49
    },
    historicalPrices: [
      { date: "2026-01-18", price: 10.99 },
      { date: "2026-02-12", price: 10.49 },
      { date: "2026-03-08", price: 10.29 },
      { date: "2026-03-28", price: 9.99 },
      { date: "2026-04-06", price: 9.79 }
    ]
  },
  {
    id: 7,
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    brandNames: ["Amoxil"],
    category: "Antibiotic",
    conditions: ["Bacterial Infections"],
    symptoms: ["Fever", "Sore throat"],
    description: "Penicillin-type antibiotic that fights bacteria.",
    purpose: "Treats ear, nose, throat, and skin infections",
    maxDosage: "875 mg every 12 hours",
    form: "Capsule",
    strength: "500 mg",
    slug: "amoxicillin-500mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 8.49,
      "CVS": 14.49,
      "Walgreens": 14.99,
      "Amazon Pharmacy": 9.49,
      "Costco": 7.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 11.99,
      "National": 10.99
    },
    historicalPrices: [
      { date: "2026-01-22", price: 12.49 },
      { date: "2026-02-14", price: 12.29 },
      { date: "2026-03-12", price: 11.99 },
      { date: "2026-03-30", price: 11.49 },
      { date: "2026-04-04", price: 11.29 }
    ]
  },
  {
    id: 8,
    name: "Levothyroxine",
    genericName: "Levothyroxine",
    brandNames: ["Synthroid"],
    category: "Endocrine",
    conditions: ["Hypothyroidism"],
    symptoms: ["Fatigue", "Weight gain"],
    description: "Synthetic thyroid hormone to replace what the body is missing.",
    purpose: "Restores normal thyroid hormone levels",
    maxDosage: "200 mcg daily",
    form: "Tablet",
    strength: "50 mcg",
    slug: "levothyroxine-50mcg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 9.49,
      "CVS": 15.49,
      "Walgreens": 15.99,
      "Amazon Pharmacy": 10.49,
      "Costco": 8.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 12.99,
      "National": 11.49
    },
    historicalPrices: [
      { date: "2026-01-08", price: 13.49 },
      { date: "2026-02-18", price: 13.29 },
      { date: "2026-03-15", price: 12.99 },
      { date: "2026-03-22", price: 12.49 },
      { date: "2026-04-03", price: 12.29 }
    ]
  },
  {
    id: 9,
    name: "Amlodipine",
    genericName: "Amlodipine",
    brandNames: ["Norvasc"],
    category: "Cardiovascular",
    conditions: ["High Blood Pressure", "Angina"],
    symptoms: ["Chest pain"],
    description: "Calcium channel blocker that relaxes blood vessels.",
    purpose: "Lowers blood pressure and improves blood flow",
    maxDosage: "10 mg daily",
    form: "Tablet",
    strength: "5 mg",
    slug: "amlodipine-5mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 7.99,
      "CVS": 12.99,
      "Walgreens": 13.49,
      "Amazon Pharmacy": 8.99,
      "Costco": 6.99
    },
    pricesByLocation: {
      "Pittsburgh, PA": 10.99,
      "National": 9.99
    },
    historicalPrices: [
      { date: "2026-01-25", price: 11.49 },
      { date: "2026-02-20", price: 11.29 },
      { date: "2026-03-05", price: 10.99 },
      { date: "2026-03-29", price: 10.49 },
      { date: "2026-04-07", price: 10.29 }
    ]
  },
  {
    id: 10,
    name: "Losartan",
    genericName: "Losartan",
    brandNames: ["Cozaar"],
    category: "Cardiovascular",
    conditions: ["High Blood Pressure", "Kidney Protection"],
    symptoms: [],
    description: "Angiotensin receptor blocker that relaxes blood vessels.",
    purpose: "Lowers blood pressure and protects kidneys in diabetes",
    maxDosage: "100 mg daily",
    form: "Tablet",
    strength: "50 mg",
    slug: "losartan-50mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 8.49,
      "CVS": 13.99,
      "Walgreens": 14.49,
      "Amazon Pharmacy": 9.49,
      "Costco": 7.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 11.99,
      "National": 10.49
    },
    historicalPrices: [
      { date: "2026-01-30", price: 12.49 },
      { date: "2026-02-25", price: 12.29 },
      { date: "2026-03-18", price: 11.99 },
      { date: "2026-03-31", price: 11.49 },
      { date: "2026-04-05", price: 11.29 }
    ]
  },
  {
    id: 11,
    name: "Simvastatin",
    genericName: "Simvastatin",
    brandNames: ["Zocor"],
    category: "Cardiovascular",
    conditions: ["High Cholesterol"],
    symptoms: [],
    description: "Statin that lowers cholesterol and triglycerides.",
    purpose: "Reduces risk of heart disease",
    maxDosage: "40 mg daily",
    form: "Tablet",
    strength: "20 mg",
    slug: "simvastatin-20mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 7.49,
      "CVS": 12.49,
      "Walgreens": 12.99,
      "Amazon Pharmacy": 8.49,
      "Costco": 6.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 10.49,
      "National": 9.49
    },
    historicalPrices: [
      { date: "2026-01-14", price: 10.99 },
      { date: "2026-02-09", price: 10.49 },
      { date: "2026-03-14", price: 9.99 },
      { date: "2026-03-27", price: 9.49 },
      { date: "2026-04-02", price: 9.29 }
    ]
  },
  {
    id: 12,
    name: "Albuterol",
    genericName: "Albuterol",
    brandNames: ["ProAir", "Ventolin"],
    category: "Respiratory",
    conditions: ["Asthma", "COPD"],
    symptoms: ["Wheezing", "Shortness of breath"],
    description: "Short-acting bronchodilator that opens airways.",
    purpose: "Quick relief from asthma symptoms",
    maxDosage: "2 puffs every 4-6 hours as needed",
    form: "Inhaler",
    strength: "90 mcg",
    slug: "albuterol-90mcg-inhaler",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 24.99,
      "CVS": 34.99,
      "Walgreens": 35.99,
      "Amazon Pharmacy": 26.99,
      "Costco": 22.99
    },
    pricesByLocation: {
      "Pittsburgh, PA": 29.99,
      "National": 28.49
    },
    historicalPrices: [
      { date: "2026-01-19", price: 31.99 },
      { date: "2026-02-16", price: 30.99 },
      { date: "2026-03-11", price: 29.99 },
      { date: "2026-03-26", price: 28.99 },
      { date: "2026-04-06", price: 28.49 }
    ]
  },
  {
    id: 13,
    name: "Pantoprazole",
    genericName: "Pantoprazole",
    brandNames: ["Protonix"],
    category: "Gastrointestinal",
    conditions: ["GERD", "Erosive Esophagitis"],
    symptoms: ["Heartburn", "Swallowing difficulty"],
    description: "Proton pump inhibitor that decreases stomach acid.",
    purpose: "Heals acid damage to the esophagus",
    maxDosage: "40 mg daily",
    form: "Tablet",
    strength: "40 mg",
    slug: "pantoprazole-40mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 10.99,
      "CVS": 17.99,
      "Walgreens": 18.49,
      "Amazon Pharmacy": 11.99,
      "Costco": 9.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 14.99,
      "National": 13.49
    },
    historicalPrices: [
      { date: "2026-01-28", price: 15.49 },
      { date: "2026-02-21", price: 14.99 },
      { date: "2026-03-19", price: 14.49 },
      { date: "2026-03-30", price: 14.29 },
      { date: "2026-04-07", price: 13.99 }
    ]
  },
  {
    id: 14,
    name: "Hydrochlorothiazide",
    genericName: "Hydrochlorothiazide",
    brandNames: ["Microzide"],
    category: "Cardiovascular",
    conditions: ["High Blood Pressure", "Edema"],
    symptoms: [],
    description: "Diuretic that helps kidneys remove salt and water.",
    purpose: "Lowers blood pressure and reduces fluid retention",
    maxDosage: "50 mg daily",
    form: "Tablet",
    strength: "25 mg",
    slug: "hydrochlorothiazide-25mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 5.99,
      "CVS": 9.99,
      "Walgreens": 10.49,
      "Amazon Pharmacy": 6.99,
      "Costco": 4.99
    },
    pricesByLocation: {
      "Pittsburgh, PA": 8.49,
      "National": 7.49
    },
    historicalPrices: [
      { date: "2026-01-11", price: 8.99 },
      { date: "2026-02-07", price: 8.49 },
      { date: "2026-02-28", price: 7.99 },
      { date: "2026-03-21", price: 7.49 },
      { date: "2026-04-04", price: 7.29 }
    ]
  },
  {
    id: 15,
    name: "Gabapentin",
    genericName: "Gabapentin",
    brandNames: ["Neurontin"],
    category: "Neurological",
    conditions: ["Nerve Pain", "Seizures"],
    symptoms: ["Burning pain", "Numbness"],
    description: "Anticonvulsant that affects chemicals and nerves in the body.",
    purpose: "Relieves nerve pain from shingles or diabetes",
    maxDosage: "3600 mg daily",
    form: "Capsule",
    strength: "300 mg",
    slug: "gabapentin-300mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 11.99,
      "CVS": 18.99,
      "Walgreens": 19.49,
      "Amazon Pharmacy": 12.99,
      "Costco": 10.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 15.99,
      "National": 14.49
    },
    historicalPrices: [
      { date: "2026-01-24", price: 16.49 },
      { date: "2026-02-13", price: 15.99 },
      { date: "2026-03-09", price: 15.49 },
      { date: "2026-03-24", price: 15.29 },
      { date: "2026-04-01", price: 14.99 }
    ]
  },
  {
    id: 16,
    name: "Sertraline",
    genericName: "Sertraline",
    brandNames: ["Zoloft"],
    category: "Mental Health",
    conditions: ["Depression", "Anxiety"],
    symptoms: ["Persistent sadness", "Anxiety"],
    description: "SSRI antidepressant that balances brain chemicals.",
    purpose: "Treats depression, anxiety, and OCD",
    maxDosage: "200 mg daily",
    form: "Tablet",
    strength: "50 mg",
    slug: "sertraline-50mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 9.99,
      "CVS": 15.99,
      "Walgreens": 16.49,
      "Amazon Pharmacy": 10.99,
      "Costco": 8.99
    },
    pricesByLocation: {
      "Pittsburgh, PA": 13.49,
      "National": 12.49
    },
    historicalPrices: [
      { date: "2026-01-17", price: 13.99 },
      { date: "2026-02-19", price: 13.49 },
      { date: "2026-03-16", price: 12.99 },
      { date: "2026-03-28", price: 12.49 },
      { date: "2026-04-03", price: 12.29 }
    ]
  },
  {
    id: 17,
    name: "Tamsulosin",
    genericName: "Tamsulosin",
    brandNames: ["Flomax"],
    category: "Urological",
    conditions: ["Benign Prostatic Hyperplasia"],
    symptoms: ["Frequent urination", "Weak stream"],
    description: "Alpha blocker that relaxes muscles in the prostate and bladder.",
    purpose: "Improves urine flow in men with enlarged prostate",
    maxDosage: "0.8 mg daily",
    form: "Capsule",
    strength: "0.4 mg",
    slug: "tamsulosin-0.4mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 10.49,
      "CVS": 16.99,
      "Walgreens": 17.49,
      "Amazon Pharmacy": 11.49,
      "Costco": 9.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 14.49,
      "National": 13.49
    },
    historicalPrices: [
      { date: "2026-01-26", price: 14.99 },
      { date: "2026-02-23", price: 14.49 },
      { date: "2026-03-17", price: 13.99 },
      { date: "2026-03-31", price: 13.49 },
      { date: "2026-04-07", price: 13.29 }
    ]
  },
  {
    id: 18,
    name: "Montelukast",
    genericName: "Montelukast",
    brandNames: ["Singulair"],
    category: "Respiratory",
    conditions: ["Asthma", "Seasonal Allergies"],
    symptoms: ["Wheezing", "Sneezing"],
    description: "Leukotriene receptor antagonist that reduces inflammation.",
    purpose: "Prevents asthma attacks and relieves allergy symptoms",
    maxDosage: "10 mg daily",
    form: "Tablet",
    strength: "10 mg",
    slug: "montelukast-10mg",
    isPrescription: true,
    image: "assets/medications/placeholder.png",
    pricesByStore: {
      "Walmart": 12.99,
      "CVS": 19.99,
      "Walgreens": 20.49,
      "Amazon Pharmacy": 13.99,
      "Costco": 11.49
    },
    pricesByLocation: {
      "Pittsburgh, PA": 16.99,
      "National": 15.49
    },
    historicalPrices: [
      { date: "2026-01-13", price: 17.49 },
      { date: "2026-02-11", price: 16.99 },
      { date: "2026-03-07", price: 16.49 },
      { date: "2026-03-23", price: 15.99 },
      { date: "2026-04-05", price: 15.49 }
    ]
  }
];