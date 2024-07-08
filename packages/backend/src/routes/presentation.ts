import express, { Request, Response } from "express";
import {
  createPresentation,
  getPresentationById,
  editPresentation,
  deletePresentation,
  getAllPresentationsIds,
} from "../controller/presentation";

const router = express.Router();

router.post("/presentations", createPresentation);
router.get("/presentations", getAllPresentationsIds);
router.get("/presentations/:id", getPresentationById);
router.put("/presentations/:id", editPresentation);
router.delete("/presentations/:id", deletePresentation);

export default router;
