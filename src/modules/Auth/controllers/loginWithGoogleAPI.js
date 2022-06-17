import firebaseApp from "../../../utils/firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//constantes
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const loginWithGoogleAPI = async () => {
  try {
    //Login
    const res = await signInWithPopup(auth, provider);

    return {
      type: "success",
      message: "Usuario logeado con exito",
      authData: res.user,
    };
  } catch (error) {
    console.log(error.message);

    return {
      type: "error",
      message: "Ocurrio un error al realizar la operacion solicitada",
    };
  }
};

export default loginWithGoogleAPI;
