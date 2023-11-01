import { FC, ReactNode } from "react";
import cl from "./Modal.module.scss";
import { createPortal } from "react-dom";

interface ModalProps {
  visible: boolean;
  toggleModalActive: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ visible, toggleModalActive, children }) => {
  const rootClass = [cl["modal"]];
  const modalClass = [cl["modal__body"]];

  if (visible) {
    rootClass.push(cl["active"]);
    modalClass.push(cl["active"]);
  }

  return (
    <>
      {createPortal(
        <div className={rootClass.join(" ")} onClick={toggleModalActive}>
          <div className={cl["modal__wrapper"]}>
            <div
              className={modalClass.join(" ")}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Modal;
