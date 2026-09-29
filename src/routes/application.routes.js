import express from "express";
import {create, remove,getAll,getById ,update }  from "../controllers/application.controller.js"
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getById);
router.patch("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);

export default router;