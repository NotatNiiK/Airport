import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useFetching } from "../../../hooks/useFetching";
import { useModal } from "../../../hooks/useModal";
import { IAlert } from "../../../models/alert";
import cl from "./Flights.module.scss";
import Modal from "../../../components/UI/Modal/Modal";
import FlightsList from "../../../components/FlightsList/FightsList";
import GeneralFlightForm from "../../../components/Forms/GeneralForm/GeneralFlightForm";
import FlightStore from "../../../store/FlightStore";
import Alert from "@mui/material/Alert";

const Flights: FC = observer(() => {
  const [isCreateModalOpen, toggleCreateModal] = useModal();
  const [errorAlert, setErrorAlert] = useState<IAlert>({
    show: false,
    message: "",
  });

  const [getFlights, isLoading] = useFetching(async (): Promise<void> => {
    const getFlightsResponse = await FlightStore.getFlights();
    if (getFlightsResponse?.hasError) {
      setErrorAlert({
        show: true,
        message: getFlightsResponse.response,
      });
    }
  });

  useEffect((): void => {
    getFlights();
  }, []);

  return (
    <div className={cl["flights"]}>
      <section className={cl["flights__container"]}>
        <div className={cl["flights__panel"]}>
          <h2 className={cl["flights__title"]}>Available flights:</h2>
          <button
            onClick={toggleCreateModal}
            className={cl["flights__create-flight"]}
            title="Create flight"
          >
            +
          </button>
        </div>
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
          <FlightsList
            flights={FlightStore.flightsList}
            isLoading={isLoading}
          />
        )}

        <Modal open={isCreateModalOpen} toggleModal={toggleCreateModal}>
          <GeneralFlightForm
            title="Create flight"
            isEdit={false}
            closeModal={toggleCreateModal}
            isClearForm={isCreateModalOpen}
          />
        </Modal>
      </section>
    </div>
  );
});

export default Flights;
