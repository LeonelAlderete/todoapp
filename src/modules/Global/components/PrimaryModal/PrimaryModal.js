import React from "react";
//Redux
import { useSelector } from "react-redux";
//Componentes
import TaskData from "../../../Task/components/TaskData/TaskData";
//Constantes
import { VIEW_TASK_DATA } from "../../../../utils/constants/constants";
import Loading from "../Loading";

export default function PrimaryModal() {
  const { primaryModalData } = useSelector((state) => state.modal);

  const setPrimaryModalBody = () => {
    if (primaryModalData.type === VIEW_TASK_DATA) {
      return <TaskData />;
    }

    if (!primaryModalData.type) {
      return <Loading />;
    }
  };

  return (
    <>
      {/* Modal Primario */}
      <div
        className="modal fade"
        id="modalPrimario"
        aria-hidden="true"
        aria-labelledby="modalPrimarioLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            {/* Cerrar Modal */}
            <div className="modal-header background-color-primary text-white">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Cuerpo */}
            <div className="modal-body">{setPrimaryModalBody()}</div>
          </div>
        </div>
      </div>

      {/* Activar Modal Primario */}
      <span
        data-bs-toggle="modal"
        data-bs-target="#modalPrimario"
        id="showPrimaryModal"
      ></span>

      {/* Cerrar modal Primario */}
      <span
        data-bs-dismiss="modal"
        aria-label="Close"
        id="closePrimaryModal"
      ></span>
    </>
  );
}
