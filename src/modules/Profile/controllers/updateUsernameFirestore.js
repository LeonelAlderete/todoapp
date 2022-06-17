import firebaseApp from "../../../utils/firebase/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const firestoreDB = getFirestore(firebaseApp);
const USER_DATA = "UsersData";
const PROFILE = "Profile";

const updateUsernameFirestore = async (userID, newValue) => {
  try {
    const docRef = doc(firestoreDB, USER_DATA, userID, PROFILE, userID);

    await updateDoc(docRef, {
      username: newValue,
    });

    return {
      type: "success",
      message: "Nombre de usuario actualizado",
    };
  } catch (error) {
    console.log(error);

    return {
      type: "error",
      message: "Ocurrio un error al realizar la operacion solicitada",
    };
  }
};

export default updateUsernameFirestore;
