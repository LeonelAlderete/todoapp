import React from "react";
//Redux
import { useSelector } from "react-redux";
//Componentes
import ProfileData from "../../../Profile/components/ProfileData";
import SelectCategory from "../../../Task/components/SelectCategory/SelectCategory";
import Loading from "../Loading";
//Constantes
import {
  PROFILE_DATA,
  SELECT_CATEGORY,
} from "../../../../utils/constants/constants";

export default function Offcanvas(props) {
  const { type, offcanvasPosition, title } = useSelector(
    (state) => state.offcanvas
  );

  const setOffcanvasBody = () => {
    if (type === PROFILE_DATA) return <ProfileData />;

    if (type === SELECT_CATEGORY) return <SelectCategory />;

    if (!type) return <Loading />;
  };

  return (
    <>
      <div
        className={
          offcanvasPosition === "start"
            ? "offcanvas offcanvas-start"
            : "offcanvas offcanvas-end"
        }
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header background-color-primary text-white">
          {/* Titulo */}
          <h5 id="offcanvasRightLabel">{title}</h5>

          {/* Boton cerrar */}
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        {/* Cuerpo */}
        <div className="offcanvas-body">{setOffcanvasBody()}</div>
      </div>

      {/* Activar canvas */}
      <span
        id="ActivateOffcanvas"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      ></span>
    </>
  );
}
