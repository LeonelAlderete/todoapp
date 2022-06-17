import firebaseApp from "../../../utils/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

const loginUserWithPasswordFirebase = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    return {
      type: "success",
      message: "Usuario logeado con exito",
      authData: res.user,
    };
  } catch (error) {
    console.log(error);

    if (
      error.message === "Firebase: Error (auth/user-not-found)." ||
      error.message === "Firebase: Error (auth/wrong-password)."
    ) {
      return {
        type: "error",
        message: "Error en el usuario o contraseña",
      };
    }

    return {
      type: "error",
      message: "Ocurrio un error al realizar la operacion solicitada",
    };
  }
};

export default loginUserWithPasswordFirebase;
