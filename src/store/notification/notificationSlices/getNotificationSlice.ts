import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { ApiDataResponse } from 'src/utils/types/redux';
import { Notification } from 'src/utils/types/Notification';
import { getNotificationAsync } from '../notificationAsync';

const initialState: ApiDataResponse<Notification[]> = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: [],
};

const getNotificationSlice = createSlice({
  name: 'getNotification',
  initialState,
  reducers: {
    resetGetNotificationRequest: () => initialState,
    readAllNotifications: (state) => {
      const newData = state.data.map((notification) => ({
        ...notification,
        unread: false,
      }));

      state.data = newData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getNotificationAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getNotification successful';
        state.data = action.payload;
      })
      .addCase(getNotificationAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getNotification failed';
      });
  },
});

export const { resetGetNotificationRequest, readAllNotifications } =
  getNotificationSlice.actions;

export default getNotificationSlice.reducer;
