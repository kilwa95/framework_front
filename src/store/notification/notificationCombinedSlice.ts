import { combineReducers } from '@reduxjs/toolkit';
import getNotificationSlice from './notificationSlices/getNotificationSlice';
import markNotificationAsReadSlice from './notificationSlices/markNotificationAsReadSlice';
import markAllNotificationsAsReadSlice from './notificationSlices/markAllNotificationsAsReadSlice';

const notificationReducer = combineReducers({
  getNotification: getNotificationSlice,
  readNotification: markNotificationAsReadSlice,
  readAllNotifications: markAllNotificationsAsReadSlice,
});

export default notificationReducer;
