import firebaseApp from "../../../utils/firebase/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth(firebaseApp);

const restorePasswordFirebase = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);

    return {
      type: "success",
      message: "Enlace enviado con exito",
    };
  } catch (error) {
    console.log(error.message);

    if (error.message === "Firebase: Error (auth/user-not-found).") {
      return {
        type: "error",
        message: "El correo electronico no se encuentra registrado",
      };
    }

    return {
      type: "error",
      message: "Ocurrio un error al realizar la operacion solicitada",
    };
  }
};

export default restorePasswordFirebase;
