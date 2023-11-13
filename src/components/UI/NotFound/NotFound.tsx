import { FC, ReactNode } from "react";
import cl from "./NotFound.module.scss";
import BlockIcon from "@mui/icons-material/Block";

interface NotFoundProps {
  children: ReactNode;
  colorClass: string;
}

const NotFound: FC<NotFoundProps> = ({ children, colorClass }) => {
  const rootClasses: string = [cl["not-found"], colorClass].join(" ");

  return (
    <div className={rootClasses}>
      <BlockIcon sx={{ fontSize: "120px" }} />
      <h2 className={cl["not-found__title"]}>{children}</h2>
    </div>
  );
};

export default NotFound;
