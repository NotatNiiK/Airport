import { FC } from "react";
import cl from "./About.module.scss";
import Header from "../../components/Header/Header";
import PlainImage from "../../assets/pages/About/Plain.png";

const About: FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <section className={cl["about"]}>
          <div className={cl["about__container"]}>
            <div className={cl["about__content"]}>
              <h1 className={cl["about__title"]}>Utravel airport</h1>
              <p className={cl["about__paragraph"]}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                voluptate tenetur eum iste id eos non, quis nesciunt, illum
                placeat eveniet quidem suscipit officia temporibus perspiciatis
                nostrum nemo et dolore.
              </p>
              <p className={cl["about__paragraph"]}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                voluptate tenetur eum iste id eos non, quis nesciunt, illum
                placeat eveniet quidem suscipit officia temporibus perspiciatis
                nostrum nemo et dolore.
              </p>
              <p className={cl["about__paragraph"]}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                voluptate tenetur eum iste id eos non, quis nesciunt, illum
                placeat eveniet quidem suscipit officia temporibus perspiciatis
                nostrum nemo et dolore.
              </p>
              <p className={cl["about__paragraph"]}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                voluptate tenetur eum iste id eos non, quis nesciunt, illum
                placeat eveniet quidem suscipit officia temporibus perspiciatis
                nostrum nemo et dolore.
              </p>
            </div>
            <div className={cl["about__image"]}>
              <img src={PlainImage} alt="Plain" draggable={false} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
