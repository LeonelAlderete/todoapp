import firebaseApp from "../../../utils/firebase/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
const firestoreDB = getFirestore(firebaseApp);
const USER_DATA = "UsersData";
const TASKS = "Tasks";

const deleteTaskFirestore = async (userID, taskID) => {
  try {
    await deleteDoc(doc(firestoreDB, USER_DATA, userID, TASKS, taskID));

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

export default deleteTaskFirestore;
