import { sql } from "../dbConnection.mjs";

export const createTables = async () => {
  await sql`
    CREATE TABLE Ekskursios (
      id int,
      pavadinimas varchar(255),
      trukme varchar(255),
      kaina varchar(255),
      data1 varchar(255),
      data2 varchar(255),
      vertinimas varchar(255),
      nuotrauka varchar(255),
      aprasymas text,
      grupine boolean DEFAULT false,
    );
  `;

  await sql.end();
};

createTables();
