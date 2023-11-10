import { FC } from "react";
import cl from "./Footer.module.scss";
import navLinks from "../../data/navLinks";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import { Link } from "react-router-dom";
import socialMedia from "../../data/socialMedia";
import Logo from "../UI/Logo/Logo";

const Footer: FC = () => {
  return (
    <footer className={cl["footer"]}>
      <section className={cl["footer__container"]}>
        <Logo />
        <ul className={cl["footer__list"]}>
          {navLinks.map((navLink) => (
            <li className={cl["footer__item"]} key={navLink.path}>
              <Link to={navLink.text} className={cl["footer__link"]}>
                {navLink.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={cl["footer__list"]}>
          {socialMedia.map((media) => (
            <li className={cl["footer__item"]} key={media.id}>
              <a href={media.path} target="_blank">
                <media.icon className={cl["footer__social-media"]} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
