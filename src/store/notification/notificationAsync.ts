import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetNotificationPayload } from './types';
import {
  getNotification,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from './notificationAPI';

export const getNotificationAsync = createAsyncThunk(
  'notification/getNotification',
  async (params?: GetNotificationPayload) => {
    const response = await getNotification(params?.is_unread, params?.verb);

    return response;
  },
);

export const markNotificationAsReadAsync = createAsyncThunk(
  'notification/markNotificationAsRead',
  async (id: number) => {
    const response = await markNotificationAsRead(id);

    return response;
  },
);

export const markAllNotificationsAsReadAsync = createAsyncThunk(
  'notification/markAllNotificationsAsRead',
  async () => {
    const response = await markAllNotificationsAsRead();

    return response;
  },
);
