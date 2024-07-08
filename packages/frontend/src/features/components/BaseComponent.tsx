import React, { useState } from "react";

type BaseComponentProps = {
  children: React.ReactNode;
  onSelect: () => void;
  initialX: number;
  initialY: number;
};

const BaseComponent: React.FC<BaseComponentProps> = ({
  children,
  initialX,
  initialY,
  onSelect,
}) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setX(x + deltaX);
      setY(y + deltaY);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        cursor: "move",
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      draggable
    >
      {children}
    </div>
  );
};

export default BaseComponent;
