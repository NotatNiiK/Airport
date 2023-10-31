import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cl from "./Header.module.scss";
import routes from "../../router";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthService from "../../services/AuthService";

const setActiveLink = ({ isActive }: { isActive: boolean }): string => {
  return isActive ? `${cl["nav__link"]} ${cl["active-link"]}` : cl["nav__link"];
};

const Header: FC = () => {
  const navigate = useNavigate();

  function performLogout(): void {
    AuthService.logout();
    navigate("/authorization");
  }

  return (
    <header className={cl["header"]}>
      <div className={cl["header__container"]}>
        <h2 className={cl["header__title"]}>Airport</h2>
        <nav className={cl["nav"]}>
          <ul className={cl["nav__list"]}>
            {routes.map((route) => (
              <li className={cl["nav__item"]} key={route.id}>
                <NavLink to={route.path} className={setActiveLink}>
                  {route.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <LogoutIcon onClick={performLogout} className={cl["nav__logout"]} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
