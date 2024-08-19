import axios from 'axios';
import { BACK_URL } from 'src/config';
import { store } from '../store';
import { Notification } from 'src/utils/types/Notification';

export const getNotification = async (
  is_unread?: boolean,
  verb?: string,
): Promise<Notification[]> => {
  const { token } = store.getState().auth.login;
  const queryParams = new URLSearchParams();

  if (is_unread) {
    queryParams.append('is_unread', is_unread.toString());
  }
  if (verb) {
    queryParams.append('last_name', verb);
  }

  let url = `${BACK_URL}/notification/notifications`;

  if (queryParams.toString()) {
    url += `/?${queryParams.toString()}`;
  }

  const response = await axios.get<Notification[]>(url, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });

  return response.data;
};

export const markNotificationAsRead = async (
  id: number,
): Promise<Notification> => {
  const { token } = store.getState().auth.login;

  const url = `${BACK_URL}/notification/notification_as_read/${id}/`;

  const response = await axios.put<Notification>(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    },
  );

  return response.data;
};

export const markAllNotificationsAsRead = async (): Promise<Notification[]> => {
  const { token } = store.getState().auth.login;

  const url = `${BACK_URL}/notification/notifications_as_read/`;

  const response = await axios.put<Notification[]>(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    },
  );

  return response.data;
};
