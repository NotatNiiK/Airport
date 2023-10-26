import { FC } from "react";
import cl from "./Registration.module.scss";

const Registration: FC = () => {
  return (
    <div className={cl["registration"]}>
      <section className={cl["registration__body"]}>
        <h1 className={cl["registration__title"]}>Registration</h1>
        <form className="registration__form">
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              placeholder="Username"
              tabIndex={1}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              placeholder="Email"
              tabIndex={2}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              placeholder="Password"
              tabIndex={3}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              placeholder="Passport number"
              tabIndex={4}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <input
              type="text"
              className={cl["registration__input"]}
              placeholder="Tel"
              tabIndex={5}
            />
          </fieldset>
          <fieldset className={cl["registration__section"]}>
            <button type="submit" className={cl["registration__button"]}>
              Register
            </button>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default Registration;
