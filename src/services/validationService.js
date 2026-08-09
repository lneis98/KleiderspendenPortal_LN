import CONFIG from '../utils/constants';

class ValidationService {
  static validateName(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Name ist erforderlich' };
    }
    
    if (value.trim().length < CONFIG.MIN_NAME_LENGTH) {
      return { 
        isValid: false, 
        error: `Name muss mindestens ${CONFIG.MIN_NAME_LENGTH} Zeichen lang sein` 
      };
    }
    
    if (value.length > CONFIG.MAX_NAME_LENGTH) {
      return { 
        isValid: false, 
        error: `Name darf maximal ${CONFIG.MAX_NAME_LENGTH} Zeichen lang sein` 
      };
    }
    
    return { isValid: true, error: null };
  }

  static validateEmail(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'E-Mail ist erforderlich' };
    }
    
    if (!CONFIG.PATTERNS.EMAIL.test(value)) {
      return { isValid: false, error: 'Ungültige E-Mail-Adresse' };
    }
    
    return { isValid: true, error: null };
  }

  static validatePhone(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Telefonnummer ist erforderlich' };
    }
    
    if (!CONFIG.PATTERNS.PHONE.test(value)) {
      return { isValid: false, error: 'Ungültige Telefonnummer' };
    }
    
    const digits = value.replace(/\D/g, '');
    if (digits.length < CONFIG.MIN_PHONE_DIGITS) {
      return { 
        isValid: false, 
        error: `Telefonnummer muss mindestens ${CONFIG.MIN_PHONE_DIGITS} Ziffern enthalten` 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate street address
   * @param {string} value - Street to validate
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateStreet(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Straße ist erforderlich' };
    }
    
    if (value.trim().length < CONFIG.MIN_STREET_LENGTH) {
      return { 
        isValid: false, 
        error: `Straße muss mindestens ${CONFIG.MIN_STREET_LENGTH} Zeichen lang sein` 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate city
   * @param {string} value - City to validate
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateCity(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Stadt ist erforderlich' };
    }
    
    if (value.trim().length < CONFIG.MIN_CITY_LENGTH) {
      return { 
        isValid: false, 
        error: `Stadt muss mindestens ${CONFIG.MIN_CITY_LENGTH} Zeichen lang sein` 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate ZIP code
   * @param {string} value - ZIP code to validate
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateZip(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Postleitzahl ist erforderlich' };
    }
    
    if (!CONFIG.PATTERNS.ZIP_CODE.test(value)) {
      return { isValid: false, error: 'Postleitzahl muss 5 Ziffern enthalten' };
    }

    // Kritisch: Erste beiden Ziffern müssen dem PLZ-Prefix der Geschäftsstelle entsprechen
    const prefix = value.substring(0, 2);
    const expectedPrefix = CONFIG.BUSINESS_LOCATION.plzPrefix;
    if (prefix !== expectedPrefix) {
      return { 
        isValid: false, 
        error: `Leider liegt Ihre Adresse außerhalb unseres Abholgebiets. Wir holen nur in der Region ${CONFIG.BUSINESS_LOCATION.plz} ab.` 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate that pickup address is near the business location
   * Checks if the first two digits of the pickup address PLZ match the business location PLZ
   * @param {string} pickupZip - Pickup address postal code
   * @param {string} businessZip - Business location postal code (default: 69488 Birkenau)
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validatePickupProximity(pickupZip, businessZip = '69488') {
    if (!pickupZip || pickupZip.trim().length === 0) {
      return { isValid: false, error: 'Abholadresse PLZ ist erforderlich' };
    }

    // Extract first two digits (postal area prefix)
    const pickupPrefix = pickupZip.substring(0, 2);
    const businessPrefix = businessZip.substring(0, 2);

    // Check if pickup address is in the same postal area as the business location
    if (pickupPrefix !== businessPrefix) {
      return {
        isValid: false,
        error: `Leider liegt Ihre Adresse außerhalb unseres Abholgebiets. Wir holen nur im Bereich ${businessPrefix}xxx ab.`
      };
    }

    return { isValid: true, error: null };
  }

  /**
   * Validate date (must be in the future AND must be a valid calendar date)
   * Checks for invalid dates like February 31st
   * @param {string} value - Date to validate (YYYY-MM-DD format)
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateDate(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Datum ist erforderlich' };
    }

    // Prüfe zuerst, ob das Datum EXISTIERT (z.B. 31. Februar ist ungültig)
    const [year, month, day] = value.split('-').map(Number);
    
    // Erstelle ein Datum von dem Input
    const testDate = new Date(year, month - 1, day);
    
    // Überprüfe, ob das resultierende Datum dem Input entspricht
    // Wenn nicht (z.B. 31.02. -> 2.03.), ist das Input-Datum ungültig
    if (
      testDate.getFullYear() !== year ||
      testDate.getMonth() + 1 !== month ||
      testDate.getDate() !== day
    ) {
      return { 
        isValid: false, 
        error: 'Ungültiges Datum (z.B. 31. Februar existiert nicht)' 
      };
    }
    
    // Prüfe, ob das Datum in der Zukunft liegt (mindestens morgen)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    if (testDate < tomorrow) {
      return { isValid: false, error: 'Datum muss in der Zukunft liegen (mindestens morgen)' };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate reference number
   * @param {string} value - Reference number to validate
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateReferenceNumber(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Referenznummer ist erforderlich' };
    }
    
    if (!CONFIG.PATTERNS.REFERENCE_NUMBER.test(value)) {
      return { 
        isValid: false, 
        error: 'Ungültige Referenznummer (Format: KSB-YYYY-XXXX)' 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate that at least one item is selected
   * @param {Array} items - Array of selected items
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateSelection(items) {
    if (!items || items.length === 0) {
      return { isValid: false, error: 'Bitte wählen Sie mindestens eine Option' };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate entire form object
   * @param {Object} formData - Form data object
   * @param {Array} requiredFields - Array of required field names
   * @returns {Object} - { isValid: boolean, errors: Object }
   */
  static validateForm(formData, requiredFields) {
    const errors = {};
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim().length === 0) {
        errors[field] = 'Dieses Feld ist erforderlich';
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default ValidationService;
