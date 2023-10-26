import { FC } from "react";

const Registration: FC = () => {
  return (
    <div className="registration">
      <section className="registration__container">
        <div className="registration__body">
          <h1 className="registration__title">Registration</h1>
          <form className="registration__form">
            <fieldset className="registration__section">
              <input
                type="text"
                className="registration__input"
                placeholder="Username"
                tabIndex={1}
              />
            </fieldset>
            <fieldset className="registration__section">
              <input
                type="text"
                className="registration__input"
                placeholder="Email"
                tabIndex={2}
              />
            </fieldset>
            <fieldset className="registration__section">
              <input
                type="text"
                className="registration__input"
                placeholder="Password"
                tabIndex={3}
              />
            </fieldset>
            <fieldset className="registration__section">
              <input
                type="text"
                className="registration__input"
                placeholder="Password"
                tabIndex={3}
              />
            </fieldset>
            <fieldset className="registration__section">
              <input
                type="text"
                className="registration__input"
                placeholder="Passport number"
                tabIndex={4}
              />
            </fieldset>
            <fieldset className="registration__section">
              <input
                type="text"
                className="registration__input"
                placeholder="Tel"
                tabIndex={5}
              />
            </fieldset>
            <fieldset className="registration__section">
              <button type="submit" className="registration__button">
                Register
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Registration;
