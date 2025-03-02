import { Router } from "express";

import {
  obtenerDirectores,
  obtenerDirectoresPorId,
} from "../controllers/directores.controllers.js";

const router = Router();

router.get("/directores", obtenerDirectores);
router.get("/directores/:id", obtenerDirectores);

export default router;
