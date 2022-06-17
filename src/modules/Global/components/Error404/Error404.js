import React from "react";
//rutas
import { useHistory } from "react-router-dom";
//ui
import { BiError } from "react-icons/bi";

export default function Error404() {
  const history = useHistory();

  return (
    <div className="container text-center mt-5">
      {/* Icono */}
      <BiError size={100} />

      <div>
        <span className="fs-5">
          {`El enlace al que intenta ingresar esta roto o no existe. `}
        </span>

        <span
          className="fs-5 text-success cursor-pointer"
          onClick={() => history.push("/")}
        >
          Ir a la pagina principal.
        </span>
      </div>
    </div>
  );
}
