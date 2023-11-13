import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import cl from "./Baggage.module.scss";
import Header from "../../components/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import { useParams } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import GeneralBaggageForm from "../../components/Forms/GeneralBaggageForm/GeneralBaggageForm";
import BaggageList from "../../components/BaggageList/BaggageList";
import { useFetching } from "../../hooks/useFetching";
import BaggageStore from "../../store/BaggageStore";

const Baggage: FC = observer(() => {
  const { tiketId } = useParams();
  const [isCreateModalOpen, toggleCreateModal] = useModal();

  const [getBaggage, isLoading] = useFetching(async (): Promise<void> => {
    if (tiketId) {
      const numberTicketId = +tiketId;
      await BaggageStore.getBaggageById(numberTicketId);
    }
  });

  useEffect((): void => {
    getBaggage();
  }, []);

  return (
    <>
      <Header />
      <div className={cl["baggage"]}>
        <section className={cl["baggage__container"]}>
          <div className={cl["baggage__panel"]}>
            <h1 className={cl["baggage__title"]}>Your Baggage:</h1>
            <button
              className={cl["baggage__button"]}
              tabIndex={1}
              onClick={toggleCreateModal}
            >
              Add baggage +
            </button>
          </div>
          <BaggageList baggages={BaggageStore.baggages} isLoading={isLoading} />
        </section>
        <Modal open={isCreateModalOpen} toggleModal={toggleCreateModal}>
          <GeneralBaggageForm
            title="Create Baggage"
            isEdit={false}
            closeModal={toggleCreateModal}
            isClearForm={true}
          />
        </Modal>
      </div>
    </>
  );
});

export default Baggage;
