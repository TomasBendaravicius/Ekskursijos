import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const updateEkskursija = async (id, data) => {
    try {
        const response = await axios.patch(`${API_URL}/ekskursijos/${id}`, data, {
            withCredentials: true,
        });
        alert(
            `Ekskursija atnaujinta sėkmingai!\n\nNauji duomenys:\nPavadinimas: ${data.pavadinimas}\nKaina: ${data.kaina}\nData: ${data.data}\nTrukmė: ${data.trukme}\nVertinimas: ${data.vertinimas}`
        );
        window.location.reload();
        return response.data;
    } catch (error) {
        console.error("Nepavyko atnaujinti ekskursijos:", error.response?.data || error.message);
        throw error;
    }
};