import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { ApiDataResponse } from 'src/utils/types/redux';
import { Notification } from 'src/utils/types/Notification';
import { markAllNotificationsAsReadAsync } from '../notificationAsync';

const initialState: ApiDataResponse<Notification[]> = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: [],
};

const markAllNotificationsAsReadSlice = createSlice({
  name: 'markAllNotificationsAsRead',
  initialState,
  reducers: {
    resetMarkAllNotificationsAsReadRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        markAllNotificationsAsReadAsync.pending,
        (state: { status: string }) => {
          state.status = ReduxStatus.Loading;
        },
      )
      .addCase(markAllNotificationsAsReadAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'markAllNotificationsAsRead successful';
        state.data = action.payload;
      })
      .addCase(markAllNotificationsAsReadAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'markAllNotificationsAsRead failed';
      });
  },
});

export const { resetMarkAllNotificationsAsReadRequest } =
  markAllNotificationsAsReadSlice.actions;

export default markAllNotificationsAsReadSlice.reducer;
