import express from "express";
import { create,remove,update, getAll, getById, download } from "../controllers/document.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", authenticate, upload.single("file"), create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getById);
router.get("/:id/download", authenticate, download);
router.delete("/:id", authenticate, remove);
router.patch("/:id", authenticate, upload.single("file"), update);
export default router;