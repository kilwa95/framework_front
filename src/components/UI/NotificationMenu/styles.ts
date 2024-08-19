import { SxProps, Theme } from '@mui/material';

interface NotificationMenuStyles {
  // eslint-disable-next-line no-unused-vars
  button: (isNavbar: boolean) => SxProps;
  wrapper: SxProps;
  listWrapper: SxProps;
  // eslint-disable-next-line no-unused-vars
  notification: (level: 'info' | 'success' | 'warning' | 'error') => SxProps;
  listTitle: SxProps;
  noNotificationWrapper: SxProps;
  notificationNewNotifWrapper: SxProps;
  notificationTitleWrapper: SxProps;
  notificationTitle: SxProps;
  notificationContent: SxProps;
}

export const notificationMenuStyles = (
  theme: Theme,
): NotificationMenuStyles => ({
  button: (isNavbar: boolean) => ({
    color: isNavbar ? 'white' : theme.palette.action.active,
  }),

  wrapper: {
    marginTop: '12px',
    position: 'absolute',
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    width: '400px',
    maxHeight: '520px',
    overflow: 'auto',
  },

  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  notification: (level) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    backgroundColor: theme.palette[level].lightest,
    color: theme.palette[level].main,
    textAlign: 'justify',
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      border: 'unset',
    },
  }),

  listTitle: {
    padding: theme.spacing(1, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  noNotificationWrapper: {
    textAlign: 'center',
    marginLeft: 'unset!important',
    paddingBlock: theme.spacing(1),
  },

  notificationNewNotifWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    alignItems: 'center',
  },

  notificationTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },

  notificationTitle: {
    fontSize: '12px',
    minWidth: 'fit-content',
  },

  notificationContent: {
    textAlign: 'left',
  },
});
