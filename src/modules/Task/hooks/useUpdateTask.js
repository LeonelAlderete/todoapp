import { useState, useEffect } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Action
import { setTaskData } from "../../../store/slices/taskSlice";
import {
  updateAllTask,
  updateFilteredTasks,
} from "../../../store/slices/taskListSlice";
import { setSecondaryModalData } from "../../../store/slices/modalSlice";
//hooks
import useShowStatusMessagge from "../../Global/hooks/useShowStatusMessagge";
//Controller
import updateImportatValueFirestore from "../controllers/updateImportatValueFirestore";
import updateTaskDataFirestore from "../controllers/updateTaskDataFirestore";
import deleteTaskFirestore from "../controllers/deleteTaskFirestore";
//utils
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "moment/locale/es";
//constantes
import {
  LOCAL_STORAGE_TASKLIST_KEY,
  LOCAL_STORAGE_AUTHDATA_VALUE,
  DELETE_TASK,
  UNKNOWN_ERROR,
} from "../../../utils/constants/constants";
moment.locale("es");

export default function useUpdateTask() {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.authData);
  const { data: taskData } = useSelector((state) => state.task);
  const { allTasks, filteredTasks, selectedCategory } = useSelector(
    (state) => state.taskList
  );
  const { showStatusMessage } = useShowStatusMessagge();
  const [finishDate, setFinishDate] = useState(new Date());
  const [showEditForm, setShowEditForm] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    //obtener valores a editar
    const onStart = () => {
      formikUpdateTask.values.title = taskData.title;
      formikUpdateTask.values.category = taskData.category;
      formikUpdateTask.values.description = taskData.description;
    };

    onStart();
  }, [taskData]);

  const formikUpdateTask = useFormik({
    initialValues: {
      title: taskData.title,
      category: taskData.category,
      description: taskData.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("El titulo es obligatorio"),
      category: Yup.string().required("La categoria es obligatoria"),
      description: Yup.string().required("La descripcion es obligatoria"),
    }),
    onSubmit: async (formData) => {
      setDisableButton(true);

      //Verificiar si el usuario es invitado o no
      if (userID === LOCAL_STORAGE_AUTHDATA_VALUE) {
        updateTaskLocalStorage(
          formData.title,
          formData.description,
          formData.category
        );
      } else {
        await updateTaskDataBase(
          formData.title,
          formData.description,
          formData.category
        );
      }

      setDisableButton(false);
    },
  });

  const updateTaskFormValidation = () => {
    setDisableButton(true);

    let titleInput = document.querySelector("#modal-title");
    let descriptionInput = document.querySelector("#modal-description");

    if (
      !formikUpdateTask.errors.title &&
      !formikUpdateTask.errors.category &&
      !formikUpdateTask.errors.description
    ) {
      setDisableButton(false);

      removeClass(titleInput, "border-danger");
      removeClass(descriptionInput, "border-danger");

      formikUpdateTask.handleSubmit();
    } else {
      formikUpdateTask.errors.title
        ? addClass(titleInput, "border-danger")
        : removeClass(titleInput, "border-danger");
      formikUpdateTask.errors.description
        ? addClass(descriptionInput, "border-danger")
        : removeClass(descriptionInput, "border-danger");

      setDisableButton(false);
    }
  };

  const updateTaskLocalStorage = (newTitle, newDescription, newCategory) => {
    //Actualizar lista
    const formatFinishDate = JSON.stringify(finishDate);

    const newTaskList = allTasks.map((item) =>
      item.id === taskData.id
        ? {
            ...item,
            title: newTitle,
            description: newDescription,
            category: newCategory,
            finishDate: formatFinishDate,
          }
        : item
    );

    //Actualizar tarea en el DOM
    let newTaskData = {
      ...taskData,
      title: newTitle,
      description: newDescription,
      category: newCategory,
      finishDate: formatFinishDate,
    };

    dispatch(setTaskData(newTaskData));

    //Actualizar LocalStorage
    localStorage.setItem(
      LOCAL_STORAGE_TASKLIST_KEY,
      JSON.stringify(newTaskList)
    );

    //Actulizar lista de tareas
    dispatch(updateAllTask(newTaskList));

    //Actualizar lista filtrada
    if (newTaskData.category === selectedCategory) {
      // Si la tarea pertenece a la lista seleccionada
      const newFilteredTask = filteredTasks.map((item) =>
        item.id === taskData.id
          ? {
              ...item,
              title: newTitle,
              description: newDescription,
              category: newCategory,
              finishDate: formatFinishDate,
            }
          : item
      );

      dispatch(updateFilteredTasks(newFilteredTask));
    } else {
      // Eliminar la tarea si ya no pertenece a la categoria seleccionada
      const newFilteredTask = filteredTasks.filter(
        (item) => item.id !== taskData.id
      );
      dispatch(updateFilteredTasks(newFilteredTask));
    }

    //Salir del modo de edicion
    setShowEditForm(false);

    //console.log("Tarea actualizada - LocalStorage");
  };

  const updateTaskDataBase = async (newTitle, newDescription, newCategory) => {
    const taskID = taskData.id;
    const formatFinishDate = JSON.stringify(finishDate);

    //Actualizar tarea en DB
    const response = await updateTaskDataFirestore(
      userID,
      taskID,
      newTitle,
      newDescription,
      newCategory,
      formatFinishDate
    );

    if (response.type === "success") {
      //Actualizar tarea en el DOM
      let newTaskData = {
        ...taskData,
        title: newTitle,
        description: newDescription,
        category: newCategory,
        finishDate: formatFinishDate,
      };

      dispatch(setTaskData(newTaskData));

      //Actualizar lista
      const newTaskList = allTasks.map((item) =>
        item.id === taskData.id
          ? {
              ...item,
              title: newTitle,
              description: newDescription,
              category: newCategory,
              finishDate: formatFinishDate,
            }
          : item
      );

      dispatch(updateAllTask(newTaskList));

      //Actualizar lista filtrada
      if (newTaskData.category === selectedCategory) {
        // Si la tarea pertenece a la lista seleccionada
        const newFilteredTask = filteredTasks.map((item) =>
          item.id === taskData.id
            ? {
                ...item,
                title: newTitle,
                description: newDescription,
                category: newCategory,
                finishDate: formatFinishDate,
              }
            : item
        );

        dispatch(updateFilteredTasks(newFilteredTask));
      } else {
        // Eliminar la tarea si ya no pertenece a la categoria seleccionada
        const newFilteredTask = filteredTasks.filter(
          (item) => item.id !== taskData.id
        );
        dispatch(updateFilteredTasks(newFilteredTask));
      }

      //Salir del modo de edicion
      setShowEditForm(false);
    } else {
      const errorContainer = document.querySelector("#errors-container");
      const message = ["Ocurrio un error al actualizar la tarea"];

      showStatusMessage("error", "MessageAlert", {
        errorContainer,
        message,
      });
    }
  };

  const updateImportatValue = (task) => {
    userID === LOCAL_STORAGE_AUTHDATA_VALUE
      ? updateImportantValueLocalStorage(task)
      : updateImportantValueDataBase(task);
  };

  const updateImportantValueLocalStorage = (task) => {
    setDisableButton(true);

    const taskID = taskData.id;
    const important = taskData.important;

    //Actualizar lista en el DOM
    const newTaskList = allTasks.map((item) =>
      item.id === taskID
        ? {
            ...item,
            important: !important,
          }
        : item
    );

    dispatch(updateAllTask(newTaskList));

    //Actualizar en LocalStorage
    localStorage.setItem(
      LOCAL_STORAGE_TASKLIST_KEY,
      JSON.stringify(newTaskList)
    );

    //Actualizar lista filtrada
    const newFilteredTasks = filteredTasks.map((item) =>
      item.id === taskID
        ? {
            ...item,
            important: !important,
          }
        : item
    );
    dispatch(updateFilteredTasks(newFilteredTasks));

    //Actualizar tarea en el Modal
    dispatch(setTaskData({ ...taskData, important: !important }));

    setDisableButton(false);
  };

  const updateImportantValueDataBase = async (task) => {
    setDisableButton(true);

    const taskID = taskData.id;
    const important = taskData.important;

    //Actualizar tarea en DB
    const res = await updateImportatValueFirestore(userID, taskID, !important);

    if (res.type === "success") {
      //Actualizar lista de tareas en el DOM
      const newTaskList = allTasks.map((item) =>
        item.id === taskID ? { ...item, important: !important } : item
      );
      dispatch(updateAllTask(newTaskList));

      //Actualizar lista filtrada en el DOM
      const newFilteredTaskList = filteredTasks.map((item) =>
        item.id === taskID
          ? {
              ...item,
              important: !important,
            }
          : item
      );
      dispatch(updateFilteredTasks(newFilteredTaskList));

      //Actualizar tarea en el Modal
      dispatch(setTaskData({ ...task, important: !important }));
    } else {
      const errorContainer = document.querySelector("#errors-container");
      const message = ["Ocurrio un error al realizar la operacion solicitada"];

      showStatusMessage("error", "MessageAlert", {
        errorContainer,
        message,
      });
    }

    setDisableButton(false);
  };

  const deleteTask = (taskID) => {
    const activateSecondaryModal = document.querySelector(
      "#showSecondaryModal"
    );

    const secondaryModalData = {
      type: DELETE_TASK,
      description: "¿Eliminar tarea? Esta accion no se puede deshacer.",
      confirmFunction: true,
      data: taskID,
    };

    dispatch(setSecondaryModalData(secondaryModalData));

    activateSecondaryModal.click();
  };

  const deleteTaskLocalStorage = (taskID) => {
    setDisableButton(true);

    const newTaskList = allTasks.filter((item) => item.id !== taskID);

    //Actualizar lista en LocalStorage
    localStorage.setItem(
      LOCAL_STORAGE_TASKLIST_KEY,
      JSON.stringify(newTaskList)
    );

    //Actualizar en el DOM
    dispatch(updateAllTask(newTaskList));

    //Actualizar lista filtrada
    const newFilteredTask = filteredTasks.filter((item) => item.id !== taskID);
    dispatch(updateFilteredTasks(newFilteredTask));

    setDisableButton(false);
  };

  const deleteTaskDataBase = async (taskID) => {
    setDisableButton(true);

    const res = await deleteTaskFirestore(userID, taskID);

    if (res.type === "success") {
      //Actualizar DOM
      const newTaskList = allTasks.filter((item) => item.id !== taskID);
      dispatch(updateAllTask(newTaskList));

      //Actualizar lista filtrada
      const newFilteredTaskList = filteredTasks.filter(
        (item) => item.id !== taskID
      );
      dispatch(updateFilteredTasks(newFilteredTaskList));
    } else {
      const activateSecondaryModal = document.querySelector(
        "#showSecondaryModal"
      );

      const secondaryModalData = {
        type: UNKNOWN_ERROR,
        description: "Ocurrio un error al realizar la operacion solicitada",
        confirmFunction: false,
      };

      dispatch(setSecondaryModalData(secondaryModalData));

      activateSecondaryModal.click();
    }

    setDisableButton(false);
  };

  return {
    disableButton,
    showEditForm,
    setShowEditForm,
    finishDate,
    setFinishDate,
    formikUpdateTask,
    updateTaskFormValidation,
    updateImportatValue,
    deleteTask,
    deleteTaskLocalStorage,
    deleteTaskDataBase,
  };
}

const removeClass = (input, className) => {
  input.classList.remove(className);
};

const addClass = (input, className) => {
  input.classList.add(className);
};
