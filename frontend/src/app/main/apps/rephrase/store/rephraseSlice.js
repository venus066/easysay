import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showProgress} from "../../../../shared-components/store/wysiwygSlice";

export const getCandidates = createAsyncThunk(
    'rephraseApp/candidate/getCandidates',
    async (params, {dispatch, getState}) => {
  try {
    dispatch(showProgress(true));
    const response = await axios.post('/api/rephrase/candidate', { params });
    const { data } = await response;

    const str = data.candidates.split('\n');
    const candidates = [];
    for (let i = 0; i < str.length; i ++) {
      const index = str[i].indexOf(' ');
      let candidate = str[i].substr(index).trim();
      candidate = candidate.substr(0, candidate.length - 1);
      candidates.push(candidate);
    }

    return candidates;
  } catch (e) {
    return console.log.error(e.message);
  } finally {
    dispatch(showProgress(false));
  }
});

const rephraseSlice = createSlice({
  name: 'rephraseApp/candidates',
  initialState: {
    candidates: [],
  },
  reducers: {
    rephraseText: (state, action) => ({
      ...state,
      candidates: [],
    }),
  },
  extraReducers: {
    [getCandidates.pending]: (state, action) => ({
      ...state,
      candidates: action.payload,
    }),
    [getCandidates.fulfilled]: (state, action) => ({
      ...state,
      candidates: action.payload,
    }),
  },
});

export const { rephraseText } = rephraseSlice.actions;
export default rephraseSlice.reducer;
