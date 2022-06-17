import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: undefined,
  userID: undefined,
};

const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setLoggedUserData: (state, action) => {
      state.email = action.payload.email;
      state.userID = action.payload.userID;
    },
  },
});

export default authDataSlice.reducer;
export const { setLoggedUserData } = authDataSlice.actions;
