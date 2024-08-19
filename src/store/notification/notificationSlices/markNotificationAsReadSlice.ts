import { createSlice } from '@reduxjs/toolkit';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { ApiDataResponse } from 'src/utils/types/redux';
import { Notification } from 'src/utils/types/Notification';
import { markNotificationAsReadAsync } from '../notificationAsync';

const initialState: ApiDataResponse<Notification> = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: {
    id: 0,
    actor_content_type: 0,
    actor_object_id: '',
    verb: '',
    description: '',
    target_content_type: 0,
    target_object_id: '',
    timestamp: '',
    unread: false,
  },
};

const markNotificationAsReadSlice = createSlice({
  name: 'markNotificationAsRead',
  initialState,
  reducers: {
    resetMarkNotificationAsReadRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        markNotificationAsReadAsync.pending,
        (state: { status: string }) => {
          state.status = ReduxStatus.Loading;
        },
      )
      .addCase(markNotificationAsReadAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'markNotificationAsRead successful';
        state.data = action.payload;
      })
      .addCase(markNotificationAsReadAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'markNotificationAsRead failed';
      });
  },
});

export const { resetMarkNotificationAsReadRequest } =
  markNotificationAsReadSlice.actions;

export default markNotificationAsReadSlice.reducer;
