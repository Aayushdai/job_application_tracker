import express from "express";
import { create, getAll, getById, update, remove } from "../controllers/company.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getById);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);
export default router;