import { IPage } from "./page";

export interface IPresentation {
  title: string;
  size: string; // by standard 'A4'
  pages: IPage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPresentationSummary {
  title: string;
  updatedAt: Date;
}
