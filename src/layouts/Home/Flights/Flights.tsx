import { FC, useState, useEffect } from "react";
import cl from "./Flights.module.scss";
import Modal from "../../../components/UI/Modal/Modal";
import CreateFlightForm from "../../../components/forms/CreateFlightForm/CreateFlightForm";
import FlightsList from "../../../components/FlightsList/FightsList";
import { useFetching } from "../../../hooks/useFetching";
import FlightsStore from "../../../store/FlightsStore";

const Flights: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const [flights, setFlights] = useState([]);

  const [getFlights, isLoading] = useFetching(async () => {
    const response = await FlightsStore.getFlights();
    setFlights(response.response);
  });

  useEffect(getFlights, []);

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
        <FlightsList flights={flights} isLoading={isLoading} />
        <Modal visible={isCreateModalOpen} toggleModalActive={toggleModal}>
          <CreateFlightForm closeModal={toggleModal} />
        </Modal>
      </div>
    </div>
  );
};

export default Flights;
