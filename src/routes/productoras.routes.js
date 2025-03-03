import { Router } from "express";

import { obtenerProductoras } from "../controllers/productoras.controllers.js";

const router = Router();

router.get("/productoras", obtenerProductoras);

export default router;
