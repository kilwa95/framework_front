import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { decodeToken } from 'src/utils/functions';
import { loginAsync } from '../authAsync';
import { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  token: { access: null, refresh: null },
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginRequest: () => initialState,
    resetLoginStatus: (state) => {
      state.user = null;
      state.status = ReduxStatus.Idle;
      state.error = null;
      state.alert.successMessage = '';
      state.alert.errorMessage = '';
    },
    updateToken: (state, action) => {
      const token: { access: string; refresh: string } = action.payload;

      state.token = token;
      state.user = decodeToken(token.access);
    },
    updateAccessToken: (state, action) => {
      const { access }: { access: string } = action.payload;

      state.token.access = access;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'login successful';
        if (action.payload && action.payload.access) {
          state.user = decodeToken(action.payload.access);
          state.token = action.payload;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'login failed';
      });
  },
});

export const {
  resetLoginRequest,
  resetLoginStatus,
  updateToken,
  updateAccessToken,
} = loginSlice.actions;

export default loginSlice.reducer;
