import { FC } from "react";
import cl from "./ConfirmForm.module.scss";

interface ConfirmFormProps {
  closeModal: () => void;
  performAction: () => any;
  title: string;
}

const ConfirmForm: FC<ConfirmFormProps> = ({
  closeModal,
  performAction,
  title,
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
          Yes
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
