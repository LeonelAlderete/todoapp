//constantes
import { LOCAL_STORAGE_REMEMBER_EMAIL_KEY } from "../../../utils/constants/constants";

//##################################################################################

export default function useAuthLocalStorage() {
  const updateEmailLocalStorage = (checkboxValue, emailError, emailValue) => {
    // checkboxValue: indica si se debe eliminar o guardar el elemento en LocalStorage
    // true: Guardar nuevo elemento | false: Eliminar elemento guardado
    if (checkboxValue && !emailError) {
      localStorage.setItem(LOCAL_STORAGE_REMEMBER_EMAIL_KEY, emailValue);
      //console.log("Item guardado en LocalStorage");
    } else if (!checkboxValue) {
      localStorage.removeItem(LOCAL_STORAGE_REMEMBER_EMAIL_KEY);
      //console.log("Item borrado en LocalStorage");
    }
  };

  return {
    updateEmailLocalStorage,
  };
}
