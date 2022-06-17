import { configureStore } from "@reduxjs/toolkit";
//Slices
import authDataReducer from "./slices/authDataSlice";
import profileDataSlice from "./slices/profileDataSlice";
import taskListSlice from "./slices/taskListSlice";
import taskSlice from "./slices/taskSlice";
import offcanvasSlice from "./slices/offcanvasSlice";
import modalSlice from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    authData: authDataReducer,
    profileData: profileDataSlice,
    taskList: taskListSlice,
    task: taskSlice,
    offcanvas: offcanvasSlice,
    modal: modalSlice,
  },
});

export default store;
