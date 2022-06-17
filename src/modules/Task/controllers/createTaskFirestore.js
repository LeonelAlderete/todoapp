import firebaseApp from "../../../utils/firebase/firebase";
import { getFirestore, setDoc, doc } from "firebase/firestore";
const firestoreDB = getFirestore(firebaseApp);
//constantes
const USER_DATA = "UsersData";
const TASKS = "Tasks";

const createTaskFirestore = async (newTask, userID) => {
  try {
    const taskID = newTask.id;

    await setDoc(doc(firestoreDB, USER_DATA, userID, TASKS, taskID), newTask);

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

export default createTaskFirestore;
