import { pool } from "../db.js";

export const obtenerGeneros = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM generos");
  res.json(rows);
};

export const obtenerGenerosPorId = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query("SELECT * FROM generos WHERE id = $1", [
    id,
  ]);

  if (rows.lenght === 0) {
    return res.status(404).json({ Message: "genero no existe" });
  }
  res.json(rows);
};

export const crearGenero = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const { rows } = await pool.query(
      "INSERT INTO generos (nombre, estado, descripcion, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        data.nombre,
        data.estado,
        data.descripcion,
        data.fecha_creacion,
        data.fecha_actualizacion,
      ]
    );
    return res.json(rows[0]);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "El nombre ya existe" });
    }
    return res.status(500).json({ message: "Error en el servidor interno" });
  }
};

export const eliminarGenero = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query(
    "DELETE FROM generos WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ Message: "Genero no existente" });
  }

  return res.status(200).json({ Message: "Genero eliminado correctamente" });
};

export const actualizarGenero = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    "UPDATE generos SET nombre = $1, estado = $2, descripcion = $3, fecha_creacion = $4, fecha_actualizacion = $5 WHERE id = $6 RETURNING *",
    [
      data.nombre,
      data.estado,
      data.descripcion,
      data.fecha_creacion,
      data.fecha_actualizacion,
      id,
    ]
  );

  return res.json(rows[0]);
};
