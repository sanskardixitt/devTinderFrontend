import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // Initialize as an empty array
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removefeed: (state, action) => {
      return state.filter((feed) => feed._id !== action.payload);
    },
  },
});

export const { addFeed, removefeed } = feedSlice.actions;
export default feedSlice.reducer;
