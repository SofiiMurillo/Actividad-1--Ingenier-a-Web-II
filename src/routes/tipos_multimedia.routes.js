import { Router } from "express";

import { obtenerTipos } from "../controllers/tipos_multimedia.controllers.js";

const router = Router();

router.get("/tipos_multimedia", obtenerTipos);

export default router;
