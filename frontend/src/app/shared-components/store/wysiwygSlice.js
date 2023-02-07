import {createSlice} from '@reduxjs/toolkit';

const wysiwygSlice = createSlice({
  name: 'wysiwyg',
  initialState: {
    mode: 0,
    selectedText: '',
    blockedText: '',
    sentence: '',
    isOpenDialog: false,
    isLoading: false,
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
    changeMode: {
      reducer: (state, action) => {
        return {
          ...state,
          mode: action.payload,
        };
      },
    },
    showDialog: {
      reducer: (state, action) => {
        return {
          ...state,
          isOpenDialog: action.payload,
        };
      },
    },
    showProgress: {
      reducer: (state, action) => {
        return {
          ...state,
          isLoading: action.payload,
        };
      },
    }
  },
  extraReducers: {
  }
});

export const {
  updateEditorState,
  changeMode,
  showDialog,
  showProgress,
} = wysiwygSlice.actions;

export default wysiwygSlice.reducer;
