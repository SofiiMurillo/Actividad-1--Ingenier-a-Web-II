import express from "express";
import { PORT } from "./config.js";
import { pool } from "./db.js"; // Importa el pool de conexiones
import generosRoutes from "./routes/generos.routes.js";
import directoresRoutes from "./routes/directores.routes.js";
import productorasroutes from "./routes/productoras.routes.js";
import tipos_multimedia from "./routes/tipos_multimedia.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
// const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa:", res.rows[0]);
  }
});

app.use(generosRoutes);
app.use(directoresRoutes);
app.use(productorasroutes);
app.use(tipos_multimedia);
app.use(mediaRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
