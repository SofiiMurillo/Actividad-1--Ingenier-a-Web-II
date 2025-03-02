import { pool } from "../db.js";

export const obtenerDirectores = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM directores");
  res.json(rows);
};
export const obtenerDirectoresPorId = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query("SELECT * FROM directores WHERE id = $1", [
    id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ Message: "Director no existente" });
  }
  res.json(rows);
};
