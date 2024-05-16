import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  outPanel: false,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setOutputPanel: (state, action) => {
      state.outPanel = action.payload;
    },
  },
});

export const { setOutputPanel } = editorSlice.actions;
export default editorSlice.reducer;
