import React, { useState } from "react";

import {
  generateUniqueId,
  readImageFile,
  readVideoFile,
} from "../../utils/helper";
import {
  ComponentType,
  IComponent,
  IImageComponent,
  IShapeComponent,
  ITextComponent,
  IVideoComponent,
} from "../../types/component";

interface ComponentPanelProps {
  addComponent: (component: IComponent) => void;
}

const ComponentPanel: React.FC<ComponentPanelProps> = ({ addComponent }) => {
  const [showFileInput, setShowFileInput] = useState(false);

  const handleAddComponent = (componentType: string) => {
    const newComponentId = generateUniqueId();
    switch (componentType) {
      case ComponentType.Text:
        const newTextComponent: ITextComponent = {
          id: newComponentId,
          type: ComponentType.Text,
          x: 5,
          y: 5,
          z: 0,
          textColor: "black",
          textContent: "New Text",
          fontSize: 20,
          fontFamily: "Arial",
          width: 100,
          height: 100,
        };

        addComponent(newTextComponent);
        break;
      case ComponentType.Shape:
        const newShapeComponent: IShapeComponent = {
          id: newComponentId,
          type: ComponentType.Shape,
          x: 5,
          y: 5,
          z: 0,
          width: 100,
          height: 100,
          backgroundColor: "blue",
          shapeType: "circle",
        };
        addComponent(newShapeComponent);
        break;
      default:
        return;
    }
  };

  const addImageComponent = async (file: File) => {
    try {
      const img = await readImageFile(file);
      const newComponent: IImageComponent = {
        id: Date.now().toString(),
        type: ComponentType.Image,
        src: img.src,
        x: 0,
        y: 0,
        z: 0,
        width: img.width * 0.5,
        height: img.height * 0.5,
        visible: true,
      };
      addComponent(newComponent);
    } catch (error) {
      console.error("Error loading image", error);
    }
  };

  const addVideoComponent = async (file: File) => {
    try {
      const video = await readVideoFile(file);

      const newComponent: IVideoComponent = {
        id: Date.now().toString(),
        type: ComponentType.Video,
        src: video.src,
        x: 0,
        y: 0,
        z: 0,
        width: video.width,
        height: video.height,
        autoplay: false,
      };

      addComponent(newComponent);
    } catch (error) {
      console.error("Error loading video", error);
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit");
        return;
      }

      if (file.type.startsWith("image")) {
        addImageComponent(file);
      } else if (file.type.startsWith("video")) {
        addVideoComponent(file);
      }

      setShowFileInput(false);
    }
  };

  return (
    <div className="component-panel">
      <h3>Add Component</h3>
      <button
        className="button"
        onClick={() => handleAddComponent(ComponentType.Text)}
      >
        Add Text
      </button>
      <button
        className="button"
        onClick={() => handleAddComponent(ComponentType.Shape)}
      >
        Add Shape
      </button>
      <button
        className="button"
        onClick={() => {
          showFileInput === true
            ? setShowFileInput(false)
            : setShowFileInput(true);
        }}
      >
        Add Media
      </button>
      {showFileInput && (
        <input
          type="file"
          onChange={handleFileInput}
          style={{ display: "block", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default ComponentPanel;
