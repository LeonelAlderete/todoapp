import { useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Actions
import { setLoggedUserData } from "../../../store/slices/authDataSlice";
import { setSecondaryModalData } from "../../../store/slices/modalSlice";
//hooks
import useShowStatusMessagge from "../../../modules/Global/hooks/useShowStatusMessagge";
//controladores
import loginUserWithPasswordFirebase from "../controllers/loginUserWithPasswordFirebase";
import loginWithGoogleApi from "../controllers/loginWithGoogleAPI";
import registerUserWithPasswordFirebase from "../controllers/registerUserWithPasswordFirebase";
import restorePasswordFirebase from "../controllers/restorePasswordFirebase";
import signoutFirebase from "../controllers/signoutFirebase";
//utils
import { useFormik } from "formik";
import * as Yup from "yup";
//constantes
import {
  UNKNOWN_ERROR,
  LOCAL_STORAGE_REMEMBER_EMAIL_KEY,
  LOCAL_STORAGE_AUTHDATA_KEY,
  LOCAL_STORAGE_AUTHDATA_VALUE,
  LOCAL_STORAGE_PROFILEDATA_KEY,
} from "../../../utils/constants/constants";

export default function useAuthFormikValidation() {
  const dispatch = useDispatch();
  const { userID } = useSelector((store) => store.authData);
  const { hideFormAlerts, showStatusMessage } = useShowStatusMessagge();
  const [disableButton, setDisableButton] = useState(false); //Deshabilita botones mientras se intenta logear al usuario

  const formikLoginForm = useFormik({
    initialValues: {
      email: localStorage.getItem(LOCAL_STORAGE_REMEMBER_EMAIL_KEY)
        ? localStorage.getItem(LOCAL_STORAGE_REMEMBER_EMAIL_KEY)
        : "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El correo no es valido")
        .required("El correo es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (formData) => {
      setDisableButton(true);

      const res = await loginUserWithPasswordFirebase(
        formData.email,
        formData.password
      );

      if (res.type === "error") {
        //Mostrar error en el DOM
        const errorContainer = document.querySelector("#errors-container");
        const emailInput = document.querySelector("#email");
        const passwordInput = document.querySelector("#password");
        const inputs = [emailInput, passwordInput];
        const message = [
          "Error en el usuario o contraseña",
          "Verifica los datos ingresados",
        ];

        showStatusMessage("error", "InputAndMessageAlert", {
          errorContainer,
          inputs,
          message,
        });
      }

      setDisableButton(false);
    },
  });

  const formikRegisterForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El correo ingresado no es valido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("repeatPassword")], "La contraseña es obligatoria")
        .min(6, "La contraseña debe tener minimo 6 caracteres"),
      repeatPassword: Yup.string()
        .required("Las contraseña no coinciden")
        .oneOf([Yup.ref("password")], "Las contraseña no coinciden")
        .max(15, "La contraseña debe tener maximo 15 caracteres"),
    }),
    onSubmit: async (formData) => {
      setDisableButton(true);

      const res = await registerUserWithPasswordFirebase(
        formData.email,
        formData.password
      );

      //Mostrar mensaje de error
      if (res.type === "error") {
        let errorContainer = document.querySelector("#errors-container");

        showStatusMessage("error", "MessageAlert", {
          errorContainer,
          message: [res.message],
        });
      }

      setDisableButton(false);
    },
  });

  const formikRestorePassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
    }),
    onSubmit: async (formData) => {
      setDisableButton(true);

      const res = await restorePasswordFirebase(formData.email);

      //Mostrar mensaje de exito|error
      let errorContainer = document.querySelector("#errors-container");
      const inputs = [document.querySelector("#email")];
      const message = [res.message];

      res.type === "success"
        ? showStatusMessage("success", "MessageAlert", {
            errorContainer,
            message,
          })
        : showStatusMessage("error", "InputAndMessageAlert", {
            errorContainer,
            inputs,
            message,
          });

      setDisableButton(false);
    },
  });

  const loginFormValidation = (e) => {
    e.preventDefault();
    setDisableButton(true);

    //Errores
    const emailError = formikLoginForm.errors.email;
    const passwordError = formikLoginForm.errors.password;

    // emailError | passwordError: Su valor es "false" si los campos son correctos
    if (emailError || passwordError) {
      setDisableButton(false);

      //Elementos DOM
      const errorContainer = document.querySelector("#errors-container");
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");

      const inputs = [emailInput, passwordInput];
      const message = [emailError, passwordError];

      showStatusMessage("error", "InputAndMessageAlert", {
        errorContainer,
        inputs,
        message,
      });
    } else {
      setDisableButton(false);

      formikLoginForm.handleSubmit();
    }
  };

  const registerFormValidation = (e) => {
    e.preventDefault();
    setDisableButton(true);

    //Errores
    const emailError = formikRegisterForm.errors.email;
    const passwordError = formikRegisterForm.errors.password;
    const repeatPasswordError = formikRegisterForm.errors.repeatPassword;

    // emailError | passwordError | repeatPasswordError: Su valor es "false" si los campos son correctos
    if (emailError || passwordError || repeatPasswordError) {
      setDisableButton(false);

      //Elementos DOM
      const errorContainer = document.querySelector("#errors-container");
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");
      const repeatPasswordInput = document.querySelector("#repeatPassword");

      const inputs = [emailInput, passwordInput, repeatPasswordInput];
      const message = [emailError, passwordError, repeatPasswordError];

      showStatusMessage("error", "InputAndMessageAlert", {
        errorContainer,
        inputs,
        message,
      });
    } else {
      setDisableButton(false);

      //Ocultar errores en el DOM
      const errorContainer = document.querySelector("#errors-container");
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");
      const repeatPasswordInput = document.querySelector("#repeatPassword");

      const arrayInput = [emailInput, passwordInput, repeatPasswordInput];

      hideFormAlerts(errorContainer, arrayInput);

      formikRegisterForm.handleSubmit();
    }
  };

  const restorePasswordFormValidation = (e) => {
    e.preventDefault();
    setDisableButton(true);

    const errorContainer = document.querySelector("#errors-container");
    const inputs = [document.querySelector("#email")];
    const message = [formikRestorePassword.errors.email];

    if (message[0]) {
      setDisableButton(false);

      showStatusMessage("error", "InputAndMessageAlert", {
        errorContainer,
        inputs,
        message,
      });
    } else {
      setDisableButton(false);

      hideFormAlerts(errorContainer, inputs);

      formikRestorePassword.handleSubmit();
    }
  };

  const loginUserWithGoogle = async () => {
    setDisableButton(true);

    const res = await loginWithGoogleApi();

    //Mostrar mensaje de error
    if (res.type === "error") {
      let errorContainer = document.querySelector("#errors-container");

      showStatusMessage("error", "MessageAlert", {
        errorContainer,
        message: [res.message],
      });

      setDisableButton(false);
    }
  };

  const loginGuestUser = () => {
    localStorage.setItem(
      LOCAL_STORAGE_AUTHDATA_KEY,
      LOCAL_STORAGE_AUTHDATA_VALUE
    );

    const authData = {
      userID: LOCAL_STORAGE_AUTHDATA_VALUE,
      email: null,
    };

    dispatch(setLoggedUserData(authData));
  };

  const logoutUser = async () => {
    if (userID === LOCAL_STORAGE_AUTHDATA_VALUE) {
      localStorage.removeItem(LOCAL_STORAGE_AUTHDATA_KEY);

      const authData = {
        userID: null,
        email: null,
      };

      dispatch(setLoggedUserData(authData));
    } else {
      const res = await signoutFirebase();

      if (res.type === "success") {
        const authData = {
          userID: null,
          email: null,
        };

        dispatch(setLoggedUserData(authData));
      } else {
        const showSecondaryModal = document.querySelector(
          "#showSecondaryModal"
        );

        const modalData = {
          type: UNKNOWN_ERROR,
          description: "Ocurrio un error al realizar la operacion solicitada",
          confirmFunction: false,
        };

        dispatch(setSecondaryModalData(modalData));

        showSecondaryModal.click();
      }
    }
  };

  return {
    disableButton,
    formikLoginForm,
    formikRegisterForm,
    formikRestorePassword,
    loginUserWithGoogle,
    loginGuestUser,
    loginFormValidation,
    registerFormValidation,
    restorePasswordFormValidation,
    logoutUser,
  };
}
