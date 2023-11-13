import { FC, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useHeader } from "../../hooks/useHeader";
import cl from "./Header.module.scss";
import ConfirmForm from "../Forms/ConfirmForm/ConfirmForm";
import Modal from "../UI/Modal/Modal";
import Logo from "../UI/Logo/Logo";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import navLinks from "../../data/navLinks";

const setActiveLink = ({ isActive }: { isActive: boolean }): string => {
  return isActive ? `${cl["nav__link"]} ${cl["active-link"]}` : cl["nav__link"];
};

const Header: FC = () => {
  const navigate = useNavigate();

  const [
    isLogoutModal,
    isBurgerMenuOpen,
    toggleLogoutModal,
    toggleBurgerMenu,
    performLogout,
  ] = useHeader();

  const [hasHeaderBg, setHasHeaderBg] = useState<boolean>(false);

  const headerClasses: string = [
    cl["header"],
    hasHeaderBg ? "bg-indigo-600" : "",
  ].join(" ");

  const navClasses: string = [
    cl["nav"],
    isBurgerMenuOpen ? cl["active"] : "",
  ].join(" ");

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
    <header className={headerClasses}>
      <div className={cl["header__container"]}>
        <Logo />
        <nav className={navClasses}>
          <ul className={cl["nav__list"]}>
            {navLinks.map((navLink) => (
              <li className={cl["nav__item"]} key={navLink.path}>
                <NavLink to={navLink.path} className={setActiveLink}>
                  {navLink.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={cl["nav__buttons"]}>
            <AccountCircleIcon
              onClick={() => navigate("/account")}
              className={cl["nav__button"]}
            />
            <LogoutIcon
              onClick={toggleLogoutModal}
              className={cl["nav__button"]}
            />
          </div>
        </nav>
        <MenuIcon className={cl["header__burger"]} onClick={toggleBurgerMenu} />
      </div>
      <Modal open={isLogoutModal} toggleModal={toggleLogoutModal}>
        <ConfirmForm
          closeModal={toggleLogoutModal}
          performAction={performLogout}
          title="Do you really want to log out?"
        />
      </Modal>
    </header>
  );
};

export default Header;
