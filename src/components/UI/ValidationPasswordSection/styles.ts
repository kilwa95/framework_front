import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface ValidationPasswordPageStyles {
  itemValidationWrapper: SxProps;
  validationPasswordWrapper: SxProps;
}

export const validationPasswordPageStyles = (
  theme: Theme,
): ValidationPasswordPageStyles => ({
  itemValidationWrapper: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },

  validationPasswordWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
