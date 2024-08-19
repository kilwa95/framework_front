import { SxProps, Theme } from '@mui/material';

interface ConfirmAccountPageStyles {
  container: SxProps;
}

export const confirmAccountPageStyles = (
  theme: Theme,
): ConfirmAccountPageStyles => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    gap: theme.spacing(8),
    '& > svg': {
      width: '20%',
    },
  },
});
