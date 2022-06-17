import { useState, useEffect } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Actions
import { setLoggedUserData } from "../../../store/slices/authDataSlice";
//Controllers
import getLoggedUserFirebase from "../controllers/getLoggedUserFirebase";
//Constantes
import {
  LOCAL_STORAGE_AUTHDATA_KEY,
  LOCAL_STORAGE_AUTHDATA_VALUE,
} from "../../../utils/constants/constants";

export default function useAuthData() {
  const [showLoading, setShowLoading] = useState(true);
  const { userID } = useSelector((state) => state.authData);
  const dispatch = useDispatch();

  //Obtener datos del usuario logeado
  useEffect(() => {
    const onStater = () => {
      const authLocalData = localStorage.getItem(LOCAL_STORAGE_AUTHDATA_KEY);

      if (!userID && authLocalData) {
        //Buscar usuario invitado
        const authData = {
          userID: LOCAL_STORAGE_AUTHDATA_VALUE,
          email: null,
        };

        dispatch(setLoggedUserData(authData));

        setShowLoading(false);
      } else if (!userID) {
        //Buscar usuario registrado
        getLoggedUserFirebase(dispatch, setLoggedUserData, setShowLoading);
      }
    };

    onStater();
  }, []);

  return {
    showLoading,
  };
}
