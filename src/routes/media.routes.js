import { Router } from "express";

import {
  obtenerMedia,
  obtenermediaPorId,
  crearMedia,
  eliminarMedia,
} from "../controllers/media.controllers.js";

const router = Router();

router.get("/media", obtenerMedia);

router.get("/media/:id", obtenermediaPorId);

router.post("/media", crearMedia);

router.delete("/media/:id", eliminarMedia);

export default router;
