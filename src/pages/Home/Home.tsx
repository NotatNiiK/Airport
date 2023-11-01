import { FC } from "react";
import cl from "./Home.module.scss";
import Header from "../../components/Header/Header";
import PlainImage from "../../assets/Pages/Home/Plain.png";

const Home: FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <section className={cl["home"]}>
          <div className={["home__introduction", cl["introduction"]].join(" ")}>
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
                    Welcome to Utravel, your main entry point to the world of
                    air travel! We are proud to be able to serve and accommodate
                    passengers from all over the world, providing the highest
                    level of service and comfort.
                  </p>
                </div>
                <div className={cl["home__image"]}>
                  <img src={PlainImage} alt="Plain" draggable={false} />
                </div>
              </div>
            </div>
          </div>
          <div className={["home__flights", cl["flights"]].join(" ")}>
            <div className={cl["flights__container"]}>
              <h2 className={cl["flights__title"]}>Available flights:</h2>
              <ul className={cl["flights__list"]}>
                <li
                  className={[cl["flights__item"], cl["flights-item"]].join(
                    " "
                  )}
                >
                  <div className={cl["flights-item__content"]}>
                    <h3 className={cl["flights-item__departure-location"]}>
                      London
                    </h3>
                    <h3 className={cl["flights-item__destination"]}>
                      from Kyiv
                    </h3>
                    <p className={cl["flights-item__time"]}>
                      30.11.2023 14:00 - 30.11.2023 19:00
                    </p>
                    <p className={cl["flights-item__number"]}>123Ure3</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
