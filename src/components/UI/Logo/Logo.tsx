import { FC } from "react";
import cl from "./Logo.module.scss";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";

const Logo: FC = () => {
  return (
    <h2 className={cl["logo"]}>
      Utravel <LocalAirportIcon />
    </h2>
  );
};

export default Logo;
