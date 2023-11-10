import { FC, useState, useEffect } from "react";
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
import { IToken } from "../../models/token";

interface FlightItemProps {
  flight: IFlight;
}

const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  const [isEditModalOpen, setIsEditModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModal] = useState(false);
  const [userId, setUserId] = useState<number>(0);

  function toggleEditModal(): void {
    setIsEditModal(!isEditModalOpen);
  }

  const [deleteFlight, isLoading] = useFetching(async (id: number) => {
    const r = await FlightsStore.deleteFlight(id);
    console.log(r.response);
    await FlightsStore.getFlights();
  });

  function toggleDeleteModal(): void {
    setIsDeleteModal(!isDeleteModalOpen);
  }

  useEffect(() => {
    const tokenInfo = localStorage.getItem("tokenInfo");

    if (tokenInfo) {
      const parsedTokenInfo: IToken = JSON.parse(tokenInfo);
      setUserId(parsedTokenInfo.id);
    }
  }, []);

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
        <p className={cl["flights-item__price"]}>{flight.price}$</p>
        <div className={[cl["flights-item__buttons"]].join(" ")}>
          <Link
            to={`tickets/${flight.id}/${flight.flightNumber}/${flight.price}/${userId}`}
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
          title="Edit flight"
          isEdit={true}
          flight={flight}
          closeModal={toggleEditModal}
          isClearForm={false}
        />
      </Modal>
      <Modal visible={isDeleteModalOpen} toggleModalActive={toggleDeleteModal}>
        <ConfirmForm
          loading={isLoading}
          closeModal={toggleDeleteModal}
          performAction={() => deleteFlight(flight.id)}
          title="Do you really want to delete this flight?"
        />
      </Modal>
    </li>
  );
};

export default FlightItem;
