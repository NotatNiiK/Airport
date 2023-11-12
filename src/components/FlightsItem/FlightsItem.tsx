import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IFlight } from "../../models/flight";
import { IToken } from "../../models/token";
import { useFetching } from "../../hooks/useFetching";
import { useModal } from "../../hooks/useModal";
import { useAlert } from "../../hooks/useAlert";
import cl from "./FlightsItem.module.scss";
import GeneralFlightForm from "../forms/GeneralFlightForm/GeneralFlightForm";
import ConfirmForm from "../forms/ConfirmForm/ConfirmForm";
import Notify from "../Notify/Notify";
import Modal from "../UI/Modal/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import AuthStore from "../../store/AuthStore";
import FlightsStore from "../../store/FlightStore";
import gotoTicketPage from "../../utils/gotoTicketPage";

interface FlightItemProps {
  flight: IFlight;
}

const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  const [isEditModalOpen, toggleEditModal] = useModal();
  const [isDeleteModalOpen, toggleDeleteModal] = useModal();
  const [errorAlert, showAlert] = useAlert();
  const [userId, setUserId] = useState<number>(0);

  const deleteIconClasses: string = [
    cl["flights-item__button"],
    cl["flights-item__button_delete"],
  ].join(" ");

  const editIconClasses: string = [
    cl["flights-item__button"],
    cl["flights-item__button_edit"],
  ].join(" ");

  const [deleteFlight, isLoading] = useFetching(
    async (id: number): Promise<void> => {
      const deleteResponse = await FlightsStore.deleteFlight(id);
      if (deleteResponse.hasError) {
        showAlert(deleteResponse.response);
        return;
      }
      await FlightsStore.getFlights();
    }
  );

  useEffect((): void => {
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
        <div className={cl["flights-item__buttons"]}>
          <Link
            to={gotoTicketPage(flight, userId)}
            className={cl["flights-item__buy-ticket"]}
          >
            Buy ticket
          </Link>
          {AuthStore.isAdmin && (
            <>
              <DeleteIcon
                onClick={toggleDeleteModal}
                className={deleteIconClasses}
                sx={{
                  fontSize: "30px",
                }}
              />
              <EditIcon
                onClick={toggleEditModal}
                className={editIconClasses}
                sx={{
                  fontSize: "30px",
                }}
              />
            </>
          )}
        </div>
      </div>
      <Modal open={isEditModalOpen} toggleModal={toggleEditModal}>
        <GeneralFlightForm
          title="Edit flight"
          isEdit={true}
          flight={flight}
          closeModal={toggleEditModal}
          isClearForm={false}
        />
      </Modal>
      <Modal open={isDeleteModalOpen} toggleModal={toggleDeleteModal}>
        <ConfirmForm
          loading={isLoading}
          closeModal={toggleDeleteModal}
          performAction={() => deleteFlight(flight.id)}
          title="Do you really want to delete this flight?"
        />
      </Modal>
      <Notify
        show={errorAlert.show}
        message={errorAlert.message}
        type="error"
      />
    </li>
  );
};

export default FlightItem;
