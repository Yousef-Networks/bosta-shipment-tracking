// src/services/trackingService.js
import axios from 'axios';

export const fetchShipmentData = async (trackingNumber) => {
  try {
    const response = await axios.get(`https://tracking.bosta.co/shipments/track/${trackingNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shipment data:', error);
    return null;
  }
};
