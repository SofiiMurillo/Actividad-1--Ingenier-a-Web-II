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

export const crearMedia = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const { rows } = await pool.query(
      "INSERT INTO media (serial, titulo, sinopsis, url_pelicula, imagen_portada, ano_estreno, fecha_creacion, fecha_actualizacion, genero_id, director_id, productora_id, tipo_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        data.serial,
        data.titulo,
        data.sinopsis,
        data.url_pelicula,
        data.imagen_portada,
        data.ano_estreno,
        data.fecha_creacion,
        data.fecha_actualizacion,
        data.genero_id,
        data.director_id,
        data.productora_id,
        data.tipo_id,
      ]
    );
    return res.json(rows[0]);
  } catch (error) {
    console.log("///error", error);
    if (error?.code === "23505") {
      return res.status(409).json({ Message: "El dato ya existe" });
    }
    return res.status(500).json({ message: "Error en el servidor interno" });
  }
};

export const eliminarMedia = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query(
    "DELETE FROM media WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ Message: "Dato no existente" });
  }

  return res.status(200).json({ Message: "Dato eliminado correctamente" });
};
