import axios from "axios";
import { getOneEkskursija } from "./getEkskursijos";

const API_URL = import.meta.env.VITE_API_URL;

export const deleteEkskursija = async (id) => {
  const response = await getOneEkskursija(id);
  const ekskursija = response?.data?.ekskursija;
  const { pavadinimas, kaina } = ekskursija || {};
  const confirmed = window.confirm(
    `Ar tikrai norite ištrinti ekskursiją "${pavadinimas}" (kaina: ${kaina} €)?`
  );
  if (!confirmed) return;
  const res = await axios.delete(`${API_URL}/ekskursijos/${id}`, {
    withCredentials: true,
  });
  return res.data;
};