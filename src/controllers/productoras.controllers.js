import { pool } from "../db.js";

export const obtenerProductoras = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM productoras");
  res.json(rows);
};

export const obtenerProductorasPorId = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query("SELECT * FROM productoras WHERE id = $1", [
    id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ Message: "productora no existente" });
  }
  res.json(rows);
};
