import firebaseApp from "../../../utils/firebase/firebase";
import { getFirestore, query, collection, getDocs } from "firebase/firestore";
const firestoreDB = getFirestore(firebaseApp);
//constantes
const USER_DATA = "UsersData";
const PROFILE = "Profile";

const getProfileDataFirebase = async (userID) => {
  try {
    const collectionRef = query(
      collection(firestoreDB, USER_DATA, userID, PROFILE)
    );

    const response = await getDocs(collectionRef);

    const profileData = response.docs.map((document) => document.data());

    if (profileData.length > 0) {
      return profileData[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getProfileDataFirebase;
