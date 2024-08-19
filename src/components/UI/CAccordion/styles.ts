import { SxProps, Theme } from '@mui/material';

interface CMenuButtonStyles {
  titleWrapper: SxProps;
  iconsWrapper: SxProps;
}

export const cAccordionStyles = (theme: Theme): CMenuButtonStyles => ({
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  iconsWrapper: {
    display: 'flex',
    gap: theme.spacing(1),
  },
});
