import { Router } from "express";

import { obtenerMedia } from "../controllers/media.controllers.js";

const router = Router();

router.get("/media", obtenerMedia);

export default router;
