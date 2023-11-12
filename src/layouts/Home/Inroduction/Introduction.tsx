import { FC, useState } from "react";
import cl from "./Introduction.module.scss";
import PlainImage from "../../../assets/images/pages/Home/Plain.png";
import Loader from "../../../components/UI/Loader/Loader";

const Introduction: FC = () => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const imageClasses: string = [isImageLoading ? "hidden" : "block"].join(" ");

  return (
    <div className={cl["introduction"]}>
      <div className={cl["introduction__container"]}>
        <div className={cl["introduction__body"]}>
          <div className={cl["introduction__text"]}>
            <h1 className={cl["introduction__title"]}>
              Welcome to Utravel: Your Gateway to the Skies!
            </h1>
            <h2 className={cl["introduction__sub-title"]}>
              Discover the Convenience and Comfort
            </h2>
            <p className={cl["introduction__description"]}>
              Welcome to Utravel, your main entry point to the world of air
              travel! We are proud to be able to serve and accommodate
              passengers from all over the world, providing the highest level of
              service and comfort.
            </p>
          </div>
          <div className={cl["introduction__image"]}>
            {!isImageLoading && <Loader />}
            <img
              src={PlainImage}
              alt="Plain"
              className={imageClasses}
              draggable={false}
              onLoad={() => setIsImageLoading(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
