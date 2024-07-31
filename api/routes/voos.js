import express from "express";
import { getVoos, addVoo, updateVoo, deleteVoo } from "../controllers/voo.js";

const router = express.Router();

router.get("/", getVoos);

router.post("/", addVoo);

router.put("/:id", updateVoo);

router.delete("/:id", deleteVoo);

export default router;