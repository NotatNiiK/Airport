import { FC } from "react";
import cl from "./Loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={cl["loader"]}>
      <div className={cl["loader-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
