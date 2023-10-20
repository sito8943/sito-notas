import React from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

// components
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

function ConfirmationModal({ onAccept, visible, onClose }) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="appear flex items-center justify-center w-full h-full">
        <div className="bg-light-background2 dark:bg-dark-background2 py-5 px-10 flex flex-col gap-5">
          <div className="flex items-start justify-start w-full gap-5">
            <FontAwesomeIcon
              icon={faWarning}
              className="text-warning text-4xl"
            />
            <h3 className="text-3xl dark:text-white">Confirmación</h3>
          </div>
          <p className="dark:text-white">¿Desea continuar con la operación?</p>
          <div className="flex gap-3">
            <Button
              name="confirm"
              type="button"
              aria-label="click para confirmar"
              className="secondary submit button"
              onClick={onAccept}
            >
              Confirmar
            </Button>
            <Button
              type="button"
              name="cancel"
              aria-label="click para cancelar"
              onClick={onClose}
              className="secondary outlined"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
