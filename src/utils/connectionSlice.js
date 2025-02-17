import { createSlice } from "@reduxjs/toolkit";

const connnectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => action.payload,
    removeConnection: (state, action) => null,
  },
});

export default connnectionSlice.reducer;
export const { addConnection, removeConnection } = connnectionSlice.actions;
