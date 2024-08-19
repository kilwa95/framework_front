import React, { useEffect, useState } from 'react';
import { notificationMenuStyles } from './styles';
import {
  Badge,
  Box,
  IconButton,
  SxProps,
  Theme,
  Tooltip,
  useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationList from './NotificationList';
import { Notification } from 'src/utils/types/Notification';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import {
  getNotificationAsync,
  markAllNotificationsAsReadAsync,
} from 'src/store/notification/notificationAsync';
import { readAllNotifications } from 'src/store/notification/notificationSlices/getNotificationSlice';
import { useAppSelector } from 'src/hooks';

import { v4 as uuidv4 } from 'uuid';

interface NotificationMenuProps {
  isNavBar?: boolean;
  color?:
    | 'error'
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning';
  sx?: SxProps<Theme>;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({
  isNavBar = false,
  color,
  sx,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const BUTTON_ID = `notification-button-${uuidv4()}`;

  const notificationList = useAppSelector(
    (state) => state.notif.getNotification.data,
  );

  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [listPosition, setListPosition] = useState<number | 'unset'>('unset');

  const handleCloseNotificationsMenu = () => {
    setIsListOpen(false);
    dispatch(readAllNotifications());
    dispatch(markAllNotificationsAsReadAsync());
  };

  const handleOpenNotificationsMenu = () => {
    setIsListOpen(true);
    setListPosition(calculateListPosition());
  };

  const calculateListPosition = () => {
    const button = document.getElementById(BUTTON_ID);

    if (button) {
      const buttonRect = button.getBoundingClientRect();
      const wrapperWidth = 400;

      // Calculate the potential right position of the wrapper
      const rightPosition = buttonRect.left + wrapperWidth;

      // Check if the wrapper would go off the screen
      if (rightPosition > window.innerWidth) {
        return window.innerWidth - wrapperWidth - 12;
      }

      return 'unset';
    }

    return 'unset';
  };

  useEffect(() => {
    dispatch(getNotificationAsync());
  }, []);

  return (
    <Box>
      <Tooltip title="Notifications">
        <IconButton
          id={BUTTON_ID}
          color={color}
          sx={[
            notificationMenuStyles(theme).button(isNavBar),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          onClick={() =>
            isListOpen
              ? handleCloseNotificationsMenu()
              : handleOpenNotificationsMenu()
          }
        >
          <Badge
            badgeContent={
              notificationList.filter(
                (notification: Notification) => notification.unread,
              ).length
            }
            color="info"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      {isListOpen && (
        <NotificationList
          handleClose={handleCloseNotificationsMenu}
          notificationsList={notificationList}
          sx={{
            left: listPosition,
          }}
        />
      )}
    </Box>
  );
};

export default NotificationMenu;
