import { useState, useEffect } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Action
import {
  updateAllTask,
  updateFilteredTasks,
  setSelectedCategory,
} from "../../../store/slices/taskListSlice";
//controllers
import getTaskListFirestore, {
  getMoreTasksFirebase,
} from "../controllers/getTaskListFirestore";
//constantes
import {
  LOCAL_STORAGE_AUTHDATA_VALUE,
  LOCAL_STORAGE_TASKLIST_KEY,
  ALL_CATEGORIES,
} from "../../../utils/constants/constants";

export default function useTaskList() {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.authData);
  const { allTasks, filteredTasks, selectedCategory } = useSelector(
    (state) => state.taskList
  );
  const [lastDocument, setLastDocument] = useState(undefined); //Utilizado para verificar si existen mas documentos que obtener y obtener tareas desde el ultimo documento obtenido
  const [hiddenMoreTaskButton, setHiddenMoreTaskButton] = useState(true);

  //Obtener tareas almacenadas en DB|LocalStorage
  useEffect(() => {
    const onStart = async () => {
      setHiddenMoreTaskButton(true);

      //Si ingresa como Invitado
      if (userID && userID === LOCAL_STORAGE_AUTHDATA_VALUE && !allTasks) {
        //Buscar lista de tareas en Local Storage
        const localStorageTaskList = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_TASKLIST_KEY)
        );

        //Si hay mas de 10 elementos solo renderiza las ultimas 10 almacenadas y habilita el boton 'mas tareas'
        if (localStorageTaskList && localStorageTaskList.length > 10) {
          let taskContainer = [];

          //Almacena solo las ultimas 10 tareas almecenadas
          for (let i = 0; i < 10; i++) {
            taskContainer = [...taskContainer, localStorageTaskList[i]];
          }

          dispatch(updateAllTask(taskContainer));
          dispatch(updateFilteredTasks(taskContainer));

          setHiddenMoreTaskButton(false);
        } else if (localStorageTaskList) {
          //Si hay 10 o menos elementos guardados
          dispatch(updateAllTask(localStorageTaskList));
          dispatch(updateFilteredTasks(localStorageTaskList));
        } else {
          //Si no hay elementos guardados
          dispatch(updateAllTask([]));
          dispatch(updateFilteredTasks([]));
        }
      }

      //Si hay un usuario logeado
      if (userID && userID !== LOCAL_STORAGE_AUTHDATA_VALUE && !allTasks) {
        //Buscar lista en Firestore
        const res = await getTaskListFirestore(userID);

        setLastDocument(res.lastDocument); //Utilizado para verificar si existen mas documentos que obtener y obtener tareas desde el ultimo documento obtenido

        //res.data=undefined : no hay tareas almacenadas en la db
        if (res.data) {
          dispatch(updateAllTask(res.data));
          dispatch(updateFilteredTasks(res.data));
        } else {
          dispatch(updateAllTask([]));
          dispatch(updateFilteredTasks([]));
        }

        res.nextDocument && setHiddenMoreTaskButton(false); //res.nextDocument=true : hay mas documentos para obtener
      }
    };

    onStart();
  }, [userID]);

  const changeCategoryList = (category) => {
    if (category !== ALL_CATEGORIES && selectedCategory !== category) {
      //Nueva lista a mostrar en el DOM
      const newTaskList = allTasks.filter((item) => item.category === category);

      dispatch(setSelectedCategory(category));

      dispatch(updateFilteredTasks(newTaskList));
    }

    if (category === ALL_CATEGORIES && selectedCategory !== ALL_CATEGORIES) {
      dispatch(setSelectedCategory(category));
    }
  };

  const getMoreTask = () => {
    //Si ingresa como Invitado
    if (userID && userID === LOCAL_STORAGE_AUTHDATA_VALUE) {
      moreTaskLocalStorage();
    }

    //Si hay un usuario logeado
    if (userID && userID !== LOCAL_STORAGE_AUTHDATA_VALUE) {
      moreTaskFirebase();
    }
  };

  const moreTaskLocalStorage = () => {
    const res = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASKLIST_KEY));

    let index = allTasks.length; // Indica el indice del ultimo elemento obtenido
    let newTaskList = allTasks;
    let newFilteredTasks = [];

    //Si existen mas elementos guardados obtiene los primeros 10
    for (let i = 10; i > 0 && res[index]; index++) {
      //Crear arreglo con tareas nuevas
      newTaskList = [...allTasks, res[index]];

      //Crear arreglo con tareas que corresponden a la lista filtrada
      res[index].category === selectedCategory &&
        newFilteredTasks.unshift(res[index]);

      i--;
    }

    // Agregar tareas obtenidas
    dispatch(updateAllTask(newTaskList));
    dispatch(updateFilteredTasks([...filteredTasks, ...newFilteredTasks]));

    //Si no hay mas elementos oculta el boton 'mas tareas'
    !res[index] && setHiddenMoreTaskButton(true);
  };

  const moreTaskFirebase = async () => {
    const res = await getMoreTasksFirebase(userID, lastDocument);

    //Actualizar lista en el DOM
    dispatch(updateAllTask([...allTasks, ...res.data]));

    //Actualizar lista filtrada en el DOM
    const newFilteredTasks = res.data.filter(
      (item) => item.category === selectedCategory && item
    );
    dispatch(updateFilteredTasks([...filteredTasks, ...newFilteredTasks]));

    setLastDocument(res.newLastDocument);

    !res.nextDocument && setHiddenMoreTaskButton(true);
  };

  return {
    hiddenMoreTaskButton,
    allTasks,
    filteredTasks,
    selectedCategory,
    changeCategoryList,
    getMoreTask,
  };
}
