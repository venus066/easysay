import {createSlice} from '@reduxjs/toolkit';
import history from '@history';
import {showMessage} from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import {createUserSettingsFirebase, setUserData} from './userSlice';

export const submitRegister =
  ({ displayName, password, email }) => {
    return async (dispatch) => {
      return jwtService
          .createUser({
            displayName,
            password,
            email,
          })
          .then((user) => {
            if (user === undefined) {
              history.push({
                pathname: '/login',
              });
              return dispatch(showMessage({ message: 'User already registered' }))
            } else {
              dispatch(setUserData(user));
              return dispatch(registerSuccess());
            }
          })
          .catch((errors) => {
            console.log('create user catch');
            return dispatch(registerError(errors));
          });
    };
  };


const initialState = {
  success: false,
  errors: [],
};

const registerSlice = createSlice({
  name: 'auth/register',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = [action.payload];
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
