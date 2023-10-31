import { FC } from "react";
import cl from "./Home.module.scss";

const Home: FC = () => {
  return (
    <div className={cl["home"]}>
      <h1>Title</h1>
    </div>
  );
};

export default Home;
