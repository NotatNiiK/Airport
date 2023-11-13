import { FC, useState, useEffect } from "react";
import { useFetching } from "../../hooks/useFetching";
import { IAlert } from "../../models/alert";
import { Alert } from "@mui/material";
import cl from "./Account.module.scss";
import Header from "../../components/Header/Header";
import TicketsList from "../../components/TicketsList/TicketsList";
import TicketStore from "../../store/TicketStore";
import AuthStore from "../../store/AuthStore";

const Account: FC = () => {
  const [errorAlert, setErrorAlert] = useState<IAlert>({
    show: false,
    message: "",
  });

  const [getTickets, isLoading] = useFetching(async (): Promise<void> => {
    if (AuthStore.tokenInfo?.id) {
      const getTicketsResponse = await TicketStore.getTickets(
        AuthStore.tokenInfo.id
      );
      if (getTicketsResponse?.hasError) {
        setErrorAlert({
          show: true,
          message: getTicketsResponse.response,
        });
      }
    }
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
            {errorAlert.show ? (
              <Alert
                severity="error"
                sx={{
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {errorAlert.message}
              </Alert>
            ) : (
              <TicketsList
                ticketsList={TicketStore.ticketsList}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
