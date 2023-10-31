import { FC } from "react";
import cl from "./Home.module.scss";
import Header from "../../components/Header/Header";
const Home: FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className={cl["home"]}>
          <h1>Title</h1>
        </div>
      </main>
    </>
  );
};

export default Home;
