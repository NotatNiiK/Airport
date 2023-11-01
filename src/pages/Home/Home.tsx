import { FC } from "react";
import cl from "./Home.module.scss";
import Header from "../../components/Header/Header";
const Home: FC = () => {
  return (
    <div className={cl["home"]}>
      <Header />
      <main className="main"></main>
    </div>
  );
};

export default Home;
