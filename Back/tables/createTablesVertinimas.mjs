import { sql } from "../dbConnection.mjs";

export const createTablesVertinimas = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS ekskursiju_vertinimai (
      id SERIAL PRIMARY KEY,
      ekskursija_id INTEGER REFERENCES ekskursios(id) ON DELETE CASCADE,
      vertinimas INTEGER NOT NULL CHECK (vertinimas BETWEEN 1 AND 10)
    );
  `;

  await sql.end();
};

createTablesVertinimas();