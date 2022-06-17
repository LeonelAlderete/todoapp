import { useState, useEffect } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileData,
  updateUsername,
} from "../../../store/slices/profileDataSlice";
//hooks
import useShowStatusMessagge from "../../Global/hooks/useShowStatusMessagge";
//controllers
import getProfileDataFirebase from "../controllers/getProfileDataFirebase";
import createProfileDataFirebase from "../controllers/createProfileDataFirebase";
import updateUsernameFirestore from "../controllers/updateUsernameFirestore";
//utils
import { useFormik } from "formik";
import * as Yup from "yup";
//constantes
import {
  LOCAL_STORAGE_PROFILEDATA_KEY,
  LOCAL_STORAGE_AUTHDATA_VALUE,
} from "../../../utils/constants/constants";

export default function useProfile() {
  const dispatch = useDispatch();
  const { userID, email } = useSelector((state) => state.authData);
  const { taskCounter, username } = useSelector((state) => state.profileData);
  const { hideFormAlerts, showStatusMessage } = useShowStatusMessagge();
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    const onStart = async () => {
      //Obtener datos de DB
      if (
        userID &&
        userID !== LOCAL_STORAGE_AUTHDATA_VALUE &&
        taskCounter !== 0 &&
        !taskCounter
      ) {
        //Obtener datos de perfil
        let profileDataExists = await getProfileDataFirebase(userID);

        //Verificar si ya existen datos guardados
        if (profileDataExists) {
          dispatch(setProfileData(profileDataExists));
        } else {
          const newProfileData = await createProfileDataFirebase(
            userID,
            "Nombre de usuario"
          );
          dispatch(setProfileData(newProfileData));
        }
      }

      //Obtener datos locales
      if (
        userID &&
        userID === LOCAL_STORAGE_AUTHDATA_VALUE &&
        taskCounter !== 0 &&
        !taskCounter
      ) {
        //Datos locales
        const localProfileData = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_PROFILEDATA_KEY)
        );

        //Si existen datos almacenados
        if (localProfileData) {
          dispatch(setProfileData(localProfileData));
        } else {
          //Si no existen datos almacenados
          const newProfileData = {
            username: null,
            taskCounter: 0,
          };

          dispatch(setProfileData(newProfileData));

          //Guardar en local storage
          localStorage.setItem(
            LOCAL_STORAGE_PROFILEDATA_KEY,
            JSON.stringify(newProfileData)
          );
        }
      }
    };

    onStart();
  }, [userID]);

  const formikProfileForm = useFormik({
    initialValues: {
      username: username ? username : "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("El campo no puede estar vacio")
        .min(5, "Minimo 5 caracteres")
        .max(12, "Maximo 12 caracteres"),
    }),
    onSubmit: async (formData) => {
      setDisableButton(true);

      const res = await updateUsernameFirestore(userID, formData.username);

      if (res.type === "success") {
        //Mensaje exito
        const errorContainer = document.querySelector("#errors-container");
        const message = [res.message];

        showStatusMessage("success", "MessageAlert", {
          errorContainer,
          message,
        });

        //Actualizar datos en el DOM
        dispatch(updateUsername(formData.username));
      } else {
        //Mensaje error
        const errorContainer = document.querySelector("#errors-container");
        const message = [res.message];

        showStatusMessage("error", "MessageAlert", { errorContainer, message });
      }

      setDisableButton(false);
    },
  });

  const profileFormValidation = () => {
    const errorContainer = document.querySelector("#errors-container");
    const inputs = [document.querySelector("#username")];
    const message = [formikProfileForm.errors.username];

    if (message[0]) {
      showStatusMessage("error", "InputAndMessageAlert", {
        errorContainer,
        inputs,
        message,
      });
    } else {
      const errorContainer = document.querySelector("#errors-container");
      let inputs = [document.querySelector("#username")];
      hideFormAlerts(errorContainer, inputs);

      formikProfileForm.handleSubmit();
    }
  };

  return {
    disableButton,
    userID,
    email,
    taskCounter,
    username,
    formikProfileForm,
    profileFormValidation,
  };
}
