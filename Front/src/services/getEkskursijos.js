import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllEkskursijos = async () => {
  const response = await axios.get(`${API_URL}/ekskursijos`, {
    withCredentials: true,
  });
  console.log("API atsakymas:", response.data);
  if (response.data.length === 0) throw new Error("No data found");
  return response.data;
};

export const getOneEkskursija = async (id) => {
  const response = await axios.get(`${API_URL}/ekskursijos/${id}`, {
    withCredentials: true,
  });
  return response.data;
};