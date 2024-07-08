import { IComponent } from "./component";

export enum PageOrientation {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

// consider adding a page the order
export interface IPage {
  id: string;
  content: IComponent[];
  orientation: PageOrientation;
  backgroundColor?: string;
  transparency?: number;
}
