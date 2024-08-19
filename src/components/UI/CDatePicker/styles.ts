import { SxProps, Theme } from '@mui/material';

interface CDatePickerStyles {
  container: SxProps;
  navigateWrapper: SxProps;
  link: SxProps;
  datePicker: SxProps;
}

export const cDatePickerStyles = (theme: Theme): CDatePickerStyles => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },

  navigateWrapper: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },

  link: {
    cursor: 'pointer',
    marginLeft: theme.spacing(1),
  },

  datePicker: {
    width: '100%',
  },
});
