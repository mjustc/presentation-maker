import React from "react";
import { ShapeComponentProps } from "./ComponentMap";

const Shape: React.FC<ShapeComponentProps> = ({
  x,
  y,
  z,
  backgroundColor,
  shapeType,
  width,
  height,
  opacity,
  rotation,
  onSelect,
}) => {
  const styles: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    zIndex: z,
    backgroundColor: backgroundColor,
    width: `${width}px`,
    height: `${height}px`,
    opacity: opacity,
    transform: `rotate(${rotation}deg)`,
    borderRadius: shapeType === "circle" ? "50%" : "0",
  };

  const handleClick = () => {
    onSelect();
  };

  return <div onClick={handleClick} style={styles}></div>;
};

export default Shape;
