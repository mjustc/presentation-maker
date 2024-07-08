import {
  ComponentType,
  IComponent,
  IImageComponent,
  IShapeComponent,
  ITextComponent,
  IVideoComponent,
} from "../../types/component";
import { IPage, PageOrientation } from "../../types/page";
import { IPresentation } from "../../types/presentation";

export class ComponentMapper {
  static fromPlainObject(obj: IComponent): IComponent {
    const component: IComponent = {
      id: obj.id || "",
      x: obj.x || 0,
      y: obj.y || 0,
      z: obj.z || 0,
      width: obj.width || 100,
      height: obj.height || 100,
      type: obj.type || "",
      opacity: obj.opacity || 1,
      rotation: obj.rotation || 0,
    };

    if (component.type === ComponentType.Text) {
      const textComponent: ITextComponent = {
        ...component,
        textContent: (obj as ITextComponent).textContent || "",
        textColor: (obj as ITextComponent).textColor || "",
        fontSize: (obj as ITextComponent).fontSize || 0,
        fontFamily: (obj as ITextComponent).fontFamily || "",
      };
      return textComponent;
    }

    if (component.type === ComponentType.Image) {
      const imageComponent: IImageComponent = {
        ...component,
        src: (obj as IImageComponent).src || "",
        width: (obj as IImageComponent).width || 0,
        height: (obj as IImageComponent).height || 0,
        visible: (obj as IImageComponent).visible || true,
        toggleVisibility: (obj as IImageComponent).toggleVisibility || false,
      };
      return imageComponent;
    }

    if (component.type === ComponentType.Shape) {
      const shapeComponent: IShapeComponent = {
        ...component,
        backgroundColor: (obj as IShapeComponent).backgroundColor || "blue",
        shapeType: (obj as IShapeComponent).shapeType || "square",
        width: (obj as IShapeComponent).width || 0,
        height: (obj as IShapeComponent).height || 0,
      };
      return shapeComponent;
    }

    if (component.type === ComponentType.Video) {
      const videoComponent: IVideoComponent = {
        ...component,
        src: (obj as IVideoComponent).src || "",
        autoplay: (obj as IVideoComponent).autoplay || false,
      };
      return videoComponent;
    }

    return component;
  }
}

export class PageMapper {
  static fromPlainObject(obj: IPage): IPage {
    const page: IPage = {
      id: obj.id || "",
      content: obj.content.map(ComponentMapper.fromPlainObject),
      orientation: PageOrientation.HORIZONTAL,
    };
    return page;
  }
}

export class PresentationMapper {
  static fromPlainObject(obj: any): IPresentation {
    const presentation: IPresentation = {
      title: obj.title || "",
      size: obj.size || "",
      pages: obj.pages.map(PageMapper.fromPlainObject),
      createdAt: new Date(obj.createdAt),
      updatedAt: new Date(obj.updatedAt),
    };
    return presentation;
  }
}
