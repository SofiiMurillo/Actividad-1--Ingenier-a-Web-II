import { Router } from "express";

import {
  obtenerDirectores,
  obtenerDirectoresPorId,
  crearDirector,
  eliminarDirector,
  actualizarDirector,
} from "../controllers/directores.controllers.js";

const router = Router();

router.get("/directores", obtenerDirectores);

router.get("/directores/:id", obtenerDirectoresPorId);

router.post("/directores", crearDirector);

router.delete("/directores/:id", eliminarDirector);

router.put("/directores/:id", actualizarDirector);

export default router;
