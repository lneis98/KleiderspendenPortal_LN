import { reactive, computed } from 'vue'
import ValidationService from '@/services/validationService'
import CONFIG from '@/utils/constants'

/**
 * Composable für zentrale Formularvalidierung
 * Bündelt alle Validierungslogik aus den Views in einem Service
 * 
 * @param {Object} initialFormData - Initiale Formulardaten
 * @returns {Object} - { errors, formData, validateField, validate }
 */
export function useFormValidation(initialFormData = {}) {
  const errors = reactive({})
  const formData = reactive({ ...initialFormData })

  /**
   * Zentrale Validierungsfunktion für alle Felder
   * Nutzt den ValidationService für konsistente, wartbare Validierungslogik
   */
  const validateField = (fieldName) => {
    delete errors[fieldName]

    switch (fieldName) {
      case 'firstName':
      case 'lastName': {
        const value = formData[fieldName]
        if (!value) {
          errors[fieldName] = fieldName === 'firstName' 
            ? 'Vorname ist erforderlich' 
            : 'Nachname ist erforderlich'
        } else if (value.length < 2) {
          errors[fieldName] = fieldName === 'firstName'
            ? 'Vorname muss mindestens 2 Zeichen lang sein'
            : 'Nachname muss mindestens 2 Zeichen lang sein'
        } else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(value)) {
          errors[fieldName] = 'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt'
        }
        break
      }

      case 'phone': {
        const result = ValidationService.validatePhone(formData.phone || '')
        if (!result.isValid) errors.phone = result.error
        break
      }

      case 'email': {
        if (formData.email) {
          const result = ValidationService.validateEmail(formData.email)
          if (!result.isValid) errors.email = result.error
        }
        break
      }

      case 'street': {
        const value = formData.street
        if (!value) {
          errors.street = 'Straße und Hausnummer sind erforderlich'
        } else if (value.length < 5) {
          errors.street = 'Mindestens 5 Zeichen erforderlich'
        } else if (!/^.+\s+\d+.*$/.test(value)) {
          errors.street = 'Bitte Straße und Hausnummer angeben (z.B. Hauptstraße 123)'
        }
        break
      }

      case 'plz': {
        const result = ValidationService.validateZip(formData.plz || '')
        if (!result.isValid) errors.plz = result.error
        break
      }

      case 'city': {
        const value = formData.city
        if (!value) {
          errors.city = 'Ortsname ist erforderlich'
        } else if (value.length < 2) {
          errors.city = 'Ortsname zu kurz'
        } else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(value)) {
          errors.city = 'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt'
        }
        break
      }

      case 'clothing':
        if (formData.clothing && formData.clothing.length === 0) {
          errors.clothing = 'Bitte wählen Sie mindestens eine Kleidungsart aus'
        }
        break

      case 'quantity':
        if (!formData.quantity) {
          errors.quantity = 'Bitte wählen Sie eine Mengenangabe aus'
        }
        break

      case 'crisisArea':
        if (!formData.crisisArea) {
          errors.crisisArea = 'Bitte wählen Sie ein Zielgebiet aus'
        }
        break

      case 'pickupDate': {
        const result = ValidationService.validateDate(formData.pickupDate || '')
        if (!result.isValid) errors.pickupDate = result.error
        break
      }

      case 'terms':
        if (!formData.terms) {
          errors.terms = 'Sie müssen den Datenschutzbestimmungen zustimmen'
        }
        break

      case 'pickupTime':
        if (!formData.pickupTime) {
          errors.pickupTime = 'Bitte wählen Sie eine Uhrzeit aus'
        }
        break

      case 'comments':
        // Optionales Feld - keine Validierung nötig
        break
    }
  }

  /**
   * Validiert mehrere Felder auf einmal
   * @param {Array<string>} fields - Array von Feldnamen die validiert werden sollen
   */
  const validateFields = (fields) => {
    fields.forEach(field => validateField(field))
  }

  /**
   * Validiert alle erforderlichen Felder
   * @param {Array<string>} requiredFields - Array von erforderlichen Feldnamen (optional)
   * Wenn nicht übergeben, werden alle Felder mit nicht-null Wert in formData validiert
   * @returns {boolean} - True wenn alle Felder valid sind
   */
  const validate = (requiredFields = null) => {
    Object.keys(errors).forEach(key => delete errors[key])
    
    // Wenn keine requiredFields übergeben, alle Felder außer optionalen validieren
    if (!requiredFields) {
      const fieldsToValidate = Object.keys(formData).filter(key => {
        // Validiere alle außer comments und addressNotes (optionale Felder)
        return key !== 'comments' && key !== 'addressNotes'
      })
      validateFields(fieldsToValidate)
    } else {
      validateFields(requiredFields)
    }
    
    return Object.keys(errors).length === 0
  }

  /**
   * Gibt an, ob das Formular gültig ist
   */
  const isValid = computed(() => Object.keys(errors).length === 0)

  /**
   * Gibt an, ob es Fehler gibt
   */
  const hasErrors = computed(() => Object.keys(errors).length > 0)

  /**
   * Löscht alle Fehler
   */
  const clearErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key])
  }

  /**
   * Setzt das Formular zurück
   */
  const reset = (newData = {}) => {
    Object.keys(formData).forEach(key => delete formData[key])
    Object.assign(formData, { ...initialFormData, ...newData })
    clearErrors()
  }

  return {
    errors,
    formData,
    validateField,
    validateFields,
    validate,
    isValid,
    hasErrors,
    clearErrors,
    reset
  }
}
