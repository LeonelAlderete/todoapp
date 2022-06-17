import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: undefined,
  offcanvasPosition: undefined,
  title: undefined,
};

const offcanvasSlice = createSlice({
  name: "offcanvas",
  initialState,
  reducers: {
    setDataCanvas: (state, action) => {
      state.type = action.payload.type;
      state.offcanvasPosition = action.payload.offcanvasPosition;
      state.title = action.payload.title;
    },
  },
});

export default offcanvasSlice.reducer;
export const { setDataCanvas } = offcanvasSlice.actions;
