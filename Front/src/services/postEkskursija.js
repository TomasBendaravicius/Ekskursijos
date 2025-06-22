import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postEkskursija = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/ekskursijos`, data, {
      withCredentials: true,
    });
    alert("Ekskursija sukurta sėkmingai!");
    return response.data;
  } catch (error) {
    if (error.response) {
      alert(`Klaida: ekskursijos sukurti nepavyko! Kodas: ${error.response.status}`);
      throw error.response;
    } else {
      alert("Klaida: ekskursijos sukurti nepavyko!");
      throw error;
    }
  }
};