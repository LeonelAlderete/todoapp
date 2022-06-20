import React from "react";
//ui
import avatar1 from "../../assets/avatar1.png";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
//hooks
import useAuthFormikValidation from "../../hooks/useAuthFormikValidation";

export default function RegisterForm() {
  const {
    disableButton,
    formikRegisterForm,
    registerFormValidation,
    loginUserWithGoogle,
  } = useAuthFormikValidation();

  const onSubmitForm = (e) => {
    registerFormValidation(e);
  };

  const onClickGoogleButton = () => {
    loginUserWithGoogle();
  };

  return (
    <>
      {/* Titulo */}
      <div className="text-center">
        <h2>Crear una nueva cuenta</h2>
      </div>

      {/* Avatar Auth */}
      <div className="text-center mt-2 mb-4">
        <img src={avatar1} className="img-fluid" width={200} alt="" />
      </div>

      {/* Formulario */}
      <Form
        disableButton={disableButton}
        formikRegisterForm={formikRegisterForm}
        onSubmitForm={onSubmitForm}
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
      />
    </>
  );
}

const Form = (props) => {
  const { disableButton, formikRegisterForm, onSubmitForm } = props;

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
            value={formikRegisterForm.values.email}
            onChange={formikRegisterForm.handleChange}
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
            /* Formik */
            value={formikRegisterForm.values.password}
            onChange={formikRegisterForm.handleChange}
          />
        </div>

        {/* Repetir contraseña */}
        <div className="input-group input-group-sm mb-3 px-0">
          {/* Icono Input Contraseña */}
          <span className="input-group-text" id="auth-email-input">
            <FaLock color="black" />
          </span>

          {/* Input Contraseña */}
          <input
            type="password"
            className="form-control"
            placeholder="Repetir contraseña"
            name="repeatPassword"
            id="repeatPassword"
            /* Formik */
            value={formikRegisterForm.values.repeatPassword}
            onChange={formikRegisterForm.handleChange}
          />
        </div>

        {/* Registrarse */}
        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-primary rounded-pill fw-light"
            disabled={disableButton}
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

const GoogleOrGuestLogin = (props) => {
  const { disableButton, onClickGoogleButton } = props;

  return (
    <div className="container">
      {/* Titulo Login Google */}
      <div className="text-center mt-1">
        <p>Registrarse con:</p>
      </div>

      {/* Ingresar con Google o Invitado */}
      <div className="row px-5">
        {/* Ingresar con Google */}
        <div className="col p-1">
          <div className="d-grid gap-2">
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={onClickGoogleButton}
              disabled={disableButton}
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
