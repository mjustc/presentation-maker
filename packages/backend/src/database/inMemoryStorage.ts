import {
  ComponentType,
  IImageComponent,
  IShapeComponent,
  ITextComponent,
  IVideoComponent,
} from "../types/component";
import { PageOrientation } from "../types/page";
import { IPresentation } from "../types/presentation";
import { v4 as uuidv4 } from "uuid";

const presentations = new Map<string, IPresentation>();

export const addPresentation = (presentation: IPresentation) => {
  presentations.set(presentation.title, presentation);
};

export const getPresentations = (): IPresentation[] => {
  return Array.from(presentations.values());
};

export const getPresentationByIdHandler = (
  id: string
): IPresentation | undefined => {
  return presentations.get(id);
};

export const updatePresentation = (
  id: string,
  updatedPresentation: IPresentation
): IPresentation | undefined => {
  const presentation = presentations.get(id);
  if (presentation) {
    const updated = {
      ...presentation,
      ...updatedPresentation,
      updatedAt: new Date(),
    };

    updated.pages = updated.pages.map((page) => {
      const updatedPage = updatedPresentation.pages.find(
        (p) => p.id === page.id
      );
      if (updatedPage) {
        return {
          ...page,
          ...updatedPage,
          content: updatedPage.content.map((component) => {
            const existingComponent = page.content.find(
              (c) => c.id === component.id
            );
            return existingComponent
              ? { ...existingComponent, ...component }
              : component;
          }),
        };
      }
      return page;
    });

    presentations.set(id, updated);
    return updated;
  }
  return undefined;
};

export const deletePresentationHandler = (id: string): boolean => {
  return presentations.delete(id);
};

export const initializePresentations = () => {
  const samplePresentations: IPresentation[] = [
    {
      title: "Sample Presentation 1 - Hello World",
      size: "A4",
      pages: [
        {
          id: uuidv4(),
          content: [
            {
              id: "1",
              x: 430,
              y: 200,
              z: 2,
              textContent: "Hello World",
              textColor: "green",
              fontSize: 80,
              fontFamily: "Impact",
              type: ComponentType.Text,
            } as ITextComponent,
            {
              id: "2",
              x: 130,
              y: 130,
              z: 1,
              width: 800,
              height: 500,
              backgroundColor: "blue",
              shapeType: "square",
              type: ComponentType.Shape,
            } as IShapeComponent,
          ],
          orientation: PageOrientation.HORIZONTAL,
        },
        {
          id: uuidv4(),
          content: [
            {
              id: "3",
              x: 100,
              y: 50,
              z: 2,
              textContent: "Transparent Text",
              textColor: "#800080",
              fontFamily: "Brush Script MT",
              fontSize: 100,
              opacity: 0.3,
              type: "TEXT",
            } as ITextComponent,
            {
              id: "4",
              x: 500,
              y: 400,
              z: 2,
              textContent: "Rotated Text",
              textColor: "purple",
              fontFamily: "Brush Script MT",
              fontSize: 100,
              rotation: 45,
              type: "TEXT",
            } as ITextComponent,
          ],
          orientation: PageOrientation.HORIZONTAL,
        },
        {
          id: uuidv4(),
          content: [
            {
              id: "5",
              x: 0,
              y: 0,
              z: 2,
              width: 460,
              height: 700,
              src: "/cat.jpg",
              type: "IMAGE",
              visible: true,
            } as IImageComponent,
            // {
            //   id: "6",
            //   x: 400,
            //   y: 100,
            //   z: 2,
            //   textContent: "This shapes are overlapping",
            //   textColor: "grey",
            //   fontFamily: "Brush Script MT",
            //   fontSize: 100,
            //   type: "TEXT",
            // } as ITextComponent,
            // {
            //   id: "7",
            //   x: 700,
            //   y: 250,
            //   z: 3,
            //   width: 100,
            //   height: 100,
            //   backgroundColor: "#007bff",
            //   shapeType: "circle",
            //   opacity: 0.5,
            //   fontSize: 100,
            //   type: "SHAPE",
            // } as IShapeComponent,
            // {
            //   id: "8",
            //   x: 700,
            //   y: 250,
            //   z: 2,
            //   width: 600,
            //   height: 300,
            //   backgroundColor: "#808000",
            //   shapeType: "square",
            //   fontSize: 100,
            //   type: "SHAPE",
            // } as IShapeComponent,
          ],
          orientation: PageOrientation.HORIZONTAL,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Sample Presentation 2 - Videos",
      size: "A4",
      pages: [
        {
          id: uuidv4(),
          content: [
            {
              id: "5",
              x: 220,
              y: 200,
              z: 2,
              fontFamily: "Brush Script MT",
              fontSize: 50,
              textContent: "This video is autoplaying",
              textColor: "#FFBF00",
              type: "TEXT",
            } as ITextComponent,
            {
              id: "5",
              x: 200,
              y: 200,
              z: 1,
              src: "/video-1.mp4",
              type: "VIDEO",
              autoplay: true,
            } as IVideoComponent,
          ],
          orientation: PageOrientation.HORIZONTAL,
        },
        {
          id: uuidv4(),
          content: [
            {
              id: "5",
              x: 220,
              y: 100,
              z: 2,
              fontFamily: "Brush Script MT",
              fontSize: 50,
              textContent: "You must click to play this video",
              textColor: "#CCCCFF",
              type: "TEXT",
            } as ITextComponent,
            {
              id: "5",
              x: 200,
              y: 200,
              z: 1,
              height: 400,
              width: 600,
              src: "/video-2.mp4",
              type: "VIDEO",
              autoplay: false,
            } as IVideoComponent,
          ],
          orientation: PageOrientation.HORIZONTAL,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Sample Presentation 3 - Image",
      size: "A4",
      pages: [
        {
          id: uuidv4(),
          content: [
            {
              id: "5",
              x: 220,
              y: 100,
              z: 2,
              fontFamily: "Brush Script MT",
              fontSize: 50,
              textContent: "You must click to show an image",
              textColor: "#CCCCFF",
              type: "TEXT",
            } as ITextComponent,
            {
              id: "5",
              x: 100,
              y: 40,
              z: 1,
              height: 500,
              width: 550,
              src: "/alaric-duan.jpg",
              type: "IMAGE",
              visible: false,
              toggleVisibility: true,
            } as IImageComponent,
          ],
          orientation: PageOrientation.HORIZONTAL,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  samplePresentations.forEach(addPresentation);
};
