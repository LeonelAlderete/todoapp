import React from "react";
//ui
import { AiOutlineFileAdd } from "react-icons/ai";
import { BiTagAlt } from "react-icons/bi";
import { MdExpandMore } from "react-icons/md";
//Reducer
import { useDispatch, useSelector } from "react-redux";
//Actions
import { setTaskData } from "../../../../store/slices/taskSlice";
import { setPrimaryModalData } from "../../../../store/slices/modalSlice";
//Hooks
import useTaskList from "../../hooks/useTaskList";
//Componentes
import Loading from "../../../Global/components/Loading";
//Constantes
import {
  VIEW_TASK_DATA,
  ALL_CATEGORIES,
} from "../../../../utils/constants/constants";
const DESKTOP_ICON_SIZE = "1em";

export default function Tasklist() {
  const dispatch = useDispatch();
  const { primaryModalData } = useSelector((state) => state.modal);
  const { type: primaryModalType } = primaryModalData;
  const {
    allTasks,
    filteredTasks,
    selectedCategory,
    getMoreTask,
    hiddenMoreTaskButton,
  } = useTaskList();

  //Ver los datos de una tarea en el modal
  const onClickTask = (task) => {
    const activatePrimaryModal = document.querySelector("#showPrimaryModal");

    primaryModalType !== VIEW_TASK_DATA &&
      dispatch(setPrimaryModalData({ type: VIEW_TASK_DATA }));
    dispatch(setTaskData(task));

    activatePrimaryModal.click();
  };

  return allTasks && filteredTasks ? (
    <>
      <DesktopTaskList
        taskList={
          selectedCategory === ALL_CATEGORIES ? allTasks : filteredTasks
        }
        onClickTask={onClickTask}
        selectedCategory={selectedCategory}
      />

      <Footer
        getMoreTask={getMoreTask}
        hiddenMoreTaskButton={hiddenMoreTaskButton}
      />
    </>
  ) : (
    <Loading />
  );
}

const DesktopTaskList = (props) => {
  const { taskList, onClickTask, selectedCategory } = props;

  return (
    <>
      {/* Lista de tareas */}
      <ul className="mt-3 list-group list-group-flush">
        {taskList.length > 0 ? (
          taskList.map((task) => (
            /* Nueva tarea */
            <li
              className="mt-1 mx-3 px-0 list-group-item border-bottom"
              key={task.id}
              onClick={() => onClickTask(task)}
            >
              {/* Titulo */}
              <div>
                <span>{task.title}</span>
              </div>

              {/* Categoria | Fecha de finalizacion | Importante | Eliminar */}
              <div
                className="row d-flex align-items-center fw-light"
                style={{ fontSize: "14px" }}
              >
                <div className="col">
                  {/* Categoria */}
                  <div className="col d-flex align-items-center">
                    <BiTagAlt className="pe-1" size={DESKTOP_ICON_SIZE} />
                    <span>{task.category}</span>
                  </div>
                </div>

                {/* Fecha de finalizacion | Importante | Eliminar */}
                <div className="col d-flex justify-content-end">
                  {/* Importante */}
                  {/* <div
                    className="d-inline-flex align-items-center me-3 cursor-pointer"
                  >
                    {task.important ? (
                      <AiFillStar size={DESKTOP_ICON_SIZE} />
                    ) : (
                      <AiOutlineStar size={DESKTOP_ICON_SIZE} />
                    )}

                    <span className="d-none d-md-block ms-1">Importante</span>
                  </div> */}

                  {/* Eliminar */}
                  {/* <div
                    className="d-inline-flex align-items-center me-3 cursor-pointer"
                  >
                    <AiOutlineDelete size={DESKTOP_ICON_SIZE} />

                    <span className="d-none d-md-block ms-1">Eliminar</span>
                  </div> */}
                </div>
              </div>
            </li>
          ))
        ) : (
          <EmptyList selectedCategory={selectedCategory} />
        )}
      </ul>
    </>
  );
};

const EmptyList = (props) => {
  const { selectedCategory } = props;

  return (
    <div className="text-center">
      <AiOutlineFileAdd size={"5em"} />
      {selectedCategory === ALL_CATEGORIES ? (
        <div className="mt-1 fs-5">No hay tareas. ¡Crea una!</div>
      ) : (
        <div className="mt-1 fs-5">
          No hay tareas en la categoria "{selectedCategory}"
        </div>
      )}
    </div>
  );
};

const Footer = (props) => {
  const { getMoreTask, hiddenMoreTaskButton } = props;
  return (
    <div
      className="text-center border-top mt-3 color-more-task-button"
      onClick={() => getMoreTask()}
      hidden={hiddenMoreTaskButton}
    >
      <div className="fw-light">Cargar mas</div>
      <MdExpandMore className="" size={"3.5em"} />
    </div>
  );
};
