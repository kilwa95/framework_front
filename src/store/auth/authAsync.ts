import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData } from 'src/utils/types/authData';
import {
  confirmAccount,
  createAccount,
  forgetPassword,
  getUserInfos,
  getUserListe,
  login,
  resetPassword,
} from './authAPI';
import {
  CreateAccountPayload,
  ForgetPasswordData,
  ResetPasswordPayload,
} from './types';

export const loginAsync = createAsyncThunk(
  'menu/login',
  async (body: AuthData) => {
    const response = await login(body);

    return response;
  },
);

export const getUserInfosAsync = createAsyncThunk(
  'auth/current-user',
  async () => {
    const response = await getUserInfos();

    return response;
  },
);

export const getUsersListAsync = createAsyncThunk('api/user', async () => {
  const response = await getUserListe();

  return response;
});

export const forgetPasswordAsync = createAsyncThunk(
  'auth/forgetPassword',
  async (body: ForgetPasswordData) => {
    const response = await forgetPassword(body);

    return response;
  },
);

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async (body: ResetPasswordPayload) => {
    const response = await resetPassword(body);

    return response;
  },
);

export const createAccountAsync = createAsyncThunk(
  'auth/createAccount',
  async (body: CreateAccountPayload) => {
    const response = await createAccount(body);

    return response;
  },
);

export const confirmAccountAsync = createAsyncThunk(
  'auth/confirmAccount',
  async (id: string) => {
    const response = await confirmAccount(id);

    return response;
  },
);
