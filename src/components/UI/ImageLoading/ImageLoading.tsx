import { FC, useState, useEffect } from "react";
import Loader from "../Loader/Loader";

interface ImageLoadingProps {
  image: string;
}

const ImageLoading: FC<ImageLoadingProps> = ({ image }) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect((): void => {
    setIsImageLoading(false);
  }, []);

  return (
    <>
      {isImageLoading ? (
        <Loader />
      ) : (
        <img src={image} alt="Plain" draggable={false} />
      )}
    </>
  );
};

export default ImageLoading;
