import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: { connections: [] }, //
  reducers: {
    addConnection: (state, action) => {
      state.connections = action.payload;
    },
    removeConnection: (state) => {
      state.connections = [];
    },
  },
});

export default connectionSlice.reducer;
export const { addConnection, removeConnection } = connectionSlice.actions;
