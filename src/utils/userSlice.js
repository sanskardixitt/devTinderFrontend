import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null, // Change null to {}
  reducers: {
    addUser: (state, action) => {
      console.log("action", action);
      return action.payload;
    },
    removeUser: () => {
      return null; // Return an empty object instead of null
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
