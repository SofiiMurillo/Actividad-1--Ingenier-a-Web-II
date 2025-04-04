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

export const crearDirector = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
      "INSERT INTO directores (nombres, estado, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.nombres, data.estado, data.fecha_creacion, data.fecha_actualizacion]
    );
    return res.json(rows[0]);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "El Director ya existe" });
    }
    return res.status(500).json({ message: "Error en el servidor interno" });
  }
};

export const eliminarDirector = async (req, res) => {
  try {
    const { id } = req.params;

    const { rowCount } = await pool.query(
      "DELETE FROM directores WHERE id = $1 RETURNING *",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Director no existente" });
    }

    return res
      .status(200)
      .json({ message: "Director eliminado correctamente" });
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({
        message:
          "No puedes eliminar este director porque está siendo utilizado en una producción.",
      });
    }

    console.error("Error al eliminar director:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const actualizarDirector = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    "UPDATE directores SET nombres = $1, estado = $2, fecha_creacion = $3, fecha_actualizacion = $4 WHERE id = $5 RETURNING *",
    [
      data.nombres,
      data.estado,
      data.fecha_creacion,
      data.fecha_actualizacion,
      id,
    ]
  );

  return res.json(rows[0]);
};
