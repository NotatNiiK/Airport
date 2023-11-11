import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import cl from "./Modal.module.scss";

interface ModalProps {
  open: boolean;
  toggleModal: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ open, toggleModal, children }) => {
  const rootClass: string[] = [cl["modal"]];
  const modalClass: string[] = [cl["modal__body"]];

  if (open) {
    rootClass.push(cl["active"]);
    modalClass.push(cl["active"]);
  }

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
  }, [open]);

  return (
    <>
      {createPortal(
        <div className={rootClass.join(" ")} onClick={toggleModal}>
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
