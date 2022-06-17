import firebaseApp from "../../../utils/firebase/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const firestoreDB = getFirestore(firebaseApp);
const USER_DATA = "UsersData";
const TASKS = "Tasks";

const updateImportatValueFirestore = async (userID, taskID, newValue) => {
  try {
    const docRef = doc(firestoreDB, USER_DATA, userID, TASKS, taskID);

    await updateDoc(docRef, {
      important: newValue,
    });

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

export default updateImportatValueFirestore;
