import React from "react";
//ui
import { FaExchangeAlt } from "react-icons/fa";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Actions
import { setDataCanvas } from "../../../../store/slices/offcanvasSlice";
//utils
import moment from "moment";
import "moment/locale/es";
//Constantes
import { SELECT_CATEGORY } from "../../../../utils/constants/constants";
moment.locale("es");

export default function TaskHeader() {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.taskList);
  const { type: canvasType } = useSelector((state) => state.offcanvas);

  const onClickSelectCategory = async () => {
    const activateOffcanvas = document.querySelector("#ActivateOffcanvas");

    const dataCanvas = {
      type: SELECT_CATEGORY,
      offcanvasPosition: "start",
      title: "Seleccionar categoria",
    };

    canvasType !== SELECT_CATEGORY &&
      (await dispatch(setDataCanvas(dataCanvas)));

    activateOffcanvas.click();
  };

  return (
    <>
      <div className="mt-2 mx-3 d-flex align-items-center">
        {/* Seleccionar lista */}
        <span onClick={() => onClickSelectCategory()}>
          <FaExchangeAlt className="cursor-pointer" size={"1.5em"} />
        </span>

        {/* Lista actual | Fecha del dia */}
        <div className="mx-3">
          {/* Nombre de lista acutal */}
          <span className="d-flex fs-5 text-success fw-bold">
            {selectedCategory}
          </span>

          {/* Fecha del dia */}
          <span className="fw-light d-flex fs-6">{moment().format("LL")}</span>
        </div>
      </div>
    </>
  );
}
