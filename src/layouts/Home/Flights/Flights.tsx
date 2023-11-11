import { FC, useState, useEffect } from "react";
import { useFetching } from "../../../hooks/useFetching";
import { useModal } from "../../../hooks/useModal";
import { observer } from "mobx-react-lite";
import { IAlert } from "../../../models/alert";
import cl from "./Flights.module.scss";
import Modal from "../../../components/UI/Modal/Modal";
import FlightsList from "../../../components/FlightsList/FightsList";
import GeneralFlightForm from "../../../components/forms/GeneralFlightForm/GeneralFlightForm";
import FlightStore from "../../../store/FlightStore";
import AuthStore from "../../../store/AuthStore";
import Alert from "@mui/material/Alert";

const Flights: FC = observer(() => {
  const [isCreateModalOpen, toggleCreateModal] = useModal();
  const [errorAlert, setErrorAlert] = useState<IAlert>({
    error: false,
    message: "",
  });

  const [getFlights, isLoading] = useFetching(async (): Promise<void> => {
    const response = await FlightStore.getFlights();
    if (response?.hasError) {
      setErrorAlert({
        error: true,
        message: response.response,
      });
    }
  });

  useEffect((): void => {
    getFlights();
  }, []);

  return (
    <div className={cl["flights"]}>
      <div className={cl["flights__container"]}>
        <div className={cl["flights__panel"]}>
          <h2 className={cl["flights__title"]}>Available flights:</h2>
          {AuthStore.isAdmin && (
            <button
              className={cl["flights__create-btn"]}
              title="Create flight"
              onClick={toggleCreateModal}
            >
              +
            </button>
          )}
        </div>
        {errorAlert.error ? (
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
          <FlightsList
            flights={FlightStore.flightsList}
            isLoading={isLoading}
          />
        )}

        <Modal
          visible={isCreateModalOpen}
          toggleModalActive={toggleCreateModal}
        >
          <GeneralFlightForm
            title="Create flight"
            isEdit={false}
            closeModal={toggleCreateModal}
            isClearForm={isCreateModalOpen}
          />
        </Modal>
      </div>
    </div>
  );
});

export default Flights;
