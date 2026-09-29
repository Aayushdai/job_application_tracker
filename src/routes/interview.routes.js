import express from "express";
import { create, getAll,remove, getById, update } from "../controllers/interview.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:applicationId", authenticate, create);
router.get("/:applicationId", authenticate, getAll);
router.get("/:applicationId/:id", authenticate, getById);
// router.put("/applications/:applicationId/:id", authenticate, update);
router.patch("/:applicationId/:id", authenticate, update);
router.delete("/:applicationId/:id", authenticate, remove);

export default router;