import React from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

// components
import Modal from "../Modal/Modal";

function ConfirmationModal({ onAccept, visible, onClose }) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="appear flex items-center justify-center w-full h-full">
        <div className="bg-white py-5 px-10 flex flex-col gap-5">
          <div className="flex items-start justify-start w-full gap-5">
            <FontAwesomeIcon
              icon={faWarning}
              className="text-warning text-4xl"
            />
            <h3>Confirmación</h3>
          </div>
          <p>¿Desea continuar con la operación?</p>
          <div className="flex gap-3">
            <button
              name="confirm"
              type="button"
              aria-label="click para confirmar"
              className="primary submit button"
              onClick={onAccept}
            >
              Confirmar
            </button>
            <button
              type="button"
              name="cancel"
              aria-label="click para cancelar"
              onClick={onClose}
              className="button outlined"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
