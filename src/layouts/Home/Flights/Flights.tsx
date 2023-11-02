import { FC, useState, useEffect } from "react";
import cl from "./Flights.module.scss";
import Modal from "../../../components/UI/Modal/Modal";
import CreateFlightForm from "../../../components/forms/CreateFlightForm/CreateFlightForm";
import FlightsList from "../../../components/FlightsList/FightsList";
import { useFetching } from "../../../hooks/useFetching";
import FlightsStore from "../../../store/FlightsStore";
import { observer } from "mobx-react-lite";

const Flights: FC = observer(() => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const [getFlights, isLoading] = useFetching(async () => {
    await FlightsStore.getFlights();
  });

  useEffect(() => {
    getFlights();
  }, []);

  function toggleModal(): void {
    setIsCreateModalOpen(!isCreateModalOpen);
  }

  function openModal(): void {
    setIsCreateModalOpen(true);
  }

  return (
    <div className={cl["flights"]}>
      <div className={cl["flights__container"]}>
        <div className={cl["flights__panel"]}>
          <h2 className={cl["flights__title"]}>Available flights:</h2>
          <button
            className={cl["flights__create-btn"]}
            title="Create flight"
            onClick={openModal}
          >
            +
          </button>
        </div>
        <FlightsList flights={FlightsStore.flightsList} isLoading={isLoading} />
        <Modal visible={isCreateModalOpen} toggleModalActive={toggleModal}>
          <CreateFlightForm closeModal={toggleModal} />
        </Modal>
      </div>
    </div>
  );
});

export default Flights;
