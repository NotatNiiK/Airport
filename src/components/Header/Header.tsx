import { FC, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cl from "./Header.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthStore from "../../store/AuthStore";
import Modal from "../UI/Modal/Modal";
import MenuIcon from "@mui/icons-material/Menu";
import navLinks from "../../data/navlinks";
import Logo from "../UI/Logo/Logo";
import ConfirmForm from "../forms/ConfirmForm/ConfirmForm";

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
    setIsBurgerMenuOpen(false);
  }

  function toggleBurgerMenu() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
    document.body.classList.toggle("overflow-hidden");
  }

  function performLogout(): void {
    AuthStore.logout();
    setIsLogoutModal(false);
    document.body.classList.toggle("overflow-hidden");
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
        <Logo />
        <nav className={navClasses.join(" ")}>
          <ul className={cl["nav__list"]}>
            {navLinks.map((navLink) => (
              <li className={cl["nav__item"]} key={navLink.id}>
                <NavLink to={navLink.path} className={setActiveLink}>
                  {navLink.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <LogoutIcon
            onClick={toggleModalActive}
            className={cl["nav__logout"]}
          />
        </nav>
        <MenuIcon className={cl["header__burger"]} onClick={toggleBurgerMenu} />
      </div>
      <Modal visible={isLogoutModal} toggleModalActive={toggleModalActive}>
        <ConfirmForm
          closeModal={toggleModalActive}
          performAction={performLogout}
          title="Do you really want to log out?"
        />
      </Modal>
    </header>
  );
};

export default Header;
