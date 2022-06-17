import firebaseApp from "../../../utils/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

const registerUserWithPasswordFirebase = async (email, password) => {
  try {
    //Registro
    const res = await createUserWithEmailAndPassword(auth, email, password);

    return {
      type: "success",
      message: "Usuario registrado con exito",
      authData: res.user,
    };
  } catch (error) {
    console.log(error.message);

    if (
      error.message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return {
        type: "error",
        message: "La contraseña debe tener minimo 6 caracteres",
      };
    }

    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      return {
        type: "error",
        message: "El correo electronico ya se encuentra registrado",
      };
    }

    return {
      type: "error",
      message: "Ocurrio un error al realizar la operacion solicitada",
    };
  }
};

export default registerUserWithPasswordFirebase;
