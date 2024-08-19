import React from 'react';
import { notificationMenuStyles } from './styles';
import {
  Box,
  ClickAwayListener,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { Notification } from 'src/utils/types/Notification';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import Notificationitem from './NotificationItem';

interface NotificationListProps {
  handleClose: () => void;
  notificationsList: Notification[];
  sx?: SxProps<Theme>;
}

const NotificationList: React.FC<NotificationListProps> = ({
  handleClose,
  notificationsList,
  sx,
}) => {
  const theme = useTheme();

  return (
    <ClickAwayListener onClickAway={() => handleClose()}>
      <Box
        sx={[
          notificationMenuStyles(theme).wrapper,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Typography sx={notificationMenuStyles(theme).listTitle}>
          Notifications
        </Typography>
        <Box sx={notificationMenuStyles(theme).listWrapper}>
          {notificationsList.length > 0 &&
            notificationsList.map((notification: Notification) => (
              <Notificationitem
                key={`notification-${notification.id}`}
                notification={notification}
              />
            ))}
          {notificationsList.length === 0 && (
            <Box sx={notificationMenuStyles(theme).noNotificationWrapper}>
              <NotificationsOffIcon
                sx={{ color: theme.palette.text.disabled }}
              />
              <Typography>Aucune notification</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default NotificationList;
