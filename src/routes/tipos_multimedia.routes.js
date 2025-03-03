import { Router } from "express";

import {
  obtenerTipos,
  obtenerDatosPorId,
  crearDato,
} from "../controllers/tipos_multimedia.controllers.js";

const router = Router();

router.get("/tipos_multimedia", obtenerTipos);
router.get("/tipos_multimedia/:id", obtenerDatosPorId);
router.post("/tipos_multimedia", crearDato);
export default router;
