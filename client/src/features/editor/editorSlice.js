import { createSlice, current } from "@reduxjs/toolkit";

export const initialState = {
  outPanel: false,
  openedFiles: [],
  currentFile: {},
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setOutputPanel: (state, action) => {
      state.outPanel = action.payload;
    },
    setOpenFiles: (state, action) => {
      let filename = action.payload.filename;
      let isFileObjectPresent =
        state.openedFiles &&
        state.openedFiles.find((el) => el?.filename === filename);
      if (!isFileObjectPresent) {
        state.openedFiles = [...state.openedFiles, action.payload];
      }
      state.currentFile = action.payload;
    },
    removeFile: (state, action) => {
      state.openedFiles = state.openedFiles.filter(
        (el) => el.filename !== action.payload
      );
      state.currentFile =
        state.openedFiles.length > 0
          ? state.openedFiles[state.openedFiles.length - 1]
          : {};
    },
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
    },
  },
});

export const { setOutputPanel, setOpenFiles, removeFile, setCurrentFile } =
  editorSlice.actions;
export default editorSlice.reducer;
