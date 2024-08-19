import { SxProps, Theme } from '@mui/material';

interface CLoadingIconButtonStyles {
  loader: SxProps;
}

export const cLoadingIconButtonStyles = (
  theme: Theme,
): CLoadingIconButtonStyles => ({
  loader: {
    color: theme.palette.primary.main,
    marginInline: '13px',
    marginBlock: '9px',
  },
});
