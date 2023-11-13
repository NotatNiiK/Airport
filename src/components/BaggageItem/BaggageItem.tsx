import { FC } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useFetching } from "../../hooks/useFetching";
import { useAlert } from "../../hooks/useAlert";
import { IBaggage } from "../../models/baggage";
import cl from "./BaggageItem.module.scss";
import GeneralBaggageForm from "../Forms/GeneralForm/GeneralBaggageForm";
import ConfirmForm from "../Forms/ConfirmForm/ConfirmForm";
import Notify from "../UI/Notify/Notify";
import Modal from "../UI/Modal/Modal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BaggageStore from "../../store/BaggageStore";

interface BaggageItemProps {
  baggage: IBaggage;
}

const BaggageItem: FC<BaggageItemProps> = ({ baggage }) => {
  const { tiketId } = useParams();

  const [errorAlert, showErrorAlert] = useAlert();

  const [isEditModalOpen, toggleEditModal] = useModal();
  const [isDeleteModalOpen, toggleDeleteModal] = useModal();

  const [deleteBaggage, isLoading] = useFetching(async (): Promise<void> => {
    const baggageId = baggage.id || 0;
    const deleteBaggageResponse = await BaggageStore.deleteBaggage(baggageId);

    if (deleteBaggageResponse.hasError) {
      showErrorAlert(deleteBaggageResponse.response);
      return;
    }

    if (tiketId) {
      const numberTicketId = +tiketId;
      await BaggageStore.getBaggageById(numberTicketId);
    }
  });

  return (
    <li className={cl["baggage-item"]}>
      <h2 className={cl["baggage-item__title"]}>Baggage information</h2>
      <h2 className={cl["baggage-item__cost"]}>Cost: {baggage.cost}$</h2>
      <div className={cl["baggage-item__content"]}>
        <ul className={cl["baggage-item__list"]}>
          <li className={cl["baggage-item__list-item"]}>
            Weight: {baggage.weight}kg
          </li>
          <li className={cl["baggage-item__list-item"]}>
            Height: {baggage.height}cm
          </li>
          <li className={cl["baggage-item__list-item"]}>
            Width: {baggage.width}cm
          </li>
        </ul>
        <div className={cl["baggage-item__buttons"]}>
          <button
            className={cl["baggage-item__button"]}
            onClick={toggleEditModal}
          >
            <EditNoteIcon sx={{ fontSize: "35px" }} />
          </button>
          <button
            className={cl["baggage-item__button"]}
            onClick={toggleDeleteModal}
          >
            <DeleteForeverIcon sx={{ fontSize: "35px" }} />
          </button>
        </div>
      </div>
      <Modal open={isEditModalOpen} toggleModal={toggleEditModal}>
        <GeneralBaggageForm
          title="Edit Baggage"
          isEdit={true}
          isClearForm={false}
          closeModal={toggleEditModal}
          baggage={baggage}
        />
      </Modal>
      <Modal open={isDeleteModalOpen} toggleModal={toggleDeleteModal}>
        <ConfirmForm
          title="Do you relly want to delete?"
          closeModal={toggleDeleteModal}
          performAction={deleteBaggage}
          loading={isLoading}
        ></ConfirmForm>
      </Modal>
      <Notify
        show={errorAlert.show}
        message={errorAlert.message}
        type="error"
      ></Notify>
    </li>
  );
};

export default BaggageItem;
