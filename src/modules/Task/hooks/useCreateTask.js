import { useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Actions
import {
  updateAllTask,
  updateFilteredTasks,
} from "../../../store/slices/taskListSlice";
//Actions
import { incrementTaskCounter } from "../../../store/slices/profileDataSlice";
import { setSecondaryModalData } from "../../../store/slices/modalSlice";
//controllers
import createTaskFirestore from "../controllers/createTaskFirestore";
import updateTaskCounterFirebase from "../controllers/updateTaskCounterFirebase";
//utils
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "moment/locale/es";
import { nanoid } from "nanoid";
//constantes
import {
  LOCAL_STORAGE_AUTHDATA_VALUE,
  LOCAL_STORAGE_TASKLIST_KEY,
  LOCAL_STORAGE_PROFILEDATA_KEY,
  UNKNOWN_ERROR,
} from "../../../utils/constants/constants";
moment.locale("es");

export default function useCreateTask() {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.authData);
  const { allTasks, filteredTasks, selectedCategory } = useSelector(
    (state) => state.taskList
  );
  const [category, setCategory] = useState("");
  const [important, setImportant] = useState(false);
  const [finishDate, setFinishDate] = useState(new Date());
  const [disableButton, setDisableButton] = useState(false);

  const formikCreateTaskForm = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("El titulo es obligatorio"),
      description: Yup.string().required("La descripcion es obligatoria"),
    }),
    onSubmit: async (formData) => {
      setDisableButton(true);

      //Verificiar si el usuario es invitado o no
      if (userID === LOCAL_STORAGE_AUTHDATA_VALUE) {
        saveTaskLocalStorage(formData.title, formData.description);
      } else {
        await saveTaskDataBase(formData.title, formData.description);
      }

      setDisableButton(false);
      formikCreateTaskForm.resetForm();
    },
  });

  const createTaskFormValidation = (e) => {
    e.preventDefault();
    setDisableButton(true);

    const titleInput = document.querySelector("#title");
    const categoryInput = document.querySelector("#category");
    const descriptionInput = document.querySelector("#description");

    if (
      !formikCreateTaskForm.errors.title &&
      !formikCreateTaskForm.errors.description
    ) {
      setDisableButton(false);

      setCategory(categoryInput.value); //obtener categoria seleccionada

      removeClass(titleInput, "border-danger");
      removeClass(descriptionInput, "border-danger");

      formikCreateTaskForm.handleSubmit();
    } else {
      setDisableButton(false);

      formikCreateTaskForm.errors.title
        ? addClass(titleInput, "border-danger")
        : removeClass(titleInput, "border-danger");

      formikCreateTaskForm.errors.description
        ? addClass(descriptionInput, "border-danger")
        : removeClass(descriptionInput, "border-danger");
    }
  };

  const saveTaskLocalStorage = (title, description) => {
    const taskID = nanoid();

    const task = {
      id: taskID,
      category: category,
      title: title,
      description: description,
      important: important,
      createDate: JSON.stringify(new Date()),
      finishDate: JSON.stringify(finishDate),
    };

    //Actualizar lista en LocalStorage
    localStorage.setItem(
      LOCAL_STORAGE_TASKLIST_KEY,
      JSON.stringify([task, ...allTasks])
    );

    //Actualizar lista de tareas en el DOM
    dispatch(updateAllTask([task, ...allTasks]));

    //Actualizar lista filtrada en el DOM
    if (selectedCategory === category) {
      dispatch(updateFilteredTasks([task, ...filteredTasks]));
    }

    //Actualizar contador de tareas en LocalStorage
    const localStorageProfileData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_PROFILEDATA_KEY)
    );

    localStorageProfileData.taskCounter += 1;

    localStorage.setItem(
      LOCAL_STORAGE_PROFILEDATA_KEY,
      JSON.stringify(localStorageProfileData)
    );

    //Actualizar contador en el DOM
    dispatch(incrementTaskCounter());
  };

  const saveTaskDataBase = async (title, description) => {
    const taskID = nanoid();

    const task = {
      id: taskID,
      category: category,
      title: title,
      description: description,
      important: important,
      createDate: JSON.stringify(new Date()),
      finishDate: JSON.stringify(finishDate),
    };

    //Guardar en Firebase
    const createResponse = await createTaskFirestore(task, userID);

    //Verificar error
    if (createResponse.type === "success") {
      //Actualizar lista de tareas en el DOM
      dispatch(updateAllTask([task, ...allTasks]));

      //Actualizar lista filtrada en el DOM
      if (selectedCategory === category) {
        dispatch(updateFilteredTasks([task, ...filteredTasks]));
      }

      //Actualizar contador de tareas en DB
      await updateTaskCounterFirebase(userID);

      //Actualizar contador de tareas en el DOM
      dispatch(incrementTaskCounter());
    } else {
      const showSecondaryModal = document.querySelector("#showSecondaryModal");

      const modalData = {
        type: UNKNOWN_ERROR,
        description: "Ocurrio un error al realizar la operacion solicitada",
        confirmFunction: false,
      };

      dispatch(setSecondaryModalData(modalData));

      showSecondaryModal.click();
    }
  };

  return {
    disableButton,
    formikCreateTaskForm,
    createTaskFormValidation,
    category,
    setCategory,
    important,
    setImportant,
    finishDate,
    setFinishDate,
  };
}

const addClass = (input, className) => {
  input.classList.add(className);
};

const removeClass = (input, className) => {
  input.classList.remove(className);
};
