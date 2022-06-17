import React, { useState } from "react";
//ui
import avatar from "../../../Auth/assets/avatar1.png";
import { AiFillEdit, AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
//hooks
import useProfile from "../../hooks/useProfile";
//componentes
import Loading from "../../../Global/components/Loading";
//Constantes
import { LOCAL_STORAGE_AUTHDATA_VALUE } from "../../../../utils/constants/constants";

export default function Profile() {
  const {
    disableButton,
    userID,
    email,
    taskCounter,
    username,
    profileFormValidation,
    formikProfileForm,
  } = useProfile();
  const [showEditUserData, setShowEditUserData] = useState(false);

  const counterDescription = () => {
    if (taskCounter > 9)
      return ` ¡Haz escrito un total de ${taskCounter} tareas!`;

    if (taskCounter > 1) return `Haz escrito ${taskCounter} tareas.`;

    if (taskCounter === 1) return `Haz escrito ${taskCounter} tarea.`;

    if (taskCounter < 1) return "No haz escrito ninguna tarea. ¡Crea una!";
  };

  return userID && taskCounter !== null && taskCounter !== undefined ? (
    <div>
      {/* Avatar de usuario */}
      <div className="text-center">
        <img src={avatar} className="img-fluid" width={100} alt="" />
      </div>

      {/* Datos de usuario | Formulario de edicion */}
      <div className="mt-3 text-center">
        {showEditUserData ? (
          /* Formulario de edicion */
          <EditUserData
            disableButton={disableButton}
            setShowEditUserData={setShowEditUserData}
            profileFormValidation={profileFormValidation}
            formikProfileForm={formikProfileForm}
          />
        ) : (
          <>
            {/* Datos de usuario */}
            <UserData
              setShowEditUserData={setShowEditUserData}
              userID={userID}
              username={username}
              email={email}
            />

            <hr />

            {/* Contador de tareas */}
            <div className="mx-2 d-flex justify-content-center">
              <div className="task-counter-pill rounded-pill d-flex align-items-center justify-content-center">
                <span className="fw-light text-light m-1">
                  {counterDescription()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

const UserData = (props) => {
  const { userID, username, email, setShowEditUserData } = props;

  return (
    <>
      {/* Nombre de usuario | Editar nombre */}
      <div className="d-inline-flex align-items-center text-center">
        {/* Nombre de usuario */}
        <span className="fs-4">
          {userID === LOCAL_STORAGE_AUTHDATA_VALUE ? "INVITADO" : username}
        </span>

        {/* Boton editar */}
        {userID !== LOCAL_STORAGE_AUTHDATA_VALUE && (
          <AiFillEdit
            className="ms-2 cursor-pointer"
            onClick={() => setShowEditUserData(true)}
          />
        )}
      </div>

      {/* Email */}
      {userID !== LOCAL_STORAGE_AUTHDATA_VALUE ? (
        <p className="fw-light">{email}</p>
      ) : (
        <p className="fw-light">¡Registrate para no perder tus tareas!</p>
      )}
    </>
  );
};

const EditUserData = (props) => {
  const {
    disableButton,
    setShowEditUserData,
    profileFormValidation,
    formikProfileForm,
  } = props;

  const onClickUpdateButton = () => {
    profileFormValidation();
  };

  return (
    <form>
      <div>
        {/* Input */}
        <div className="d-flex justify-content-center">
          <input
            className="form-control w-75"
            id="username"
            //formik
            name="username"
            value={formikProfileForm.values.username}
            onChange={formikProfileForm.handleChange}
          />
        </div>

        {/* Aceptar | Cancelar */}
        <div className="mt-3">
          {/* Aceptar */}
          <AiOutlineCheckCircle
            className="text-success cursor-pointer mx-1"
            size={"1.8em"}
            onClick={() => (disableButton ? null : onClickUpdateButton())}
          />

          {/* Cancelar */}
          <MdOutlineCancel
            className="text-danger cursor-pointer mx-1"
            size={"1.8em"}
            onClick={() => (disableButton ? null : setShowEditUserData(false))}
          />
        </div>

        {/* Error */}
        <div
          className="invisible mt-2 mx-5 py-2 border border-3 rounded text-center"
          id="errors-container"
        ></div>
      </div>
    </form>
  );
};
