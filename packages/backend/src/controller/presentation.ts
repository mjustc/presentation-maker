import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { IPresentation, IPresentationSummary } from "../types/presentation";
import { IComponent } from "../types/component";
import {
  addPresentation,
  deletePresentationHandler,
  getPresentationByIdHandler,
  getPresentations,
  updatePresentation,
} from "../database/inMemoryStorage";
import { PageOrientation } from "../types/page";
import { PresentationMapper } from "./mapper/dtos";

export const createPresentation = (req: Request, res: Response) => {
  const {
    title,
    size,
    orientation,
  }: { title: string; size?: string; orientation?: PageOrientation } = req.body;

  const existingPresentation = getPresentations().find(
    (p: { title: string }) => p.title === title
  );

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (existingPresentation) {
    return res
      .status(400)
      .json({ message: "Presentation title must be unique" });
  }

  const newPresentation: IPresentation = {
    title: title,
    size: size || "A4",
    pages: [
      {
        id: uuidv4(),
        content: [] as IComponent[],
        orientation: orientation || PageOrientation.HORIZONTAL,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  addPresentation(newPresentation);

  const presentationSummary: IPresentationSummary = {
    title: newPresentation.title,
    updatedAt: newPresentation.updatedAt,
  };

  res.status(201).json(presentationSummary);
};

export const getAllPresentationsIds = (_req: Request, res: Response) => {
  const presentations = getPresentations()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((presentation: IPresentationSummary) => {
      return {
        title: presentation.title,
        updatedAt: presentation.updatedAt,
      };
    });

  res.status(200).json(presentations);
};

export const getPresentationById = (req: Request, res: Response) => {
  const { id } = req.params;
  const presentation: IPresentation | undefined =
    getPresentationByIdHandler(id);
  if (!presentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  res.status(200).json(presentation);
};

export const editPresentation = (req: Request, res: Response) => {
  const { id } = req.params;
  const mapped = PresentationMapper.fromPlainObject(req.body);
  const updatedPresentation = updatePresentation(id, mapped);
  if (!updatedPresentation) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  res.status(200).json(updatedPresentation);
};

export const deletePresentation = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = deletePresentationHandler(id);
  if (!deleted) {
    return res.status(404).json({ message: "Presentation not found" });
  }
  res.status(200).json({ message: "Presentation deleted successfully" });
};
