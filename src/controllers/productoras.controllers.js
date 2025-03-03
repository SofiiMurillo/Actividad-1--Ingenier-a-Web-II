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

export const crearProductora = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const { rows } = await pool.query(
      "INSERT INTO productoras (nombre, estado, slogan, descripcion, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        data.nombre,
        data.estado,
        data.slogan,
        data.descripcion,
        data.fecha_creacion,
        data.fecha_actualizacion,
      ]
    );
    return res.json(rows[0]);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "El productor ya existe" });
    }
    return res.status(500).json({ message: "Error en el servidor interno" });
  }
};

export const eliminarProductora = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query(
    "DELETE FROM productoras WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ Message: "Productora no existente" });
  }
  return res
    .status(200)
    .json({ Message: "Productora eliminada corretcamente" });
};
