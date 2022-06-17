import React, { useEffect } from "react";
//ui
import { AiOutlineStar, AiFillStar, AiOutlineDelete } from "react-icons/ai";
import { BsCalendar2Date, BsCardImage } from "react-icons/bs";
//Redux
import { useSelector } from "react-redux";
//hooks
import useUpdateTask from "../../hooks/useUpdateTask";
import useTaskUtils from "../../hooks/useTaskUtils";
//Utils
import DatePicker, { registerLocale } from "react-datepicker";
import datePickerSpanish from "date-fns/locale/es";
//Constantes
import Loading from "../../../Global/components/Loading";
//Constantes
import { CATEGORY_LIST } from "../../../../utils/constants/constants";
registerLocale("es", datePickerSpanish);
const ICON_HEADER_SIZE = "2em";
const ICON_BODY_SIZE = "1.2em";
//const ICON_IMAGE_SIZE = "5em";

export default function TaskData() {
  const { data } = useSelector((state) => state.task);
  const {
    disableButton,
    showEditForm,
    setShowEditForm,
    finishDate,
    setFinishDate,
    formikUpdateTask,
    updateTaskFormValidation,
    updateImportatValue,
    deleteTask,
  } = useUpdateTask();

  useEffect(() => {
    //Si restaura el modal en caso de cerrar el modal en modo edicion
    const onStart = () => {
      setShowEditForm(false);
    };

    onStart();
  }, [data.id]);

  return data ? (
    <>
      {showEditForm ? (
        /* Editar datos de tarea */
        <EditTaskData
          disableButton={disableButton}
          taskData={data}
          finishDate={finishDate}
          setFinishDate={setFinishDate}
          formikUpdateTask={formikUpdateTask}
        />
      ) : (
        /* Visualizar datos de tarea */
        <ViewTaskData
          taskData={data}
          updateImportatValue={updateImportatValue}
          deleteTask={deleteTask}
        />
      )}

      {/* Footer */}
      <Footer
        disableButton={disableButton}
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
        updateTaskFormValidation={updateTaskFormValidation}
      />
    </>
  ) : (
    <Loading />
  );
}

const ViewTaskData = (props) => {
  const { disableButton, taskData, updateImportatValue, deleteTask } = props;
  const { formatDate } = useTaskUtils();

  const onClickDeleteButton = async (taskID) => {
    deleteTask(taskID);
  };

  const onClickImportantButton = (taskData) => {
    updateImportatValue(taskData);
  };

  return (
    <div className="px-2">
      {/* Titulo | Importante | Eliminar */}
      <div className="row d-flex align-items-center">
        <div className="col-8">
          {/* Titulo */}
          <span className="fs-3">{taskData.title}</span>

          {/* Lista */}
          <div className="fw-light">{taskData.category}</div>
        </div>

        <div className="col d-flex justify-content-end">
          {/* Boton Importante */}
          {taskData.important ? (
            <AiFillStar
              className="me-3 cursor-pointer"
              type="button"
              size={ICON_HEADER_SIZE}
              onClick={() => onClickImportantButton(taskData)}
              disabled={disableButton}
            />
          ) : (
            <AiOutlineStar
              className="me-3 cursor-pointer"
              type="button"
              size={ICON_HEADER_SIZE}
              onClick={() => onClickImportantButton(taskData)}
              disabled={disableButton}
            />
          )}

          {/* Boton Eliminar */}
          <AiOutlineDelete
            className="cursor-pointer"
            size={ICON_HEADER_SIZE}
            onClick={() => onClickDeleteButton(taskData.id)}
            disabled={disableButton}
          />
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 px-3 py-2 border bg-white rounded">
        {/* Fecha de creacion */}
        <div className="d-flex align-items-center">
          <BsCalendar2Date className="me-2" size={ICON_BODY_SIZE} />
          <span style={{ fontSize: "13px" }}>Creacion:</span>
          <span className="fw-light ms-2" style={{ fontSize: "13px" }}>
            {formatDate(taskData.createDate)}
          </span>
        </div>

        <hr />

        {/* Fecha de finalizacion */}
        <div className="d-flex align-items-center">
          <BsCalendar2Date className="me-2" size={ICON_BODY_SIZE} />
          <span style={{ fontSize: "13px" }}>Finalizacion:</span>
          <span className="fw-light ms-2" style={{ fontSize: "13px" }}>
            {formatDate(taskData.finishDate)}
          </span>
        </div>

        <hr />

        {/* Descripcion */}
        <div>
          <div className="mb-2 fw-light">Descripcion:</div>
          <div
            className="overflow-auto"
            style={{ height: "150px", maxHeight: "150px" }}
          >
            {taskData.description}
          </div>
        </div>
      </div>

      {/* Agregar imagen */}
      {/* <div
        className="mt-3 px-3 py-2 bg-white rounded text-center"
        style={{ borderStyle: "dashed", borderWidth: "0.1em" }}
      >
        <div>
          <BsCardImage size={ICON_IMAGE_SIZE} />
        </div>
        <span>Agregar una imagen</span>
      </div> */}
    </div>
  );
};

