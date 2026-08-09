import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useDonationStore = defineStore('donation', () => {
  const donationType = ref(null);
  const pickupData = ref(null);
  const dropoffData = ref(null);
  const referenceNumber = ref(null);


  const hasActivePickup = computed(() => !!pickupData.value);
  const hasActiveDropoff = computed(() => !!dropoffData.value);
  const currentDonationData = computed(() => {
    return donationType.value === 'pickup' ? pickupData.value : dropoffData.value;
  });

  function setDonationType(type) {
    donationType.value = type;
  }

  function savePickupData(data) {
    pickupData.value = data;
    donationType.value = 'pickup';
    referenceNumber.value = data.referenceNumber;
    
    try {
      localStorage.setItem('donationType', 'pickup');
      localStorage.setItem('pickupData', JSON.stringify(data));
      localStorage.setItem('referenceNumber', data.referenceNumber);
    } catch (error) {
      console.error('Error saving pickup data:', error);
    }
  }

  function saveDropoffData(data) {
    dropoffData.value = data;
    donationType.value = 'dropoff';
    referenceNumber.value = data.referenceNumber;
    
    try {
      localStorage.setItem('donationType', 'dropoff');
      localStorage.setItem('dropoffData', JSON.stringify(data));
      localStorage.setItem('referenceNumber', data.referenceNumber);
    } catch (error) {
      console.error('Error saving dropoff data:', error);
    }
  }

  function loadFromStorage() {
    try {
      const type = localStorage.getItem('donationType');
      const refNum = localStorage.getItem('referenceNumber');
      
      if (type === 'pickup') {
        const data = localStorage.getItem('pickupData');
        if (data) {
          pickupData.value = JSON.parse(data);
          donationType.value = 'pickup';
          referenceNumber.value = refNum;
        }
      } else if (type === 'dropoff') {
        const data = localStorage.getItem('dropoffData');
        if (data) {
          dropoffData.value = JSON.parse(data);
          donationType.value = 'dropoff';
          referenceNumber.value = refNum;
        }
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }

  function clearDonation() {
    donationType.value = null;
    pickupData.value = null;
    dropoffData.value = null;
    referenceNumber.value = null;
    
    try {
      localStorage.removeItem('donationType');
      localStorage.removeItem('pickupData');
      localStorage.removeItem('dropoffData');
      localStorage.removeItem('referenceNumber');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  function saveDonation(data) {
    if (data.type === 'pickup') {
      savePickupData(data);
    } else if (data.type === 'dropoff') {
      saveDropoffData(data);
    }
  }

  function getDonationByReference(refNumber) {
    // TODO: API-Integration für Tracking
    if (referenceNumber.value === refNumber) {
      return currentDonationData.value;
    }
    return null;
  }

  const lastDonation = computed(() => currentDonationData.value);

  return {
    donationType,
    pickupData,
    dropoffData,
    referenceNumber,
    lastDonation,
    hasActivePickup,
    hasActiveDropoff,
    currentDonationData,
    setDonationType,
    savePickupData,
    saveDropoffData,
    saveDonation,
    loadFromStorage,
    clearDonation,
    getDonationByReference
  };
});
