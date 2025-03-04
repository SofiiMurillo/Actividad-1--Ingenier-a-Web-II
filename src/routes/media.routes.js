import { Router } from "express";

import {
  obtenerMedia,
  obtenermediaPorId,
  crearMedia,
  eliminarMedia,
  actualizarMedia,
} from "../controllers/media.controllers.js";

const router = Router();

router.get("/media", obtenerMedia);

router.get("/media/:id", obtenermediaPorId);

router.post("/media", crearMedia);

router.delete("/media/:id", eliminarMedia);

router.put("/media/:id", actualizarMedia);

export default router;
