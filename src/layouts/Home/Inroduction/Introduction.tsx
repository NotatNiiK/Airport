import { FC } from "react";
import cl from "./Introduction.module.scss";
import PlainImage from "../../../assets/pages/Home/Plain.png";

const Introduction: FC = () => {
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
          <div className={cl["home__image"]}>
            <img src={PlainImage} alt="Plain" draggable={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