const EditTaskData = (props) => {
  const { taskData, formikUpdateTask, finishDate, setFinishDate } = props;
  const { formatDate } = useTaskUtils();

  //Convertir en formato legible para "DatePicker"
  useEffect(() => {
    const onStart = () => {
      const dateParse = JSON.parse(taskData.finishDate);
      setFinishDate(new Date(dateParse));
    };

    onStart();
  }, [taskData.finishDate]);

  return (
    <div className="px-2">
      {/* Header */}
      <div className="row d-flex align-items-center">
        {/* Titulo | Categoria*/}
        <div className="col-8">
          <input
            className="form-control border mb-1"
            id="modal-title"
            //formik
            name="title"
            value={formikUpdateTask.values.title}
            onChange={formikUpdateTask.handleChange}
          />

          {/* Lista */}
          <div>
            {/* Seleccionar Categoria */}
            <select
              className="form-select w-100"
              id="modal-category"
              aria-label="Default select example"
              //formik
              defaultValue={formikUpdateTask.values.category}
              onChange={(e) =>
                (formikUpdateTask.values.category = e.target.value)
              } // Obtener categoria seleccionada
            >
              {CATEGORY_LIST.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 px-3 py-2 border bg-white rounded">
        {/* Fecha de creacion */}
        <div className="d-flex align-items-center">
          <BsCalendar2Date className="me-2" size={ICON_BODY_SIZE} />
          <span style={{ fontSize: "13px" }}>Creacion:</span>
          <span className="fw-light ms-2" style={{ fontSize: "13px" }}>
            {formatDate(taskData.createDate)}
          </span>
        </div>

        <hr />

        {/* Fecha de finalizacion */}
        <div>
          <div className="d-flex align-items-center">
            <BsCalendar2Date className="me-2" size={ICON_BODY_SIZE} />
            <span style={{ fontSize: "13px" }}>Finalizacion:</span>
          </div>

          {/* Seleccionar fecha */}
          <div
            className="mt-1"
            style={{ marginLeft: "28px", fontSize: "13px" }}
          >
            <DatePicker
              selected={finishDate}
              onChange={(date) => setFinishDate(date)}
              locale={datePickerSpanish}
              dateFormat="dd 'de' MMMM 'de' yyyy"
            />
          </div>
        </div>

        <hr />

        {/* Descripcion */}
        <div>
          <div className="mb-2 fw-light">Descripcion:</div>
          <textarea
            className="form-control border"
            rows="4"
            id="modal-description"
            //formik
            name="description"
            value={formikUpdateTask.values.description}
            onChange={formikUpdateTask.handleChange}
          ></textarea>
        </div>
      </div>

      {/* Agregar imagen */}
      {/* <div
        className="mt-3 px-3 py-2 bg-white rounded text-center"
        style={{ borderStyle: "dashed", borderWidth: "0.1em" }}
      >
        <div>
          <BsCardImage size={ICON_IMAGE_SIZE} />
        </div>
        <span>Agregar una imagen</span>
      </div> */}
    </div>
  );
};

const Footer = (props) => {
  const {
    disableButton,
    updateTaskFormValidation,
    showEditForm,
    setShowEditForm,
  } = props;

  const saveChangesButton = () => {
    updateTaskFormValidation();
  };

  const onClickCancelButton = () => {
    setShowEditForm(false);
  };

  return (
    <>
      {/* Error container */}
      <div
        className="invisible mt-2 mx-5 py-2 border border-3 rounded text-center"
        id="errors-container"
      ></div>

      {/* Botones: Cancelar | Aceptar */}
      <div className="modal-footer mt-3">
        <div className="row w-100 m-0">
          {/* Boton Cerrar | Cancelar */}
          <div className="col d-grid gap-2 ps-1">
            {showEditForm ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onClickCancelButton()}
              >
                Cancelar
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                type="button"
                //Cerrar modal
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            )}
          </div>

          {/* Boton Editar | Guardar */}
          <div className="col d-grid gap-2 pe-1">
            <button
              type="button"
              className={showEditForm ? "btn btn-success" : "btn btn-warning"}
              onClick={() =>
                showEditForm ? saveChangesButton() : setShowEditForm(true)
              }
              disabled={disableButton}
            >
              {showEditForm ? "Guardar" : "Editar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
