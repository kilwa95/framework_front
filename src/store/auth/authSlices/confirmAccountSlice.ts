import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { confirmAccountAsync } from '../authAsync';
import { ApiDataResponse } from 'src/utils/types/redux';
import { AuthToken } from 'src/utils/types/authData';

const initialState: ApiDataResponse<AuthToken | null> = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: null,
};

const confirmAccountSlice = createSlice({
  name: 'confirmAccount',
  initialState,
  reducers: {
    resetConfirmAccountRequest: (state) => {
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmAccountAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(confirmAccountAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.data = action.payload.data;
        state.alert.successMessage = 'confirmAccount successful';
      })
      .addCase(confirmAccountAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'confirmAccount failed';
      });
  },
});

export const { resetConfirmAccountRequest } = confirmAccountSlice.actions;

export default confirmAccountSlice.reducer;
