import React from "react";
import { ITextComponent } from "../../types/component";

interface TextEditorProps {
  selectedComponent: ITextComponent;
  onPropertyChange: (property: string, value: any) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  selectedComponent,
  onPropertyChange,
}) => {
  const handleTextContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTextContent = e.target.value;
    onPropertyChange("textContent", newTextContent);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = parseInt(e.target.value, 10) || 0;
    onPropertyChange("fontSize", newFontSize);
  };

  const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontColor = e.target.value;
    onPropertyChange("textColor", newFontColor);
  };

  return (
    <div>
      <p className="editor-text">Content</p>
      <input
        style={{ height: "20px" }}
        type="text"
        value={selectedComponent.textContent}
        onChange={handleTextContentChange}
      />
      <p className="editor-text">Font Size</p>
      <input
        style={{ height: "20px" }}
        type="number"
        value={selectedComponent.fontSize}
        onChange={handleFontSizeChange}
      />
      <p>Font Color</p>
      <input
        type="color"
        value={selectedComponent.textColor}
        onChange={handleFontColorChange}
      />
    </div>
  );
};

export default TextEditor;
