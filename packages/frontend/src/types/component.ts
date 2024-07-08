export enum ComponentType {
  Text = "TEXT",
  Shape = "SHAPE",
  Video = "VIDEO",
  Image = "IMAGE",
}

export interface IComponent {
  id: string;
  x: number;
  y: number;
  z: number;
  opacity?: number;
  rotation?: number;
  type: ComponentType;
  width: number;
  height: number;
  toggleVisibility?: boolean;
  visible?: boolean;
  //touchable?: boolean;
  //hidden?: boolean;
}

export interface ITextComponent extends IComponent {
  textContent: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
}

export interface IShapeComponent extends IComponent {
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
