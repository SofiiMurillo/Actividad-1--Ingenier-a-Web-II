import { pool } from "../db.js";

export const obtenerTipos = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM tipos_multimedia");
  res.json(rows);
};
