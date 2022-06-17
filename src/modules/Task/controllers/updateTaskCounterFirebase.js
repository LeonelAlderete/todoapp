import firebaseApp from "../../../utils/firebase/firebase";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";
const firestoreDB = getFirestore(firebaseApp);
const USER_DATA = "UsersData";
const PROFILE = "Profile";

const updateTaskCounterFirebase = async (userID) => {
  try {
    const docRef = doc(firestoreDB, USER_DATA, userID, PROFILE, userID);

    await updateDoc(docRef, {
      taskCounter: increment(1),
    });
  } catch (error) {
    console.log(error);
  }
};

export default updateTaskCounterFirebase;
