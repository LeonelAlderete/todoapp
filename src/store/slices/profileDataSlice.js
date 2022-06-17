import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: undefined,
  taskCounter: undefined,
};

const profileDataSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.username = action.payload.username;
      state.taskCounter = action.payload.taskCounter;
    },
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    incrementTaskCounter: (state) => {
      state.taskCounter += 1;
    },
  },
});

export default profileDataSlice.reducer;
export const { setProfileData, updateUsername, incrementTaskCounter } =
  profileDataSlice.actions;
