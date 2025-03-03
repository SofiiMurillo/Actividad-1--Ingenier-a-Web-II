import { pool } from "../db.js";

export const obtenerMedia = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM media");
  res.json(rows);
};
