import { FC } from "react";
import cl from "./Home.module.scss";
import Header from "../../components/Header/Header";
import PlainImage from "../../assets/Pages/Home/Plain.png";

const Home: FC = () => {
  return (
    <>
      <Header />
      <main className={["main", cl["home"]].join(" ")}>
        <section className={cl["home__container"]}>
          <div className={cl["home__body"]}>
            <div className={cl["home__text"]}>
              <h1 className={cl["home__title"]}>
                Welcome to Utravel: Your Gateway to the Skies!
              </h1>
              <h2 className={cl["home__sub-title"]}>
                Discover the Convenience and Comfort
              </h2>
              <p className={cl["home__description"]}>
                Welcome to Utravel, your main entry point to the world of air
                travel! We are proud to be able to serve and accommodate
                passengers from all over the world, providing the highest level
                of service and comfort.
              </p>
            </div>
            <div className={cl["home__image"]}>
              <img src={PlainImage} alt="Plain" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
