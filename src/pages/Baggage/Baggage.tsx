import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useModal } from "../../hooks/useModal";
import { useFetching } from "../../hooks/useFetching";
import { IAlert } from "../../models/alert";
import { Alert } from "@mui/material";
import cl from "./Baggage.module.scss";
import Header from "../../components/Header/Header";
import GeneralBaggageForm from "../../components/Forms/GeneralForm/GeneralBaggageForm";
import BaggageList from "../../components/BaggageList/BaggageList";
import Modal from "../../components/UI/Modal/Modal";
import BaggageStore from "../../store/BaggageStore";

const Baggage: FC = observer(() => {
  const { tiketId } = useParams();
  const [isCreateModalOpen, toggleCreateModal] = useModal();

  const [errorAlert, setErrorAlert] = useState<IAlert>({
    show: false,
    message: "",
  });

  const [getBaggage, isLoading] = useFetching(async (): Promise<void> => {
    if (tiketId) {
      const numberTicketId = +tiketId;
      const getBaggageResponse = await BaggageStore.getBaggageById(
        numberTicketId
      );
      if (getBaggageResponse?.hasError) {
        setErrorAlert({
          show: true,
          message: getBaggageResponse.response,
        });
      }
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
          {errorAlert.show ? (
            <Alert
              severity="error"
              sx={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {errorAlert.message}
            </Alert>
          ) : (
            <BaggageList
              baggages={BaggageStore.baggages}
              isLoading={isLoading}
            />
          )}
        </section>
        <Modal open={isCreateModalOpen} toggleModal={toggleCreateModal}>
          <GeneralBaggageForm
            title="Create Baggage"
            closeModal={toggleCreateModal}
            isClearForm={true}
          />
        </Modal>
      </div>
    </>
  );
});

export default Baggage;
