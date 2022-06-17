import React, { useState } from "react";
//ui
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineCancelPresentation } from "react-icons/md";
//Redux
import { useSelector } from "react-redux";
//Hooks
import useCreateTask from "../../hooks/useCreateTask";
//Utilis
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import datePickerSpanish from "date-fns/locale/es";
//Constantes
import { CATEGORY_LIST } from "../../../../utils/constants/constants";
const ICON_SIZE = "1.5em";
registerLocale("es", datePickerSpanish);

export default function CreateTask() {
  const { allTasks } = useSelector((state) => state.taskList);
  const {
    disableButton,
    formikCreateTaskForm,
    createTaskFormValidation,
    important,
    setImportant,
    finishDate,
    setFinishDate,
  } = useCreateTask();
  const [showForm, setShowForm] = useState(false);

  const onSubmitForm = (e) => {
    allTasks && createTaskFormValidation(e);
  };

  return (
    <>
      {/* Accordion nueva tarea: Mostrar | Ocultar formulario */}
      <div
        className="mt-2 mx-2 p-2 d-flex align-items-center border bg-light fs-5 cursor-text"
        data-bs-toggle="collapse"
        data-bs-target="#collapseCreateTask"
        aria-expanded="false"
        aria-controls="collapseCreateTask"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? (
          <MdOutlineCancelPresentation className="ms-1 me-2" />
        ) : (
          <IoCreateOutline className="ms-1 me-2" />
        )}
        <span>{showForm ? "Cancelar" : "Crear una tarea"}</span>
      </div>

      {/* Formulario nueva tarea */}
      <div
        className="collapse mt-1 mx-2 px-3 py-2 border bg-light"
        id="collapseCreateTask"
      >
        {/* Formulario */}
        <Form
          disableButton={disableButton}
          formikCreateTaskForm={formikCreateTaskForm}
          onSubmitForm={onSubmitForm}
        />

        {/* Opciones de tarea */}
        <TaskOptions
          finishDate={finishDate}
          setFinishDate={setFinishDate}
          important={important}
          setImportant={setImportant}
        />
      </div>
    </>
  );
}

const Form = (props) => {
  const { disableButton, formikCreateTaskForm, onSubmitForm } = props;

  return (
    <form className="mb-2" onSubmit={(e) => onSubmitForm(e)}>
      {/* Input Titulo */}
      <div className="mb-2 w-50">
        <div className="form-text">Titulo</div>
        <input
          type="text"
          className="form-control"
          id="title"
          //formik
          name="title"
          value={formikCreateTaskForm.values.title}
          onChange={formikCreateTaskForm.handleChange}
        />
      </div>

      {/* Seleccionar Categoria */}
      <select
        className="form-select w-50"
        id="category" //Obtener valor mediante ID (createTaskFormValidation)
        aria-label="Default select example"
      >
        {CATEGORY_LIST.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>

      {/* Input Descripcion | Boton agregar tarea */}
      <div className="row mt-2">
        {/* Descripcion */}
        <div className="form-text">Descripcion</div>
        <span className="col-9">
          <textarea
            className="form-control"
            rows="2"
            id="description"
            //formik
            name="description"
            value={formikCreateTaskForm.values.description}
            onChange={formikCreateTaskForm.handleChange}
          ></textarea>
        </span>

        {/* Boton agregar tarea */}
        <span className="col-3 d-grid gap-2 px-0">
          <button
            className="btn btn-outline-success"
            type="submit"
            disabled={disableButton}
          >
            Agregar
          </button>
        </span>
      </div>
    </form>
  );
};

const TaskOptions = (props) => {
  const { finishDate, setFinishDate, important, setImportant } = props;

  return (
    <div style={{ fontSize: "12px" }}>
      {/* Fecha de finalizacion */}
      <span className="py-1 px-1 border bg-white cursor-pointer d-inline-flex align-items-center">
        <BsCalendar2Date className="me-2" size={ICON_SIZE} />

        <DatePicker
          selected={finishDate}
          onChange={(date) => setFinishDate(date)}
          locale={datePickerSpanish}
          dateFormat="dd 'de' MMMM 'de' yyyy"
        />
      </span>

      {/* Importante */}
      <span
        className="mx-2 py-1 px-1 border bg-white cursor-pointer d-inline-flex align-items-center"
        onClick={() => setImportant(!important)}
      >
        {important ? (
          <AiFillStar size={ICON_SIZE} />
        ) : (
          <AiOutlineStar size={ICON_SIZE} />
        )}

        <span className="px-1">Importante</span>
      </span>
    </div>
  );
};
