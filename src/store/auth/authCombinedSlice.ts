import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from './authSlices/loginSlice';
import userInfosSlice from './authSlices/userInfosSlice';
import forgetPasswordSlice from './authSlices/forgetPasswordSlice';
import resetPasswordSlice from './authSlices/resetPasswordSlice';
import createAccountSlice from './authSlices/createAccountSlice';
import confirmAccountSlice from './authSlices/confirmAccountSlice';

const authReducer = combineReducers({
  login: loginSlice,
  userInfos: userInfosSlice,
  forgetPassword: forgetPasswordSlice,
  resetPassword: resetPasswordSlice,
  createAccount: createAccountSlice,
  confirmAccount: confirmAccountSlice,
});

export default authReducer;
