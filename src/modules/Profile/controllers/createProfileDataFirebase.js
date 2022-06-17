import firebaseApp from "../../../utils/firebase/firebase";
import { getFirestore, setDoc, doc } from "firebase/firestore";
const firestoreDB = getFirestore(firebaseApp);
//constantes
const USER_DATA = "UsersData";
const PROFILE = "Profile";

const createProfileDataFirebase = async (userID, username) => {
  try {
    const profileData = {
      username: username ? username : "Nombre de usuario",
      taskCounter: 0,
    };

    await setDoc(
      doc(firestoreDB, USER_DATA, userID, PROFILE, userID),
      profileData
    );

    return profileData;
  } catch (error) {
    console.log(error);
  }
};

export default createProfileDataFirebase;
