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
  try {
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
      .json({
        Message: "Productora eliminada correctamente",
      });
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({
        message:
          "No esta permitido eliminar este productora puesto que se esta utilizando en una producción."
      });
    }
    
    console.error("Error al eliminar el genero.", err);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}


export const actualizarProductora = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    "UPDATE productoras SET nombre = $1, estado= $2, slogan = $3, descripcion = $4, fecha_creacion = $5, fecha_actualizacion = $6 WHERE id = $7 RETURNING *",
    [
      data.nombre,
      data.estado,
      data.slogan,
      data.descripcion,
      data.fecha_creacion,
      data.fecha_actualizacion,
      id,
    ]
  )

  return res.json(rows[0]);
};
