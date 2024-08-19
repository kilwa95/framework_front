import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { forgetPasswordAsync } from '../authAsync';
import { ApiResponse } from 'src/utils/types/redux';

const initialState: ApiResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState,
  reducers: {
    resetForgetPasswordRequest: (state) => {
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPasswordAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(forgetPasswordAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'forgetPassword successful';
      })
      .addCase(forgetPasswordAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'forgetPassword failed';
      });
  },
});

export const { resetForgetPasswordRequest } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
