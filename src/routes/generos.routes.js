import { Router } from "express";

import {
  obtenerGeneros,
  obtenerGenerosPorId,
  crearGenero,
  eliminarGenero,
  actualizarGenero,
} from "../controllers/generos.controllers.js";

const router = Router();

router.get("/generos", obtenerGeneros);

router.get("/generos/:id", obtenerGenerosPorId);

router.post("/generos", crearGenero);

router.delete("/generos/:id", eliminarGenero);

router.put("/generos/:id", actualizarGenero);

export default router;
