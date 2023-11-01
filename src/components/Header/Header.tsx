import { FC, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cl from "./Header.module.scss";
import routes from "../../router";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthService from "../../services/AuthService";
import Modal from "../UI/Modal/Modal";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";

const setActiveLink = ({ isActive }: { isActive: boolean }): string => {
  return isActive ? `${cl["nav__link"]} ${cl["active-link"]}` : cl["nav__link"];
};

const Header: FC = () => {
  const navigate = useNavigate();

  const [hasHeaderBg, setHasHeaderBg] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const headerClasses: string[] = [
    cl["header"],
    hasHeaderBg ? "bg-teal-600" : "",
  ];

  function toggleModalActive() {
    setIsLogoutModal(!isLogoutModal);
  }

  function performLogout(): void {
    AuthService.logout();
    setIsLogoutModal(false);
    navigate("/authorization");
  }

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 40) setHasHeaderBg(true);
      else setHasHeaderBg(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={headerClasses.join(" ")}>
      <div className={cl["header__container"]}>
        <h2 className={cl["header__title"]}>
          Airport <LocalAirportIcon />
        </h2>
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
          <LogoutIcon
            onClick={toggleModalActive}
            className={cl["nav__logout"]}
          />
          <Modal visible={isLogoutModal} toggleModalActive={toggleModalActive}>
            <div className={cl["logout"]}>
              <h2 className={cl["logout__title"]}>
                Do you really want to log out?
              </h2>
              <div className={cl["logout__buttons"]}>
                <button
                  type="button"
                  className={cl["logout__button"]}
                  onClick={performLogout}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={toggleModalActive}
                  className={cl["logout__button"]}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        </nav>
      </div>
    </header>
  );
};

export default Header;
