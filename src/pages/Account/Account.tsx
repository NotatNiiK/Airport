import { FC, useEffect } from "react";
import cl from "./Account.module.scss";
import TicketStore from "../../store/TicketStore";

const Account: FC = () => {
  useEffect(() => {
    const fetching = async () => {
      const r = await TicketStore.getTickets(1);
      console.log(r);
    };
    fetching();
  }, []);
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
