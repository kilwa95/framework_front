import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { createAccountAsync } from '../authAsync';
import { ApiResponse } from 'src/utils/types/redux';

const initialState: ApiResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const createAccountSlice = createSlice({
  name: 'createAccount',
  initialState,
  reducers: {
    resetCreateAccountRequest: (state) => {
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(createAccountAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'createAccount successful';
      })
      .addCase(createAccountAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'createAccount failed';
      });
  },
});

export const { resetCreateAccountRequest } = createAccountSlice.actions;

export default createAccountSlice.reducer;
