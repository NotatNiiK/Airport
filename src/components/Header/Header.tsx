import { FC } from "react";
import { NavLink } from "react-router-dom";
import cl from "./Header.module.scss";
import routes from "../../router";

const Header: FC = () => {
  return (
    <header className={cl["header"]}>
      <div className={cl["header__container"]}>
        <h2 className={cl["header__title"]}>Airport</h2>
        <nav className="header__nav nav">
          <ul className={cl["nav__list"]}>
            {routes.map((route) => (
              <li className={cl["nav__item"]} key={route.id}>
                <NavLink to={route.path} className={cl["nav__link"]}>
                  {route.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
