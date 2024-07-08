import React, { useState } from "react";
import { ImageComponentProps } from "./ComponentMap";

const Image: React.FC<ImageComponentProps> = ({
  id,
  x,
  y,
  z,
  width,
  height,
  src,
  opacity,
  rotation,
  visible,
  toggleVisibility,
  onSelect,
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  const imageStyle: React.CSSProperties = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    zIndex: z,
    width: `${width}px`,
    height: `${height}px`,
    opacity: opacity !== undefined ? opacity : 1,
    transform: `rotate(${rotation ?? 0}deg)`,
    display: isVisible ? "block" : "none",
  };

  const handleClick = () => {
    console.log("selected image", id);

    if (toggleVisibility) {
      setIsVisible(!isVisible);
    }
    onSelect();
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${x + 10}px`,
        top: `${y + 10}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: z,
      }}
      onClick={handleClick}
    >
      <img draggable src={src} alt={`${id}`} style={imageStyle} />
    </div>
  );
};

export default Image;
