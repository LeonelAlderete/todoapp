import firebaseApp from "../../../utils/firebase/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const firestoreDB = getFirestore(firebaseApp);
const USER_DATA = "UsersData";
const TASKS = "Tasks";

const updateTaskDataFirestore = async (
  userID,
  taskID,
  newTitle,
  newDescription,
  newCategory,
  finishDate
) => {
  try {
    const docRef = doc(firestoreDB, USER_DATA, userID, TASKS, taskID);

    await updateDoc(docRef, {
      title: newTitle,
      description: newDescription,
      category: newCategory,
      finishDate: finishDate,
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

export default updateTaskDataFirestore;
