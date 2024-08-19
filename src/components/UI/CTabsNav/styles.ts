import { SxProps, Theme } from '@mui/material';

interface CTabsNavStyles {
  chipNav: SxProps;
}

export const cTabsNavStyles = (theme: Theme): CTabsNavStyles => ({
  chipNav: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
});
