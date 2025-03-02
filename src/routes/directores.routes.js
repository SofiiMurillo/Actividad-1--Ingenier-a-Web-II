import { Router } from "express";

import { obtenerDirectores } from "../controllers/directores.controllers.js";

const router = Router();

router.get("/directores", obtenerDirectores);

export default router;
