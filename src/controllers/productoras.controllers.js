import { pool } from "../db.js";

export const obtenerProductoras = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM productoras");
  res.json(rows);
};
