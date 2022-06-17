import React from "react";
//router
import { useHistory } from "react-router-dom";
//ui
import { BiLockAlt } from "react-icons/bi";
//Hooks
import useAuthFormikValidation from "../../hooks/useAuthFormikValidation";
//constantes
import { LOGIN_FORM_PATH_VALUE } from "../../../../utils/constants/constants";

export default function RestorePassword() {
  const history = useHistory();
  const {
    disableButton,
    formikRestorePassword,
    restorePasswordFormValidation,
  } = useAuthFormikValidation();

  const onClickBackToLogin = () => {
    history.push(LOGIN_FORM_PATH_VALUE);
  };

  const onSubmitForm = (e) => {
    restorePasswordFormValidation(e);
  };

  return (
    <div className="background-color-primary-ligth form-center">
      <div className="px-5 py-4 bg-light rounded-3 text-center form-width">
        {/* Icono de formulario */}
        <div className="p-4 border border-3 border-dark rounded-circle d-inline-flex">
          <BiLockAlt size={"3.5em"} />
        </div>

        {/* Titulo | Descripcion */}
        <div className="mt-3">
          <h5>¿Tienes problemas para iniciar sesion?</h5>

          <p className="fw-light">
            Ingresa tu correo electronico y te enviaremos un enlace para que
            recuperes el acceso a tu cuenta.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={(e) => onSubmitForm(e)}>
          {/* Input correo */}
          <div>
            <input
              type="string"
              className="form-control"
              placeholder="Correo electronico"
              id="email"
              name="email"
              //Formik
              value={formikRestorePassword.values.email}
              onChange={formikRestorePassword.handleChange}
            />
          </div>

          {/* Boton enviar */}
          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={disableButton}
            >
              Enviar enlace de inicio de sesion
            </button>
          </div>
        </form>

        {/* Error */}
        <div
          className="invisible mt-2 mb-2 text-center"
          id="errors-container"
        ></div>

        {/* Separador */}
        <hr></hr>

        {/* Volver al login */}
        <div
          className="d-inline-flex p-2 fw-bold cursor-pointer"
          onClick={() => onClickBackToLogin()}
        >
          <h6 className="m-0">Volver al inicio de sesion</h6>
        </div>
      </div>
    </div>
  );
}
