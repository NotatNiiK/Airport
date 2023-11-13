import { FC, useState, useEffect } from "react";
import Loader from "../Loader/Loader";

interface ImageLoadingProps {
  image: string;
}

const ImageLoading: FC<ImageLoadingProps> = ({ image }) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const imageClasses: string = [isImageLoading ? "hidden" : "block"].join(" ");

  useEffect((): void => {
    setIsImageLoading(false);
  }, []);

  return (
    <>
      {isImageLoading ? (
        <Loader />
      ) : (
        <img
          src={image}
          alt="Plain"
          className={imageClasses}
          draggable={false}
        />
      )}
    </>
  );
};

export default ImageLoading;
