import React from "react";
//Routes
import { useHistory } from "react-router-dom";
//hooks
import useAuthFormikValidation from "../../hooks/useAuthFormikValidation";
import useAuthLocalStorage from "../../hooks/useAuthLocalStorage";
//ui
import avatar1 from "../../assets/avatar1.png";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
//utils
import {
  LOCAL_STORAGE_REMEMBER_EMAIL_KEY,
  RESTORE_PASSWORD_PATH_VALUE,
} from "../../../../utils/constants/constants";

export default function LoginForm() {
  const {
    disableButton,
    formikLoginForm,
    loginUserWithGoogle,
    loginGuestUser,
    loginFormValidation,
  } = useAuthFormikValidation();
  const { updateEmailLocalStorage } = useAuthLocalStorage();
  const history = useHistory();

  const onSubmitForm = (e) => {
    loginFormValidation(e);
  };

  const onClickGoogleButton = () => {
    loginUserWithGoogle();
  };

  const onClickLoginGuest = () => {
    loginGuestUser();
  };

  const onClickRestorePassword = () => {
    history.push(RESTORE_PASSWORD_PATH_VALUE);
  };

  const saveEmailLocalStorage = (e) => {
    // checkValue: valor actual del checkbox para recordar usuario
    // true: Guardar nuevo elemento | false: Eliminar elemento guardado
    let checkValue = e.target.checked;

    updateEmailLocalStorage(
      checkValue,
      formikLoginForm.errors.email,
      formikLoginForm.values.email
    );
  };

  const renderRememberEmailCheckbox = () => {
    //Si hay un email guardado en Local se renderiza el checkbox marcado
    if (localStorage.getItem(LOCAL_STORAGE_REMEMBER_EMAIL_KEY)) {
      return (
        <input
          type="checkbox"
          className="form-check-input"
          onClick={(e) => saveEmailLocalStorage(e)}
          defaultChecked
        />
      );
    } else {
      return (
        <input
          type="checkbox"
          className="form-check-input"
          onClick={(e) => saveEmailLocalStorage(e)}
        />
      );
    }
  };

  return (
    <div>
      {/* Titulo */}
      <div className="text-center">
        <h2>Ingresa con tu cuenta</h2>
      </div>

      {/* Avatar Auth */}
      <div className="text-center mt-2 mb-4">
        <img src={avatar1} className="img-fluid" width={200} alt="" />
      </div>

      {/* Formulario */}
      <Form
        disableButton={disableButton}
        formikLoginForm={formikLoginForm}
        onSubmitForm={onSubmitForm}
        onClickRestorePassword={onClickRestorePassword}
        renderRememberEmailCheckbox={renderRememberEmailCheckbox}
      />

      {/* Error */}
      <div
        className="invisible mt-2 mx-5 py-2 border border-3 rounded text-center"
        id="errors-container"
      ></div>

      {/* Login Google | Invitado */}
      <GoogleOrGuestLogin
        disableButton={disableButton}
        onClickGoogleButton={onClickGoogleButton}
        onClickLoginGuest={onClickLoginGuest}
      />
    </div>
  );
}

const Form = (props) => {
  const {
    disableButton,
    formikLoginForm,
    onSubmitForm,
    onClickRestorePassword,
    renderRememberEmailCheckbox,
  } = props;

  return (
    <div className="mt-3 px-5">
      <form onSubmit={onSubmitForm}>
        {/* Email */}
        <div className="input-group input-group-sm mb-3 px-0">
          {/* Icono Input Email */}
          <span className="input-group-text" id="auth-email-input">
            <MdEmail color="black" />
          </span>

          {/* Input Email */}
          <input
            type="string"
            className="form-control"
            placeholder="Correo electronico"
            name="email"
            id="email"
            //Formik
            value={formikLoginForm.values.email}
            onChange={formikLoginForm.handleChange}
          />
        </div>

        {/* Contraseña */}
        <div className="input-group input-group-sm mb-3 px-0">
          {/* Icono Input Contraseña */}
          <span className="input-group-text" id="auth-email-input">
            <FaLock color="black" />
          </span>

          {/* Input Contraseña */}
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            name="password"
            id="password"
            //Formik
            value={formikLoginForm.values.password}
            onChange={formikLoginForm.handleChange}
          />
        </div>

        {/* Recordar usuario */}
        <div className="mb-3 form-check d-inline-flex">
          {renderRememberEmailCheckbox()}
          <label className="form-check-label mx-1">Recordar usuario</label>
        </div>

        {/* Ingresar */}
        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-primary rounded-pill fw-light"
            disabled={disableButton}
          >
            Ingresar
          </button>
        </div>

        {/* Recuperar contraseña */}
        <div className="d-flex justify-content-end mt-3 text-primary fw-bold">
          <p
            className="cursor-pointer"
            onClick={() => onClickRestorePassword()}
          >
            ¿Olvidaste tu contraseña?
          </p>
        </div>
      </form>
    </div>
  );
};

const GoogleOrGuestLogin = (props) => {
  const { disableButton, onClickGoogleButton, onClickLoginGuest } = props;
  return (
    <div className="container mt-1">
      {/* Titulo Login Google */}
      <div className="text-center">
        <p>Ingresar con:</p>
      </div>

      {/* Ingresar con Google o Invitado */}
      <div className="row px-5">
        {/* Ingresar con Google */}
        <div className="col p-1">
          <div className="d-grid gap-2">
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => onClickGoogleButton()}
              disabled={disableButton}
            >
              Google
            </button>
          </div>
        </div>

        {/* Ingresar como invitado */}
        <div className="col p-1">
          <div className="d-grid gap-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => onClickLoginGuest()}
              disabled={disableButton}
            >
              Invitado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
