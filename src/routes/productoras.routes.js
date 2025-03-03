import { Router } from "express";

import {
  obtenerProductoras,
  obtenerProductorasPorId,
} from "../controllers/productoras.controllers.js";

const router = Router();

router.get("/productoras", obtenerProductoras);

router.get("/productoras/:id", obtenerProductorasPorId);

export default router;
