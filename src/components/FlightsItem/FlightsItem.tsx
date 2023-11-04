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
import { Link } from "react-router-dom";

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
        <h3 className={cl["flights-item__place"]}>
          {flight.departureLocation} - {flight.destination}
        </h3>
        <p className={cl["flights-item__time"]}>
          {flight.departureTime} - {flight.arrivalTime}
        </p>
        <p className={cl["flights-item__number"]}>
          Flight number: {flight.flightNumber}
        </p>
        <div className={[cl["flights-item__buttons"]].join(" ")}>
          <Link
            to={`/tickets/${flight.id}/${AuthStore.tokenInfo.id}`}
            className={cl["flights-item__buy-ticket"]}
          >
            Buy ticket
          </Link>
          {AuthStore.isAdmin && (
            <>
              <DeleteIcon
                onClick={() => {
                  setIsDeleteModal(true);
                }}
                sx={{
                  fontSize: "30px",
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
                sx={{
                  fontSize: "30px",
                }}
                className={[
                  cl["flights-item__button"],
                  cl["flights-item__button_edit"],
                ].join(" ")}
              />
            </>
          )}
        </div>
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
