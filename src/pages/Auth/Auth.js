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
    <div
      className="container-fluid d-flex"
      style={{
        height: "100vh",
      }}
    >
      <div className="row align-items-strech background-color-primary w-100">
        {/* Background imagen */}
        <div className="d-none d-lg-block col-lg-5 col-xl-6 align-self-center px-0">
          <img src={authBackground} className="img-fluid" alt="" />
        </div>

        {/* Formularios de Autenticacion */}
        <div className="col-lg-7 col-xl-6 bg-light">
          {showLoginForm ? <LoginForm /> : <RegisterForm />}

          {/* Separador */}
          <div className="my-4 px-4">
            <hr></hr>
          </div>

          {/* Cambiar formularios */}
          <div className="text-center mb-3">
            <span>
              {showLoginForm
                ? "¿No tienes una cuenta?"
                : "¿Ya tienes una cuenta?"}{" "}
            </span>
            <span
              className="text-primary fw-bold cursor-pointer"
              onClick={() => changeFormButton()}
            >
              {showLoginForm ? "Registrate aqui" : "Inicia sesion aqui"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
