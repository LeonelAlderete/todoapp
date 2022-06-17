import React, { useState } from "react";
//rutas
import { useHistory } from "react-router-dom";
//ui
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { ImMenu3 } from "react-icons/im";
import { GiNotebook } from "react-icons/gi";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Actions
import { setDataCanvas } from "../../../../store/slices/offcanvasSlice";
//hooks
import useAuthFormikValidation from "../../../Auth/hooks/useAuthFormikValidation";
//utils
import { PROFILE_DATA } from "../../../../utils/constants/constants";

export default function NavBar() {
  const { logoutUser } = useAuthFormikValidation();
  const { type: canvasType } = useSelector((state) => state.offcanvas);
  const dispatch = useDispatch();

  const logout = () => {
    logoutUser();
  };

  return (
    <>
      <span className="d-none d-lg-block">
        <DesktopNavBar
          logout={logout}
          dispatch={dispatch}
          canvasType={canvasType}
        />
      </span>

      <span className="d-block d-lg-none">
        <MobileNavBar
          logout={logout}
          dispatch={dispatch}
          canvasType={canvasType}
        />
      </span>
    </>
  );
}

const DesktopNavBar = (props) => {
  const { logout, dispatch, canvasType } = props;
  const history = useHistory();

  const onClickProfileButton = async () => {
    const activaOffcanvas = document.querySelector("#ActivateOffcanvas");

    const dataCanvas = {
      type: PROFILE_DATA,
      offcanvasPosition: "end",
      title: "Perfil",
    };

    canvasType !== PROFILE_DATA && (await dispatch(setDataCanvas(dataCanvas)));

    activaOffcanvas.click();
  };

  return (
    <div className="container-fluid fixed-top">
      <div className="row py-2 px-4 background-color-primary text-white fw-bold">
        {/* Logo */}
        <div
          className="col cursor-pointer d-flex align-items-center"
          onClick={() => history.push("/")}
        >
          <GiNotebook size={"2.5em"} />
          <span className="d-none d-md-block px-2">ToDo App</span>
        </div>

        {/* Menu de opciones */}
        <div className="col d-flex justify-content-end align-items-center">
          {/* Perfil de usuario */}
          <span className="px-2 mx-1 cursor-pointer">
            <FaUserAlt size={"1.8em"} onClick={() => onClickProfileButton()} />
          </span>

          {/* Cerrar sesion */}
          <span className="px-2 mx-1 cursor-pointer">
            <AiOutlineLogout size={"1.8em"} onClick={() => logout()} />
          </span>
        </div>
      </div>
    </div>
  );
};

const MobileNavBar = (props) => {
  const { logout, dispatch, canvasType } = props;
  const [showCloseMenuIcon, setShowCloseMenuIcon] = useState(false);
  const history = useHistory();

  const onClickProfileButton = async () => {
    const activaOffcanvas = document.querySelector("#ActivateOffcanvas");

    const dataCanvas = {
      type: PROFILE_DATA,
      offcanvasPosition: "end",
      title: "Perfil",
    };

    canvasType !== PROFILE_DATA && (await dispatch(setDataCanvas(dataCanvas)));

    activaOffcanvas.click();

    setShowCloseMenuIcon(false);
  };

  const onClickLogoutButton = () => {
    setShowCloseMenuIcon(false);

    logout();
  };

  return (
    <>
      <div className="container-fluid fixed-top">
        <div className="row d-flex align-items-center background-color-primary text-white fw-bold py-2 px-4 ">
          {/* Logo */}
          <div
            className="col cursor-pointer d-flex align-items-center"
            onClick={() => history.push("/")}
          >
            <GiNotebook size={"2.5em"} />
            <span className="d-none d-md-block px-2">To Do App</span>
          </div>

          {/* Abrir menu */}
          <div className="col cursor-pointer d-flex justify-content-end">
            {/* Icono abrir menu */}
            <ImMenu3
              className={showCloseMenuIcon && "visually-hidden"}
              size={"2.7em"}
              onClick={() => setShowCloseMenuIcon(true)}
              //Activar navbar|collapse
              data-bs-toggle="collapse"
              data-bs-target="#navBarCollapse"
              aria-expanded="false"
              aria-controls="navBarCollapse"
            />

            {/* Icono cerrar menu */}
            <AiOutlineClose
              className={!showCloseMenuIcon && "visually-hidden"}
              size={"2.7em"}
              onClick={() => setShowCloseMenuIcon(false)}
              //Cerrar navbar|collapse
              data-bs-toggle="collapse"
              data-bs-target="#navBarCollapse"
              aria-expanded="false"
              aria-controls="navBarCollapse"
            />
          </div>

          {/* Opciones */}
          <div className="row collapse text-center" id="navBarCollapse">
            {/* Mi perfil */}
            <span
              className="col-12 cursor-pointer py-2"
              //Activar offcanvas
              onClick={() => onClickProfileButton(PROFILE_DATA)}
              //Cerrar collapse
              data-bs-toggle="collapse"
              data-bs-target="#navBarCollapse"
              aria-expanded="false"
              aria-controls="navBarCollapse"
            >
              Mi perfil
            </span>

            {/* Cerrar sesion */}
            <span
              className="col-12 cursor-pointer py-2"
              onClick={() => onClickLogoutButton()}
              //Cerrar collapse
              data-bs-toggle="collapse"
              data-bs-target="#navBarCollapse"
              aria-expanded="false"
              aria-controls="navBarCollapse"
            >
              Cerrar sesion
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
