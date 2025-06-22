import { sql } from "../dbConnection.mjs";

export const registracijos = async () => {
  await sql`
    CREATE TABLE registracijos (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES ekskursijosusers(id),
      ekskursija_id INTEGER REFERENCES ekskursios(id),
      pasirinkta_data DATE,
      komentaras TEXT,
      dalyvauta BOOLEAN DEFAULT FALSE
    );
  `;

  await sql.end();
};

registracijos();

//paleidimo kodas
//node tables/registracijos.mjs