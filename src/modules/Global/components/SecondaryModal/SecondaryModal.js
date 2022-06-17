import React from "react";
//ui
import { BiError } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
//Redux
import { useSelector } from "react-redux";
//Hooks
import useUpdateTask from "../../../Task/hooks/useUpdateTask";
//constantes
import {
  DELETE_TASK,
  UNKNOWN_ERROR,
  LOCAL_STORAGE_AUTHDATA_VALUE,
} from "../../../../utils/constants/constants";
const ICON_SIZE = "4em";

export default function SecondaryModal() {
  return (
    <>
      {/* Modal Secundario */}
      <div
        className="modal fade"
        id="modalSecundario"
        aria-hidden="true"
        aria-labelledby="modalSecundarioLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Cuerpo */}
            <div className="modal-body">{<DialogBox />}</div>
          </div>
        </div>
      </div>

      {/* Activar Modal Secundario */}
      <span
        data-bs-toggle="modal"
        data-bs-target="#modalSecundario"
        id="showSecondaryModal"
      ></span>

      {/* Cerrar modal Secundario */}
      <span
        data-bs-dismiss="modal"
        aria-label="Close"
        id="closeSecondaryModal"
      ></span>
    </>
  );
}

const DialogBox = () => {
  const { userID } = useSelector((state) => state.authData);
  const { secondaryModalData } = useSelector((state) => state.modal);
  const { type, description, confirmFunction, data } = secondaryModalData;
  const { disableButton, deleteTaskLocalStorage, deleteTaskDataBase } =
    useUpdateTask();

  const onClickConfirm = async () => {
    const closeSecondaryModal = document.querySelector("#closeSecondaryModal");

    if (type === DELETE_TASK) {
      if (userID === LOCAL_STORAGE_AUTHDATA_VALUE) {
        await deleteTaskLocalStorage(data);
      } else {
        await deleteTaskDataBase(data);
      }
    }

    closeSecondaryModal.click();
  };

  return (
    <>
      {/* DESCRIPCION */}
      <div className="text-center fs-5 mb-1">
        <span>{description}</span>
      </div>

      {/* ICONOS */}
      {/* Eliminar */}
      {type === DELETE_TASK && (
        <div className="text-center">
          <RiDeleteBin2Line size={ICON_SIZE} />
        </div>
      )}

      {/* Error */}
      {type === UNKNOWN_ERROR && (
        <div className="text-center">
          <BiError size={ICON_SIZE} />
        </div>
      )}

      <hr></hr>

      {/* FOOTER */}
      <div className="row">
        {/* Si se debe confirmar una accion "confirmFunction" valdra "true", y se mostraran los botones para aceptar o cancelar la accion */}
        {/* Si "confirmFunction" vale "false" solo se muestrara el boton para cerrar el cuadro de dialogo */}
        {confirmFunction ? (
          <>
            {/* Cancelar accion */}
            <button
              className="col btn btn-secondary ms-2 me-1"
              id="closeSecondaryModal"
              disabled={disableButton}
              //Modal
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancelar
            </button>

            {/* Aceptar accion */}
            <button
              className="col btn btn-danger ms-1 me-2"
              onClick={() => onClickConfirm()}
              disabled={disableButton}
            >
              Aceptar
            </button>
          </>
        ) : (
          /* Cerrar mensaje */
          <button
            className="col btn btn-secondary ms-2 me-1"
            id="closeSecondaryModal"
            disabled={disableButton}
            //Modal
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Cerrar
          </button>
        )}
      </div>
    </>
  );
};
