import { FC, useState } from "react";
import cl from "./Flights.module.scss";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import Modal from "../../../components/UI/Modal/Modal";

const Flights: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

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
        <ul className={cl["flights__list"]}>
          <li className={[cl["flights__item"], cl["flights-item"]].join(" ")}>
            <div className={cl["flights-item__image"]}>
              <FlightTakeoffTwoToneIcon />
            </div>
            <div className={cl["flights-item__content"]}>
              <h3 className={cl["flights-item__departure-location"]}>London</h3>
              <h3 className={cl["flights-item__destination"]}>from Kyiv</h3>
              <p className={cl["flights-item__time"]}>
                30.11.2023 14:00 - 30.11.2023 19:00
              </p>
              <p className={cl["flights-item__number"]}>123Ure3</p>
            </div>
          </li>
        </ul>
        <Modal visible={isCreateModalOpen} toggleModalActive={toggleModal}>
          asd
        </Modal>
      </div>
    </div>
  );
};

export default Flights;
