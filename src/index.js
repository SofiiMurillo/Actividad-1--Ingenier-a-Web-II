import express from "express";
import { PORT } from "./config.js";
import generosRoutes from "./routes/generos.routes.js";
import directoresRoutes from "./routes/directores.routes.js";
import productorasroutes from "./routes/productoras.routes.js";
import tipos_multimedia from "./routes/tipos_multimedia.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(generosRoutes);

app.use(directoresRoutes);

app.use(productorasroutes);

app.use(tipos_multimedia);

app.use(mediaRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
