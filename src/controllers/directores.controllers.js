import { pool } from "../db.js";

export const obtenerDirectores = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM directores");
  res.json(rows);
};
