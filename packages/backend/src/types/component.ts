export enum ComponentType {
  Text = "TEXT",
  Shape = "SHAPE",
  Video = "VIDEO",
  Image = "IMAGE",
}

export interface IComponent {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  z: number;
  opacity?: number;
  rotation?: number;
  width?: number;
  height?: number;
  toggleVisibility?: boolean;
  visible?: boolean;
}

export interface ITextComponent extends IComponent {
  textContent: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
}

export interface IShapeComponent extends IComponent {
  width: number;
  height: number;
  backgroundColor: string;
  shapeType: "square" | "circle" | "rectangle";
}

export interface IVideoComponent extends IComponent {
  autoplay: boolean;
  src: string;
}

export interface IImageComponent extends IComponent {
  src: string;
}
