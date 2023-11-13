import { FC } from "react";
import { IBaggage } from "../../models/baggage";
import { useParams } from "react-router-dom";
import cl from "./BaggageItem.module.scss";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "../UI/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import GeneralBaggageForm from "../Forms/GeneralForm/GeneralBaggageForm";
import ConfirmForm from "../Forms/ConfirmForm/ConfirmForm";
import { useFetching } from "../../hooks/useFetching";
import BaggageStore from "../../store/BaggageStore";

interface BaggageItemProps {
  baggage: IBaggage;
}

const BaggageItem: FC<BaggageItemProps> = ({ baggage }) => {
  const { tiketId } = useParams();

  const [isEditModalOpen, toggleEditModal] = useModal();
  const [isDeleteModalOpen, toggleDeleteModal] = useModal();

  const [deleteBaggage, isLoading] = useFetching(async (): Promise<void> => {
    const baggageId = baggage.id || 0;
    await BaggageStore.deleteBaggage(baggageId);
    if (tiketId) {
      const ticketID = +tiketId;
      await BaggageStore.getBaggageById(ticketID);
    }
  });

  return (
    <li className={cl["baggage-item"]}>
      <h2 className={cl["baggage-item__cost"]}>Cost: {baggage.cost}$</h2>
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
      <div className="baggage-item__buttons">
        <button className="baggage-item__button" onClick={toggleEditModal}>
          <EditNoteIcon />
        </button>
        <button className="baggage-item__button" onClick={toggleDeleteModal}>
          <DeleteForeverIcon />
        </button>
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
    </li>
  );
};

export default BaggageItem;
