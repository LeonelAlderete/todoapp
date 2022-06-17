import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    title: "",
    category: "",
    description: "",
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default taskSlice.reducer;
export const { setTaskData } = taskSlice.actions;
