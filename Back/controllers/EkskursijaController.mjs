import {
  postEkskursija,
  getEkskursijos,
  getEkskursijaById,
  updateEkskursija,
  deleteEkskursija,
} from "../models/ekskursijaModel.mjs";
import { sql } from "../dbConnection.mjs";
import { randomBytes } from "crypto";

// Funkcija, kuri generuoja atsitiktinį 6 simbolių kodą
function randomCode() {
  return randomBytes(3).toString("hex");
}

// Sukuria naują ekskursiją
export const newEkskursija = async (req, res, next) => {
  try {
    const ekskursija = req.body;
    const newCode = randomCode();
    const ekskursijaWithCode = { kodas: newCode, ...ekskursija };

    const createdEkskursija = await postEkskursija(ekskursijaWithCode);

    res.status(201).json({
      status: "success",
      data: {
        ekskursija: createdEkskursija,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to create ekskursija",
    });
  }
};

// Gauk visas ekskursijas
export const getAllEkskursijos = async (req, res, next) => {
  try {
    const ekskursijos = await getEkskursijos();

    res.status(200).json({
      status: "success",
      results: ekskursijos.length,
      data: {
        ekskursijos,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch ekskursijos",
    });
  }
};

// Gauk vieną ekskursiją pagal ID
export const getEkskursija = async (req, res) => {
  try {
    const { id } = req.params;
    const ekskursija = await getEkskursijaById(id);
    if (!ekskursija) {
      return res.status(404).json({
        status: "fail",
        message: "Ekskursija nerasta",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        ekskursija,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch ekskursija",
    });
  }
};

// Atnaujina ekskursiją pagal ID
export const editEkskursija = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedEkskursija = await updateEkskursija(id, updatedData);
    if (!updatedEkskursija) {
      return res.status(404).json({
        status: "fail",
        message: "Ekskursija nerasta",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        ekskursija: updatedEkskursija,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to update ekskursija",
    });
  }
};

// Ištrina ekskursiją pagal ID
export const removeEkskursija = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEkskursija = await deleteEkskursija(id);
    if (!deletedEkskursija) {
      return res.status(404).json({
        status: "fail",
        message: "Ekskursija nerasta",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to delete ekskursija",
    });
  }
};

// Pridėti vertinimą konkrečiai ekskursijai
export const pridetiVertinima = async (req, res) => {
  try {
    const ekskursija_id = req.params.id;
    const { vertinimas } = req.body;
    if (!vertinimas || vertinimas < 1 || vertinimas > 10) {
      return res.status(400).json({ message: "Vertinimas turi būti tarp 1 ir 10" });
    }
    await sql`
      INSERT INTO ekskursiju_vertinimai (ekskursija_id, vertinimas)
      VALUES (${ekskursija_id}, ${vertinimas})
    `;
    res.status(201).json({ message: "Vertinimas išsaugotas" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Nepavyko išsaugoti vertinimo" });
  }
};

// Gauti vidutinį vertinimą konkrečiai ekskursijai
export const gautiVidutiniVertinima = async (req, res) => {
  try {
    const ekskursija_id = req.params.id;
    const result = await sql`
      SELECT AVG(vertinimas) AS vidutinisvertinimas
      FROM ekskursiju_vertinimai
      WHERE ekskursija_id = ${ekskursija_id}
    `;
    res.json({ vidutinisVertinimas: result[0].vidutinisvertinimas });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Nepavyko gauti vidutinio vertinimo" });
  }
};