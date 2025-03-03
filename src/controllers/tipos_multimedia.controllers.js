import { pool } from "../db.js";

export const obtenerTipos = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM tipos_multimedia");
  res.json(rows);
};

export const obtenerDatosPorId = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM tipos_multimedia WHERE id = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ Message: "Tipo no existente" });
  }
  res.json(rows);
};
