import { combineReducers } from '@reduxjs/toolkit';
import wysiwyg from './wysiwygSlice';

const reducer = combineReducers({
  wysiwyg,
});

export default reducer;
