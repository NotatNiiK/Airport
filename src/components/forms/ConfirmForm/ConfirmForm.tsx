import { FC } from "react";
import cl from "./ConfirmForm.module.scss";
import ButtonLoader from "../../UI/ButtonLoader/ButtonLoader";

interface ConfirmFormProps {
  closeModal: () => void;
  performAction: () => Promise<void> | void;
  title: string;
  loading?: boolean;
}

const ConfirmForm: FC<ConfirmFormProps> = ({
  closeModal,
  performAction,
  title,
  loading,
}) => {
  return (
    <div className={cl["confirm-form"]}>
      <h2 className={cl["confirm-form__title"]}>{title}</h2>
      <div className={cl["confirm-form__buttons"]}>
        <button
          type="button"
          className={cl["confirm-form__button"]}
          onClick={performAction}
        >
          {loading ? <ButtonLoader /> : "Yes"}
        </button>
        <button
          type="button"
          className={cl["confirm-form__button"]}
          onClick={closeModal}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmForm;
