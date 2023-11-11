import { FC, useEffect } from "react";
import cl from "./Account.module.scss";
import TicketStore from "../../store/TicketStore";
import AuthStore from "../../store/AuthStore";
import Header from "../../components/Header/Header";

const Account: FC = () => {
  useEffect(() => {
    const fetching = async () => {
      const userId = AuthStore.tokenInfo.id || 0;
      console.log(userId);
      const r = await TicketStore.getTickets(userId);
    };
    fetching();
  }, []);
  return (
    <>
      <Header />
      <main className="main">
        <div className={cl["account"]}>
          <div className={cl["account__container"]}>
            <h1 className={cl["account__title"]}>
              Welcome, {AuthStore.tokenInfo.username}
            </h1>
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
