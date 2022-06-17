import firebaseApp from "../../../utils/firebase/firebase";
//Firestore
import {
  getFirestore,
  getDocs,
  collection,
  query,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
//Constantes
const firestoreDB = getFirestore(firebaseApp);
const USER_DATA = "UsersData";
const TASKS = "Tasks";

const getTaskListFirestore = async (userID) => {
  try {
    const collectionRef = query(
      collection(firestoreDB, USER_DATA, userID, TASKS),
      orderBy("createDate", "desc"),
      limit(10)
    );

    const response = await getDocs(collectionRef);

    const tasks = response.docs.map((document) => document.data());

    //Verificar si hay mas documentos para obtener
    let lastDocument;
    let nextDocument;
    if (tasks.length === 10) {
      lastDocument = response.docs[response.docs.length - 1];
      nextDocument = await verifyNextDocumentExists(userID, lastDocument); //nextDocument=true: aun hay documentos
    }

    //console.log("GetTaskListFirestore - success");

    return {
      type: "success",
      data: tasks,
      lastDocument: lastDocument,
      nextDocument: nextDocument,
    };
  } catch (error) {
    console.log(error);
  }
};

const getMoreTasksFirebase = async (userID, lastDocument) => {
  try {
    const collectionRef = query(
      collection(firestoreDB, USER_DATA, userID, TASKS),
      orderBy("createDate", "desc"),
      limit(10),
      startAfter(lastDocument)
    );

    const response = await getDocs(collectionRef);

    const newTasks = response.docs.map((document) => document.data());

    //Verificar si hay mas documentos para obtener
    let newLastDocument = response.docs[response.docs.length - 1];
    let nextDocument = undefined;
    if (newTasks.length === 10) {
      nextDocument = await verifyNextDocumentExists(userID, newLastDocument); //nextDocument=true: aun hay documentos
    }

    return {
      type: "success",
      data: newTasks,
      newLastDocument: newLastDocument,
      nextDocument: nextDocument,
    };
  } catch (error) {
    console.log(error);
  }
};

const verifyNextDocumentExists = async (userID, lastDocument) => {
  try {
    //Verificar si hay mas documentos para obtener
    const collectionRef = query(
      collection(firestoreDB, USER_DATA, userID, TASKS),
      orderBy("createDate", "desc"),
      limit(1),
      startAfter(lastDocument)
    );

    const response = await getDocs(collectionRef);

    const nextDocument = response.docs[response.docs.length - 1];

    return nextDocument; //nextDocument = undefined: no hay mas documentos
  } catch (error) {
    console.log(error);
  }
};

export default getTaskListFirestore;
export { getMoreTasksFirebase };
