import { Request, Response } from "express";
import { getPresentationByIdHandler } from "../database/inMemoryStorage";

export const editPage = (req: Request, res: Response) => {
  const { presentationId, pageId } = req.params;
  const { content, orientation } = req.body;
  const presentation = getPresentationByIdHandler(presentationId);
  if (!presentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  const page = presentation.pages.find((page) => page.id === pageId);
  if (!page) {
    return res.status(404).json({ message: "Page not found" });
  }
  if (content) page.content = content;
  if (orientation) page.orientation = orientation;
  presentation.updatedAt = new Date();
  res.status(200).json(presentation);
};

export const deletePage = (req: Request, res: Response) => {
  const { presentationId, pageId } = req.params;
  const presentation = getPresentationByIdHandler(presentationId);
  if (!presentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  const pageIndex = presentation.pages.findIndex((page) => page.id === pageId);
  if (pageIndex === -1) {
    return res.status(404).json({ message: "Page not found" });
  }
  presentation.pages.splice(pageIndex, 1);
  presentation.updatedAt = new Date();
  res.status(200).json(presentation);
};
