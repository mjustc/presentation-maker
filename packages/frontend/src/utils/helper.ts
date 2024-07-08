export const generateUniqueId = () => {
  return Math.random().toString(36);
};

export const readImageFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => resolve(img);
      img.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

interface VideoData {
  src: string;
  width: number;
  height: number;
}

export const readVideoFile = async (file: File): Promise<VideoData> => {
  return new Promise<VideoData>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const video = document.createElement("video");
        video.addEventListener("loadedmetadata", () => {
          const width = video.videoWidth;
          const height = video.videoHeight;
          URL.revokeObjectURL(video.src);

          resolve({
            src: URL.createObjectURL(file),
            width,
            height,
          });
        });

        video.src = URL.createObjectURL(file);
        video.load();
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
