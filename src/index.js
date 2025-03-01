import express from "express";
import { PORT } from "./config.js";

import generosRoutes from "./routes/generos.routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(generosRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
