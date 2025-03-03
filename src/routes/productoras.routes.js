import { Router } from "express";

import {
  obtenerProductoras,
  obtenerProductorasPorId,
  crearProductora,
  eliminarProductora,
  actualizarProductora,
} from "../controllers/productoras.controllers.js";

const router = Router();

router.get("/productoras", obtenerProductoras);

router.get("/productoras/:id", obtenerProductorasPorId);

router.post("/productoras", crearProductora);

router.delete("/productoras/:id", eliminarProductora);

router.put("/productoras/:id", actualizarProductora);

export default router;
