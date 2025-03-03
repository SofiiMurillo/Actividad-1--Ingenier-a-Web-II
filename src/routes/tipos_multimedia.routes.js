import { Router } from "express";

import {
  obtenerTipos,
  obtenerDatosPorId,
  crearDato,
  eliminarDato,
  actualizarDatos,
} from "../controllers/tipos_multimedia.controllers.js";

const router = Router();

router.get("/tipos_multimedia", obtenerTipos);

router.get("/tipos_multimedia/:id", obtenerDatosPorId);

router.post("/tipos_multimedia", crearDato);

router.delete("/tipos_multimedia/:id", eliminarDato);

router.put("/tipos_multimedia/:id", actualizarDatos);

export default router;
