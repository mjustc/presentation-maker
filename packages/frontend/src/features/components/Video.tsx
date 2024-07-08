import React, { useRef } from "react";
import { VideoComponentProps } from "./ComponentMap";

const Video: React.FC<VideoComponentProps> = ({
  x,
  y,
  z,
  width,
  height,
  src,
  opacity,
  rotation,
  autoplay,
  onSelect,
}) => {
  const videoStyle: React.CSSProperties = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    zIndex: z,
    width: `${width}px`,
    height: `${height}px`,
    opacity: opacity !== undefined ? opacity : 1,
    transform: `rotate(${rotation ?? 0}deg)`,
  };
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    videoRef.current?.play();
    onSelect();
  };

  return (
    <video
      id="video"
      ref={videoRef}
      src={src}
      style={videoStyle}
      onClick={handleClick}
      autoPlay={autoplay}
      draggable
    />
  );
};

export default Video;
