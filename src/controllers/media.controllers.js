import { pool } from "../db.js";

export const obtenerMedia = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM media");
  res.json(rows);
};

export const obtenermediaPorId = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query("SELECT * FROM media WHERE id = $1", [id]);

  if (rows.lenght === 0) {
    return res.status(404).json({ Message: "Datos no existe" });
  }
  res.json(rows);
};
