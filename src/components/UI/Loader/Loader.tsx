import { FC } from "react";
import cl from "./Loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={cl["loader-wrapper"]}>
      <span className={cl["loader"]}></span>
    </div>
  );
};

export default Loader;
