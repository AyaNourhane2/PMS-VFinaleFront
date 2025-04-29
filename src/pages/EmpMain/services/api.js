import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // URL du back-end

// Fonction pour créer une réservation
export const createReservation = async (reservation) => {
  try {
    const response = await axios.post(`${API_URL}/reservations/create`, reservation);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fonction pour authentifier une réservation
export const authenticateReservation = async (reservationNumber, guestName) => {
  try {
    const response = await axios.post(`${API_URL}/reservations/authenticate`, {
      reservationNumber,
      guestName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};