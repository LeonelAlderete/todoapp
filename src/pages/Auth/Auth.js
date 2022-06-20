import React, { useState } from "react";
//ui
import authBackground from "../../modules/Auth/assets/auth-bg.png";
//componentes
import LoginForm from "../../modules/Auth/components/LoginForm";
import RegisterForm from "../../modules/Auth/components/RegisterForm";

export default function Auth() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const changeFormButton = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        {/* Imagen de fondo */}
        <div className="d-none d-lg-block col-lg-6 background-color-primary py-4 px-0">
          <div className="d-flex align-items-center h-100">
            <img src={authBackground} className="img-fluid" alt="" />
          </div>
        </div>

        {/* Formularios */}
        <div className="col col-lg-6 bg-light py-4 px-0">
          <div className="d-flex align-items-center h-100">
            <div className="flex-column w-100">
              {showLoginForm ? <LoginForm /> : <RegisterForm />}

              {/* Separador */}
              <div className="my-4 px-4">
                <hr></hr>
              </div>

              <ChangeForm
                showLoginForm={showLoginForm}
                changeFormButton={changeFormButton}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChangeForm = (props) => {
  const { showLoginForm, changeFormButton } = props;

  return (
    <div className="text-center mb-3">
      <span>
        {showLoginForm ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
      </span>
      <span
        className="text-primary fw-bold cursor-pointer"
        onClick={() => changeFormButton()}
      >
        {showLoginForm ? "Registrate aqui" : "Inicia sesion aqui"}
      </span>
    </div>
  );
};
