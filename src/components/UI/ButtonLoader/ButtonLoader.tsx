import { FC } from "react";
import cl from "./ButtonLoader.module.scss";

const ButtonLoader: FC = () => {
  return <span className={cl["loader"]}></span>;
};

export default ButtonLoader;
