import { FC, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cl from "./Header.module.scss";
import routes from "../../router";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthStore from "../../store/AuthStore";
import Modal from "../UI/Modal/Modal";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import MenuIcon from "@mui/icons-material/Menu";

const setActiveLink = ({ isActive }: { isActive: boolean }): string => {
  return isActive ? `${cl["nav__link"]} ${cl["active-link"]}` : cl["nav__link"];
};

const Header: FC = () => {
  const navigate = useNavigate();

  const [hasHeaderBg, setHasHeaderBg] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const headerClasses: string[] = [
    cl["header"],
    hasHeaderBg ? "bg-indigo-600" : "",
  ];

  const navClasses: string[] = [
    cl["nav"],
    isBurgerMenuOpen ? cl["active"] : "",
  ];

  function toggleModalActive() {
    setIsLogoutModal(!isLogoutModal);
  }

  function performLogout(): void {
    AuthStore.logout();
    setIsLogoutModal(false);
    navigate("/login");
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
          Utravel <LocalAirportIcon />
        </h2>
        <nav className={navClasses.join(" ")}>
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
        </nav>
        <MenuIcon
          className={cl["header__burger"]}
          onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
        />
      </div>
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
    </header>
  );
};

export default Header;
