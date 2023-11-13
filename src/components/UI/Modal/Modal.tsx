import { FC, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import cl from "./Modal.module.scss";
import toggleBodyLock from "../../../utils/toggleBodyLock";

interface ModalProps {
  open: boolean;
  children: ReactNode;
  toggleModal: () => void;
}

const Modal: FC<ModalProps> = ({ open, children, toggleModal }) => {
  const rootClass: string[] = [cl["modal"]];
  const modalClass: string[] = [cl["modal__body"]];

  if (open) {
    rootClass.push(cl["active"]);
    modalClass.push(cl["active"]);
  }

  useEffect(() => {
    toggleBodyLock(open);
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
