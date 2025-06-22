import { sql } from "../dbConnection.mjs";

// Sukuria naują ekskursiją
export const postEkskursija = async (ekskursijaData) => {
  // Leisk įrašyti tik tuos laukus, kurie yra lentelėje!
  const allowed = [
    "pavadinimas",
    "kaina",
    "data1",
    "data2",
    "trukme",
    "nuotrauka",
    "aprasymas"
      ];
  // Išfiltruojam tik leidžiamus laukus
  const filteredData = {};
  for (const key of allowed) {
    if (ekskursijaData[key] !== undefined) {
      filteredData[key] = ekskursijaData[key];
    }
  }
  const columns = Object.keys(filteredData);
  const ekskursija = await sql`
    INSERT INTO Ekskursios ${sql(filteredData, columns)}
    RETURNING *`;
    
  return ekskursija[0];
};

// Gauk visas ekskursijas
export const getEkskursijos = async () => {
  const ekskursijos = await sql`
    SELECT * FROM Ekskursios`;
  return ekskursijos;
};

// Gauk vieną ekskursiją pagal ID
export const getEkskursijaById = async (id) => {
  const ekskursija = await sql`
    SELECT * FROM Ekskursios WHERE id = ${id}`;
  return ekskursija[0];
};

// Atnaujina ekskursiją pagal ID
export const updateEkskursija = async (id, updatedData) => {
  // Leisk atnaujinti tik leidžiamus laukus
  const allowed = [
    "pavadinimas",
    "kaina",
    "data1",
    "data2",
    "trukme",
    "vertinimas",
    "nuotrauka",
    "aprasymas",
    "grupine"
  ];
  const filteredData = {};
  for (const key of allowed) {
    if (updatedData[key] !== undefined) {
      filteredData[key] = updatedData[key];
    }
  }
  const columns = Object.keys(filteredData);
  const updatedEkskursija = await sql`
    UPDATE Ekskursios SET ${sql(filteredData, columns)}
    WHERE id = ${id}
    RETURNING *`;
  return updatedEkskursija[0];
};

// Ištrina ekskursiją pagal ID
export const deleteEkskursija = async (id) => {
  const deletedEkskursija = await sql`
    DELETE FROM Ekskursios WHERE id = ${id}
    RETURNING *`;
  return deletedEkskursija[0];
};