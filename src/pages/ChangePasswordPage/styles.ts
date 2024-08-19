import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

interface ChangePasswordPageStyles {
  wrapper: SxProps;
}

export const resetPasswordPageStyles = (
  theme: Theme,
): ChangePasswordPageStyles => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5vh',
    margin: 'auto',
    width: '500px',
    alignItems: 'center',
    paddingTop: '10vh',
    [theme.breakpoints.down('sm')]: {
      width: 'fit-content',
      paddingInline: '1rem',
    },
    '& > svg': {
      width: '200px',
      [theme.breakpoints.down('sm')]: {
        width: '150px',
      },
    },
  },
});
