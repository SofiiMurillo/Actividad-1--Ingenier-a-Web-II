import { Router } from "express";

import {
  obtenerProductoras,
  obtenerProductorasPorId,
  crearProductora,
} from "../controllers/productoras.controllers.js";

const router = Router();

router.get("/productoras", obtenerProductoras);

router.get("/productoras/:id", obtenerProductorasPorId);

router.post("/productoras", crearProductora);

export default router;
