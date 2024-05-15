import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileData: {},
};

export const fileExplorerSlice = createSlice({
  name: "fileExplorer",
  initialState,
  reducers: {
    setFileData: (state, action) => {
      state.fileData = action.payload;
    },
  },
});

export const { setFileData } = fileExplorerSlice.actions;
export default fileExplorerSlice.reducer;
