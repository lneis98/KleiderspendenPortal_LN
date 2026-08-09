export const CONFIG = {
  // Validation
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_PHONE_DIGITS: 8,
  MAX_PHONE_LENGTH: 20,
  MIN_STREET_LENGTH: 3,
  MIN_CITY_LENGTH: 2,
  MIN_ZIP_LENGTH: 4,
  MAX_ZIP_LENGTH: 10,
  
  // UI
  ANIMATION_DURATION: 150,
  DEBOUNCE_DELAY: 300,
  NOTIFICATION_DURATION: 5000,
  ERROR_NOTIFICATION_DURATION: 7000,
  
  // Reference Numbers
  REF_PREFIX: 'KS',
  REF_LENGTH: 10,
  
  // Storage Keys
  STORAGE_KEYS: {
    DONATION_TYPE: 'donationType',
    PICKUP_DATA: 'pickupData',
    DROPOFF_DATA: 'dropoffData',
    REFERENCE_NUMBER: 'referenceNumber',
    TRACKING_DATA: 'trackingData'
  },
  
  // Form Options
  CLOTHING_TYPES: [
    { id: 'oberbekleidung', label: 'Oberbekleidung', description: 'Jacken, Pullover, Shirts' },
    { id: 'unterbekleidung', label: 'Unterbekleidung', description: 'Hosen, Röcke' },
    { id: 'schuhe', label: 'Schuhe' },
    { id: 'accessoires', label: 'Accessoires', description: 'Taschen, Gürtel, Schals' },
    { id: 'kinderbekleidung', label: 'Kinderkleidung' },
    { id: 'babybekleidung', label: 'Babyausstattung' }
  ],
  
  SIZES: [
    { id: 'xs', label: 'XS' },
    { id: 's', label: 'S' },
    { id: 'm', label: 'M' },
    { id: 'l', label: 'L' },
    { id: 'xl', label: 'XL' },
    { id: 'xxl', label: 'XXL' },
    { id: 'xxxl', label: 'XXXL' }
  ],
  
  GENDERS: [
    { id: 'male', label: 'Männlich', icon: '♂' },
    { id: 'female', label: 'Weiblich', icon: '♀' },
    { id: 'unisex', label: 'Unisex', icon: '⚲' }
  ],
  
  QUALITY_LEVELS: [
    { id: 'new', label: 'Neu', description: 'Ungetragen mit Etikett' },
    { id: 'excellent', label: 'Sehr gut', description: 'Kaum getragen, wie neu' },
    { id: 'good', label: 'Gut', description: 'Normale Gebrauchsspuren' },
    { id: 'acceptable', label: 'Akzeptabel', description: 'Deutliche Gebrauchsspuren' }
  ],
  
  PICKUP_TIME_SLOTS: [
    { id: 'morning', label: 'Vormittags', time: '9:00 - 12:00' },
    { id: 'afternoon', label: 'Nachmittags', time: '14:00 - 17:00' },
    { id: 'evening', label: 'Abends', time: '17:00 - 19:00' }
  ],
  
  DROPOFF_LOCATIONS: [
    { 
      id: 'location-1', 
      name: 'Hauptstelle Birkenau',
      address: 'Hauptstraße 123, 69488 Birkenau',
      hours: 'Mo-Fr: 9:00-17:00, Sa: 9:00-13:00'
    },
    { 
      id: 'location-2', 
      name: 'Sammelstelle Weinheim',
      address: 'Bahnhofstraße 45, 69469 Weinheim',
      hours: 'Mo-Fr: 10:00-18:00'
    }
  ],

  // Business Location (for pickup proximity validation)
  BUSINESS_LOCATION: {
    name: 'Hauptstelle Birkenau',
    address: 'Hauptstraße 123, 69488 Birkenau',
    plz: '69488',
    plzPrefix: '69'
  },
  
  // Donation Status
  DONATION_STATUSES: {
    REGISTERED: 'registered',
    PICKED_UP: 'picked_up',
    RECEIVED: 'received',
    SORTED: 'sorted',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered'
  },
  
  STATUS_LABELS: {
    registered: 'Registriert',
    picked_up: 'Abgeholt',
    received: 'Angekommen',
    sorted: 'Sortiert',
    shipped: 'Unterwegs',
    delivered: 'Angekommen'
  },
  
  // Regex Patterns
  PATTERNS: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[\d\s\-\+\(\)]+$/,
    ZIP_CODE: /^\d{4,10}$/,
    REFERENCE_NUMBER: /^KSB-\d{4}-\d{4}$/
  },

  // Shared form options — single source of truth for both Pickup and Dropoff forms
  FORM_CLOTHING_TYPES: [
    { value: 'shirts',      icon: '👔', label: 'Hemden & T-Shirts' },
    { value: 'pants',       icon: '👖', label: 'Hosen & Jeans'    },
    { value: 'dresses',     icon: '👗', label: 'Kleider & Röcke'  },
    { value: 'jackets',     icon: '🧥', label: 'Jacken & Mäntel'  },
    { value: 'sweaters',    icon: '🧶', label: 'Pullover'          },
    { value: 'children',    icon: '🍼', label: 'Kinderkleidung'    },
    { value: 'shoes',       icon: '👟', label: 'Schuhe'            },
    { value: 'accessories', icon: '🧣', label: 'Accessoires'       }
  ],

  FORM_QUANTITY_OPTIONS: [
    { value: 'small',  icon: '📦',       label: 'Klein (1–2 Taschen/Kartons)', desc: 'bis 20 kg'   },
    { value: 'medium', icon: '📦📦',     label: 'Mittel (3–5 Taschen/Kartons)', desc: '20–50 kg'  },
    { value: 'large',  icon: '📦📦📦',   label: 'Groß (6+ Taschen/Kartons)',   desc: 'über 50 kg' }
  ],

  CRISIS_AREAS: [
    { value: 'ukraine',     flag: '🇺🇦', label: 'Ukraine'     },
    { value: 'syria',       flag: '🇸🇾', label: 'Syrien'      },
    { value: 'afghanistan', flag: '🇦🇫', label: 'Afghanistan' },
    { value: 'yemen',       flag: '🇾🇪', label: 'Jemen'       },
    { value: 'somalia',     flag: '🇸🇴', label: 'Somalia'     },
    { value: 'haiti',       flag: '🇭🇹', label: 'Haiti'       }
  ]
};

export default CONFIG;
