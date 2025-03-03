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

export const crearDato = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const { rows } = await pool.query(
      "INSERT INTO tipos_multimedia (nombre, descripcion, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        data.nombre,
        data.descripcion,
        data.fecha_creacion,
        data.fecha_actualizacion,
      ]
    );
    return res.json(rows[0]);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "El dato ya existe" });
    }
    return res.status(500).json({ message: "Error en el servidor interno" });
  }
};
