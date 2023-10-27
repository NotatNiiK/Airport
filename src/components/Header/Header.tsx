import { FC } from "react";
import { NavLink } from "react-router-dom";
import cl from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={cl["header"]}>
      <div className={cl["header__container"]}>
        <h2 className={cl["header__title"]}>Airport</h2>
        <nav className="header__nav nav">
          <ul className={cl["nav__list"]}>
            <li className={cl["nav__item"]}>
              <NavLink to="/" className={cl["nav__link"]}>
                Home
              </NavLink>
            </li>
            <li className={cl["nav__item"]}>
              <NavLink to="/registration" className={cl["nav__link"]}>
                Registration
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
