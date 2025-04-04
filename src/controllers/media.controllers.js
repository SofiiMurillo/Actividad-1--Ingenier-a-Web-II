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
    console.log("data.genero_id", data.genero_id);
    const requiredFields = [
      "serial",
      "titulo",
      "sinopsis",
      "url_pelicula",
      "imagen_portada",
      "ano_estreno",
      "fecha_creacion",
      "fecha_actualizacion",
      "genero_id",
      "director_id",
      "productora_id",
      "tipo_id",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return res
          .status(400)
          .json({ message: `El campo ${field} es requerido` });
      }
    }
    const idFields = ["genero_id", "director_id", "productora_id", "tipo_id"];
    for (const field of idFields) {
      if (!Number.isInteger(Number(data[field]))) {
        return res.status(400).json({
          message: `El campo ${field} debe ser un número entero válido`,
        });
      }
    }

    const directorQuery = await pool.query(
      "SELECT id FROM directores WHERE id = $1 AND estado = 'Activo'",
      [data.director_id]
    );

    if (directorQuery.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "El director no existe o no está activo" });
    }
    console.log("********entrando");
    const generoQuery = await pool.query(
      "SELECT id FROM generos WHERE id = $1 AND estado = 'Activo'",
      [data.genero_id]
    );
    //console.log("********generoQuery", generoQuery);
    console.log("********generoQuery", generoQuery.rows.length);

    if (generoQuery.rows.length === 0) {
      console.log("********generoQuery", generoQuery.rows.length);

      return res
        .status(400)
        .json({ Message: "El genero no existe o no está activo" });
    }
    console.log("********saliendo");

    const productoraQuery = await pool.query(
      "SELECT id FROM productoras WHERE id = $1 AND estado = 'Activo'",
      [data.productora_id]
    );

    if (productoraQuery.rows.length === 0) {
      return res
        .status(400)
        .json({ Message: "La productora no existe o esta inactiva" });
    }

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

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log("********ERROR", error);
    if (error.code === "23505") {
      return res.status(409).json({ message: "El serial ingresado ya existe" });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        message: "Uno de los IDs proporcionados no existe en la base de datos",
      });
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
    return res
      .status(404)
      .json({ Message: "El serial ingresado ya no existe" });
  }

  return res.status(200).json({ Message: "Dato eliminado correctamente" });
};

export const actualizarMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const requiredFields = [
      "serial",
      "titulo",
      "sinopsis",
      "url_pelicula",
      "imagen_portada",
      "ano_estreno",
      "fecha_creacion",
      "fecha_actualizacion",
      "genero_id",
      "director_id",
      "productora_id",
      "tipo_id",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return res
          .status(400)
          .json({ message: `El campo ${field} es requerido` });
      }
    }

    const idFields = ["genero_id", "director_id", "productora_id", "tipo_id"];
    for (const field of idFields) {
      if (!Number.isInteger(Number(data[field]))) {
        return res.status(400).json({
          message: `El campo ${field} debe ser un número entero válido`,
        });
      }
    }

    const directorQuery = await pool.query(
      "SELECT id FROM directores WHERE id = $1 AND estado = 'Activo'",
      [data.director_id]
    );

    if (directorQuery.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "El director no existe o no está activo" });
    }

    const generoQuery = await pool.query(
      "SELECT id FROM generos WHERE id = $1 AND estado = 'Activo'",
      [data.genero_id]
    );

    if (generoQuery.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "El género no existe o no está activo" });
    }

    const productoraQuery = await pool.query(
      "SELECT id FROM productoras WHERE id = $1 AND estado = 'Activo'",
      [data.productora_id]
    );

    if (productoraQuery.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "La productora no existe o está inactiva" });
    }

    const { rows } = await pool.query(
      "UPDATE media SET serial = $1, titulo = $2, sinopsis = $3, url_pelicula = $4, imagen_portada = $5, ano_estreno = $6, fecha_creacion = $7, fecha_actualizacion = $8, genero_id = $9, director_id = $10, productora_id = $11, tipo_id = $12 WHERE id = $13 RETURNING *",
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
        id,
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Media no encontrada" });
    }

    return res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "El serial ingresado ya existe" });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        message: "Uno de los IDs proporcionados no existe en la base de datos",
      });
    }

    return res.status(500).json({ message: "Error en el servidor interno" });
  }
};
