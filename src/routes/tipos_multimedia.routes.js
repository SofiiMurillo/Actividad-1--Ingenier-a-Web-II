import { Router } from "express";

import {
  obtenerTipos,
  obtenerDatosPorId,
} from "../controllers/tipos_multimedia.controllers.js";

const router = Router();

router.get("/tipos_multimedia", obtenerTipos);
router.get("/tipos_multimedia/:id", obtenerDatosPorId);

export default router;
