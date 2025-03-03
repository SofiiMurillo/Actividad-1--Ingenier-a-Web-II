import { Router } from "express";

import {
  obtenerMedia,
  obtenermediaPorId,
} from "../controllers/media.controllers.js";

const router = Router();

router.get("/media", obtenerMedia);
router.get("/media/:id", obtenermediaPorId);

export default router;
