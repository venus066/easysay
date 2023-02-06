import { createSlice } from '@reduxjs/toolkit';

const wysiwygSlice = createSlice({
  name: 'wysiwyg',
  initialState: {
    mode: 0,
    selectedText: '',
    blockedText: '',
    sentence: '',
    isOpenDialog: false,
  },
  reducers: {
    updateEditorState: {
      reducer: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    },
    rephraseSentence: {
      reducer: (state, action) => {
        state.updateSentence = action.payload;
      },
    },
    changeMode: {
      reducer: (state, action) => {
        state.mode = action.payload;
      },
    },
    showDialog: {
      reducer: (state, action) => {
        state.isOpenDialog = action.payload;
      },
    },
  },
  extraReducers: {
  }
});

export const {
  updateEditorState,
  changeMode,
  showDialog,
  rephraseSentence,
} = wysiwygSlice.actions;

export default wysiwygSlice.reducer;
