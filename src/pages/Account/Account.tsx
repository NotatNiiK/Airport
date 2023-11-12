import { FC, useEffect } from "react";
import { useFetching } from "../../hooks/useFetching";
import cl from "./Account.module.scss";
import TicketStore from "../../store/TicketStore";
import AuthStore from "../../store/AuthStore";
import Header from "../../components/Header/Header";
import TicketsList from "../../components/TicketsList/TicketsList";

const Account: FC = () => {
  const [getTickets, isLoading] = useFetching(async (): Promise<void> => {
    const userId = AuthStore.tokenInfo.id || 0;
    await TicketStore.getTickets(userId);
  });

  useEffect(() => {
    getTickets();
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
            <TicketsList
              ticketsList={TicketStore.ticketsList}
              loading={isLoading}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
