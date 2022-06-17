import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primaryModalData: { type: undefined },
  secondaryModalData: {
    type: undefined,
    description: undefined,
    confirmFunction: undefined,
    data: undefined,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setPrimaryModalData: (state, action) => {
      state.primaryModalData = action.payload;
    },
    setSecondaryModalData: (state, action) => {
      state.secondaryModalData = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { setPrimaryModalData, setSecondaryModalData } =
  modalSlice.actions;
