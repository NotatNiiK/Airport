import { FC, useState } from "react";
import cl from "./FlightsItem.module.scss";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import { IFlight } from "../../models/flights";
import { useFetching } from "../../hooks/useFetching";
import FlightsStore from "../../store/FlightsStore";
import AuthStore from "../../store/AuthStore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../UI/Modal/Modal";
import GeneralFlightForm from "../forms/GeneralFlightForm/GeneralFlightForm";
import ConfirmForm from "../forms/ConfirmForm/ConfirmForm";

interface FlightItemProps {
  flight: IFlight;
}

const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  const [isEditModalOpen, setIsEditModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModal] = useState(false);

  function toggleEditModal(): void {
    setIsEditModal(!isEditModalOpen);
  }

  const [deleteFlight] = useFetching(async (id: number) => {
    const r = await FlightsStore.deleteFlight(id);
    console.log(r.response);
    await FlightsStore.getFlights();
  });

  function toggleDeleteModal(): void {
    setIsDeleteModal(!isDeleteModalOpen);
  }

  return (
    <li className={cl["flights-item"]}>
      <div className={cl["flights-item__image"]}>
        <FlightTakeoffTwoToneIcon />
      </div>
      <div className={cl["flights-item__content"]}>
        <h3 className={cl["flights-item__departure-location"]}>
          {flight.departureLocation}
        </h3>
        <h3 className={cl["flights-item__destination"]}>
          from {flight.destination}
        </h3>
        <p className={cl["flights-item__time"]}>
          {flight.departureTime} - {flight.arrivalTime}
        </p>
        <p className={cl["flights-item__number"]}>
          Flight number: {flight.flightNumber}
        </p>
        {AuthStore.isAdmin && (
          <div className={[cl["flights-item__buttons"]].join(" ")}>
            <DeleteIcon
              onClick={() => {
                setIsDeleteModal(true);
              }}
              className={[
                cl["flights-item__button"],
                cl["flights-item__button_delete"],
              ].join(" ")}
            />
            <EditIcon
              onClick={() => {
                setIsEditModal(true);
              }}
              className={[
                cl["flights-item__button"],
                cl["flights-item__button_edit"],
              ].join(" ")}
            />
          </div>
        )}
      </div>
      <Modal visible={isEditModalOpen} toggleModalActive={toggleEditModal}>
        <GeneralFlightForm
          isEdit={true}
          flight={flight}
          closeModal={toggleEditModal}
        />
      </Modal>
      <Modal visible={isDeleteModalOpen} toggleModalActive={toggleDeleteModal}>
        <ConfirmForm
          closeModal={toggleDeleteModal}
          performAction={() => deleteFlight(flight.id)}
          title="Do you really want to delete this flight?"
        />
      </Modal>
    </li>
  );
};

export default FlightItem;
