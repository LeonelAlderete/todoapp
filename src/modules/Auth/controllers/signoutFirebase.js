import firebaseApp from "../../../utils/firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

const signoutFirebase = () => {
  try {
    signOut(auth);

    return {
      type: "success",
    };
  } catch (error) {
    console.log(error);

    return {
      type: "error",
    };
  }
};

export default signoutFirebase;
