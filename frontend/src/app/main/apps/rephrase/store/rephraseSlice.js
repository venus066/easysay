import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showDialog} from "../../../../shared-components/store/wysiwygSlice";

export const getCandidates = createAsyncThunk(
    'rephraseApp/candidate/getCandidates',
    async (params, {dispatch, getState}) => {
  try {
    const response = await axios.post('/api/rephrase/candidate', { params });
    const data = await response.data;

    return { data };
  } catch (e) {
    return console.log.error(e.message);
  }
});

const candidateAdapter = createEntityAdapter({});

// export const { selectAll: selectRephrase } =
//     candidateAdapter.getSelectors((state) => state.rephraseApp.candidates);

const rephraseSlice = createSlice({
  name: 'rephraseApp/candidates',
  initialState: candidateAdapter.getInitialState({
    candidates: [],
  }),
  reducers: {
  },
  extraReducers: {
    [getCandidates.fulfilled]: (state, action) => {
      const { data } = action.payload;
      console.log(data);
      candidateAdapter.setAll(state, data);
    },
  },
});

export default rephraseSlice.reducer;
