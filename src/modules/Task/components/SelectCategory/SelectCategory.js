import React from "react";
//ui
import {
  AiOutlineStar,
  AiOutlineClockCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
//Redux
import { useSelector } from "react-redux";
//Hooks
import useTaskList from "../../hooks/useTaskList";
//utils
import {
  ALL_CATEGORIES,
  IMPORTANT_CATEGORY,
  PENDING_CATEGORY,
  FINISHED_CATEGORY,
} from "../../../../utils/constants/constants";

export default function SelectCategory() {
  const { selectedCategory } = useSelector((state) => state.taskList);
  const { changeCategoryList } = useTaskList();

  const onClickCategory = (category) => {
    changeCategoryList(category);
  };

  return (
    <div>
      {/* Todas las tareas */}
      <div
        className={
          selectedCategory === ALL_CATEGORIES
            ? "d-flex align-items-center rounded-3 cursor-pointer selected-option-offcanvas"
            : "d-flex align-items-center rounded-3 cursor-pointer"
        }
        onClick={() => onClickCategory(ALL_CATEGORIES)}
      >
        <AiOutlineUnorderedList className="me-2 my-2" size={"2em"} />
        <span className="fs-5">{ALL_CATEGORIES}</span>
      </div>

      {/* Importante */}
      <div
        className={
          selectedCategory === IMPORTANT_CATEGORY
            ? "d-flex align-items-center rounded-3 cursor-pointer selected-option-offcanvas"
            : "d-flex align-items-center rounded-3 cursor-pointer"
        }
        onClick={() => onClickCategory(IMPORTANT_CATEGORY)}
      >
        <AiOutlineStar className="me-2 my-2" size={"2em"} />
        <span className="fs-5">{IMPORTANT_CATEGORY}</span>
      </div>

      {/* Pendientes */}
      <div
        className={
          selectedCategory === PENDING_CATEGORY
            ? "d-flex align-items-center rounded-3 cursor-pointer selected-option-offcanvas"
            : "d-flex align-items-center rounded-3 cursor-pointer"
        }
        onClick={() => onClickCategory(PENDING_CATEGORY)}
      >
        <AiOutlineClockCircle className="me-2 my-2" size={"2em"} />
        <span className="fs-5">{PENDING_CATEGORY}</span>
      </div>

      {/* Finalizadas */}
      <div
        className={
          selectedCategory === FINISHED_CATEGORY
            ? "d-flex align-items-center rounded-3 cursor-pointer selected-option-offcanvas"
            : "d-flex align-items-center rounded-3 cursor-pointer"
        }
        onClick={() => onClickCategory(FINISHED_CATEGORY)}
      >
        <BiCheckDouble className="me-2 my-2" size={"2em"} />
        <span className="fs-5">{FINISHED_CATEGORY}</span>
      </div>
    </div>
  );
}
