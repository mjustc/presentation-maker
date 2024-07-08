import { IComponent } from "./component";

export enum PageOrientation {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export interface IPage {
  id: string;
  content: IComponent[];
  orientation: PageOrientation;
  backgroundColor?: string;
  transparency?: number;
}
