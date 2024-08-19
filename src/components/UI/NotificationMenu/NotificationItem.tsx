import React from 'react';
import { notificationMenuStyles } from './styles';
import { Box, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { Notification } from 'src/utils/types/Notification';
import dayjs from 'dayjs';
import CircleIcon from '@mui/icons-material/Circle';

interface NotificationitemProps {
  key: string;
  notification: Notification;
  sx?: SxProps<Theme>;
}

const Notificationitem: React.FC<NotificationitemProps> = ({
  key,
  notification,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        notificationMenuStyles(theme).notification('info'),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      key={key}
    >
      <Box sx={notificationMenuStyles(theme).notificationNewNotifWrapper}>
        <Box sx={notificationMenuStyles(theme).notificationTitleWrapper}>
          <Typography
            variant="body2"
            sx={notificationMenuStyles(theme).notificationTitle}
          >
            {dayjs(notification.timestamp).format('DD/MM/YYYY HH:mm')}
          </Typography>
          <Typography sx={notificationMenuStyles(theme).notificationContent}>
            {notification.verb}
          </Typography>
        </Box>
        <Box sx={{ width: '12px' }}>
          {notification.unread && (
            <CircleIcon color="primary" sx={{ fontSize: '12px' }} />
          )}
        </Box>
      </Box>

      <Typography variant="body2">{notification.description}</Typography>
    </Box>
  );
};

export default Notificationitem;
