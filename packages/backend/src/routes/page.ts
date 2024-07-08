import express, { Request, Response } from "express";
import { editPage, deletePage } from "../controller/page";

const router = express.Router();

router.put("/presentations/:presentationId/pages/:pageId", editPage);
router.delete("/presentations/:presentationId/pages/:pageId", deletePage);

export default router;
