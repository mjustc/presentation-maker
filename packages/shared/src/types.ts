// export type PageOrientation = "vertical" | "horizontal";

// // consider adding a page the order
// export interface IPage {
//   id: string;
//   content: IComponent[];
//   orientation: PageOrientation;
//   backgroundColor?: string;
//   transparency?: number;
//   // size: string; // As all the pages are the same size, it is not necessary. It depends on size of the presentation
// }

// export interface IPresentation {
//   id: string;
//   title: string;
//   size: string; // 'A4'
//   pages: IPage[];
//   createdAt: Date;
//   updatedAt: Date;
// }
// export enum ComponentType {
//   Text = "TEXT",
//   Shape = "SHAPE",
//   Video = "VIDEO",
//   Image = "IMAGE",
// }

// export interface IComponent {
//   id: string;
//   x: number;
//   y: number;
//   z: number;
//   width: number;
//   height: number;
//   transparency?: number;
//   touchable?: boolean;
//   hidden?: boolean;
//   rotation?: number;
//   type: ComponentType;
// }

// export interface ITextComponent extends IComponent {
//   textContent: string;
//   textColor: string;
// }

// export interface IShapeComponent extends IComponent {
//   backgroundColor: string;
//   shapeType: "square" | "circle";
// }

// export interface IVideoComponent extends IComponent {
//   autoplay: boolean;
// }

// export interface IImageComponent extends IComponent {
//   url: string;
// }

