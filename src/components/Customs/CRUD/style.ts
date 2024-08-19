import { SxProps, Theme } from '@mui/material';

interface ICRUDPageStyles {
  actionsColumns: SxProps;
}

export const CRUDPageStyles = (theme: Theme): ICRUDPageStyles => ({
  actionsColumns: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    gap: theme.spacing(1),
  },
});
