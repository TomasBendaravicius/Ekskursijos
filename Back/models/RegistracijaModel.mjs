import { sql } from "../dbConnection.mjs";

export const createRegistracija = async ({ user_id, ekskursija_id, pasirinkta_data }) => {
  const [registracija] = await sql`
    INSERT INTO registracijos (user_id, ekskursija_id, pasirinkta_data)
    VALUES (${user_id}, ${ekskursija_id}, ${pasirinkta_data})
    RETURNING *`;
  return registracija;
};

export const getVisosRegistracijos = async () => {
  return await sql`
    SELECT * FROM registracijos
  `;
};

export const getRegistracijosByUser = async (user_id) => {
  return await sql`
    SELECT r.*, e.pavadinimas, e.data1, e.data2, e.kaina, e.aprasymas
    FROM registracijos r
    JOIN ekskursios e ON r.ekskursija_id = e.id
    WHERE r.user_id = ${user_id}
  `;
};
export const updateRegistracija = async (id, { komentaras, pasirinkta_data }) => {
  return await sql`
    UPDATE registracijos
    SET komentaras = ${komentaras}, pasirinkta_data = ${pasirinkta_data}
    WHERE id = ${id}
  `;
};

export const deleteRegistracija = async (id) => {
  await sql`DELETE FROM registracijos WHERE id = ${id}`;
};




export const getRegistracijos = async (req, res) => {
  const rows = await sql`
    SELECT r.*, 
           e.pavadinimas, e.aprasymas, e.kaina, e.data1, e.data2
    FROM registracijos r
    JOIN ekskursios e ON r.ekskursija_id = e.id
    WHERE r.user_id = ${req.user.id}
  `;

  console.log("SQL rows:", rows);
  
  const registracijos = rows.map(r => {
    const { pavadinimas, aprasymas, kaina, data1, data2, ...rest } = r;
    return {
      ...rest,
      ekskursija: {
        pavadinimas,
        aprasymas,
        kaina,
        data1,
        data2,
      }
    };
  });

  res.status(200).json({
    status: "success",
    data: { registracijos },
  });
};