import { Router } from "express";

import {
  obtenerMedia,
  obtenermediaPorId,
  crearMedia,
} from "../controllers/media.controllers.js";

const router = Router();

router.get("/media", obtenerMedia);

router.get("/media/:id", obtenermediaPorId);

router.post("/media", crearMedia);

export default router;
