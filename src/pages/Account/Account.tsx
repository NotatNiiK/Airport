import { FC } from "react";
import cl from "./Account.module.scss";

const Account: FC = () => {
  return (
    <div className={cl["account"]}>
      <div className={cl["account__container"]}>
        <h1 className={cl["account__title"]}>Hello Anton</h1>
        <p className={cl["account__email"]}>email: test@gmail.com</p>
      </div>
    </div>
  );
};

export default Account;
