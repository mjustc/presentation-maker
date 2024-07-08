import React from "react";
import { TextComponentProps } from "./ComponentMap";


const Text: React.FC<TextComponentProps> = ({
  x,
  y,
  z,
  opacity = 1,
  rotation = 0,
  textColor = "black",
  textContent,
  fontSize = 16,
  fontFamily,
  onSelect
}) => {
  const styles: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    zIndex: z,
    color: textColor,
    opacity: opacity,
    transform: `rotate(${rotation}deg)`,
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    cursor: "move",
  };

  function handleClick() {
    onSelect();
  }

  return <div onClick={handleClick} style={styles}>{textContent}</div>;
};

export default Text;
