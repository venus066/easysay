import {combineReducers} from '@reduxjs/toolkit';
import rephrase from './rephraseSlice';
import sidebars from './sidebarsSlice';


const reducer = combineReducers({
  sidebars,
  rephrase,
});

export default reducer;
