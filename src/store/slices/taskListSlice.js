import { createSlice } from "@reduxjs/toolkit";
//Constantes
import { ALL_CATEGORIES } from "../../utils/constants/constants";

const initialState = {
  allTasks: undefined,
  filteredTasks: undefined,
  selectedCategory: ALL_CATEGORIES,
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    updateAllTask: (state, action) => {
      state.allTasks = action.payload;
    },
    updateFilteredTasks: (state, action) => {
      state.filteredTasks = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export default taskListSlice.reducer;
export const { updateAllTask, updateFilteredTasks, setSelectedCategory } =
  taskListSlice.actions;
