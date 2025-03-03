import express from "express";
import { PORT } from "./config.js";
import generosRoutes from "./routes/generos.routes.js";
import directoresRoutes from "./routes/directores.routes.js";
import productorasroutes from "./routes/productoras.routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(generosRoutes);

app.use(directoresRoutes);

app.use(productorasroutes);

app.listen(PORT);
console.log("Server on port", PORT);
