import { FC } from "react";
import cl from "./Baggage.module.scss";
import Header from "../../components/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import GeneralBaggageForm from "../../components/forms/GeneralBaggageForm/GeneralBaggageForm";

const Baggage: FC = () => {
  const [isCreateModalOpen, toggleCreateModal] = useModal();

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
};

export default Baggage;
