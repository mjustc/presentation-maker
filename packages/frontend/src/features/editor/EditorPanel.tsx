import React, { useState } from "react";
import TextEditor from "./TextEditor";
import ShapeEditor from "./ShapeEditor";
import {
  IComponent,
  IShapeComponent,
  ITextComponent,
} from "../../types/component";

interface EditorPanelProps {
  selectedComponent: IComponent | undefined;
  onPropertyChange: (property: string, value: any) => void;
  onRemoveComponent: (id: string) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  selectedComponent,
  onPropertyChange,
  onRemoveComponent,
}) => {
  const [editedHeight, setEditedHeight] = useState<number | undefined>(
    undefined
  );
  const [editedWidth, setEditedWidth] = useState<number | undefined>(undefined);
  const [editedTransparency, setEditedTransparency] = useState<
    number | undefined
  >(undefined);
  const [editedRotation, setEditedRotation] = useState<number | undefined>(
    undefined
  );
  const [editedX, setEditedX] = useState<number | undefined>(undefined);
  const [editedY, setEditedY] = useState<number | undefined>(undefined);
  const [editedZ, setEditedZ] = useState<number | undefined>(undefined);

  const handleHeightChange = (delta: number) => {
    const newHeight =
      (editedHeight || selectedComponent?.height || 100) + delta;
    setEditedHeight(newHeight);
    onPropertyChange("height", newHeight);
  };

  const handleWidthChange = (delta: number) => {
    const newWidth = (editedWidth || selectedComponent?.width || 100) + delta;
    setEditedWidth(newWidth);
    onPropertyChange("width", newWidth);
  };

  const handleXChange = (delta: number) => {
    const newX = (editedX || selectedComponent?.x || 0) + delta;
    setEditedX(newX);
    onPropertyChange("x", newX);
  };

  const handleYChange = (delta: number) => {
    const newY = (editedY || selectedComponent?.y || 0) + delta;
    setEditedY(newY);
    onPropertyChange("y", newY);
  };

  const handleTransparencyChange = (delta: number) => {
    const newTransparency =
      (editedTransparency || selectedComponent?.opacity || 1) + delta;
    if (newTransparency < 0 || newTransparency > 1) return;
    setEditedTransparency(newTransparency);
    onPropertyChange("opacity", newTransparency);
  };

  const handleRotationChange = (delta: number) => {
    const newRotation =
      (editedRotation || selectedComponent?.rotation || 0) + delta;
    setEditedRotation(newRotation);
    onPropertyChange("rotation", newRotation);
  };

  const handleZChange = (delta: number) => {
    const newZ = (editedZ || selectedComponent?.z || 0) + delta;
    setEditedZ(newZ);
    onPropertyChange("z", newZ);
  };

  const handleRemoveComponent = () => {
    if (selectedComponent) {
      onRemoveComponent(selectedComponent.id);
    }
  };

  return (
    <div className="component-panel">
      <h2>Component Properties</h2>
      {selectedComponent ? (
        <div>
          <div className="button-container">
            <button className="button" onClick={handleRemoveComponent}>
              Remove
            </button>
          </div>
          <p className="editor-text">
            Height <strong>{selectedComponent.height}</strong>
          </p>
          <div className="button-container">
            <button className="button" onClick={() => handleHeightChange(10)}>
              +
            </button>
            <button className="button" onClick={() => handleHeightChange(-10)}>
              -
            </button>
          </div>

          <p className="editor-text">
            Width <strong>{selectedComponent.width}</strong>
          </p>
          <div className="button-container">
            <button className="button" onClick={() => handleWidthChange(10)}>
              +
            </button>
            <button className="button" onClick={() => handleWidthChange(-10)}>
              -
            </button>
          </div>

          <p className="editor-text">
            Opacity {selectedComponent.opacity?.toFixed(1)}
          </p>
          <div className="button-container">
            <button
              className="button"
              onClick={() => handleTransparencyChange(0.1)}
            >
              +
            </button>
            <button
              className="button"
              onClick={() => handleTransparencyChange(-0.1)}
            >
              -
            </button>
          </div>

          <p className="editor-text">Rotation {selectedComponent.rotation}</p>
          <div className="button-container">
            <button className="button" onClick={() => handleRotationChange(10)}>
              +
            </button>
            <button
              className="button"
              onClick={() => handleRotationChange(-10)}
            >
              -
            </button>
          </div>

          <p className="editor-text">X Position {selectedComponent.x}</p>
          <div className="button-container">
            <button className="button" onClick={() => handleXChange(10)}>
              + X
            </button>
            <button className="button" onClick={() => handleXChange(-10)}>
              - X
            </button>
          </div>

          <p className="editor-text">Y Position {selectedComponent.y}</p>
          <div className="button-container">
            <button className="button" onClick={() => handleYChange(-10)}>
              + Y
            </button>
            <button className="button" onClick={() => handleYChange(10)}>
              - Y
            </button>
          </div>

          <p className="editor-text">Layer {selectedComponent.z}</p>
          <div className="button-container">
            <button className="button" onClick={() => handleZChange(1)}>
              Forward
            </button>
            <button className="button" onClick={() => handleZChange(-1)}>
              Backwards
            </button>
          </div>

          {selectedComponent.type === "TEXT" && (
            <TextEditor
              selectedComponent={selectedComponent as ITextComponent}
              onPropertyChange={onPropertyChange}
            />
          )}
          {selectedComponent.type === "SHAPE" && (
            <ShapeEditor
              selectedComponent={selectedComponent as IShapeComponent}
              onPropertyChange={onPropertyChange}
            />
          )}
        </div>
      ) : (
        <p>No component selected</p>
      )}
    </div>
  );
};

export default EditorPanel;
