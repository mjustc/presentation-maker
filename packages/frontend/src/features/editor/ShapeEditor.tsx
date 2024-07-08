import React from "react";
import { IShapeComponent } from "../../types/component";

interface ShapeEditorProps {
  selectedComponent: IShapeComponent;
  onPropertyChange: (property: string, value: any) => void;
}

const ShapeEditor: React.FC<ShapeEditorProps> = ({
  selectedComponent,
  onPropertyChange,
}) => {
  const handleBackgroundColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBackgroundColor = e.target.value;
    onPropertyChange("backgroundColor", newBackgroundColor);
  };

  return (
    <div>
      <p>Shape Type {selectedComponent.shapeType}</p>
      <p>Background Color</p>
      <input
        type="color"
        value={selectedComponent.backgroundColor}
        onChange={handleBackgroundColorChange}
      />
    </div>
  );
};

export default ShapeEditor;
