// Import Theme type from @mui/material instead of @mui/system
import { SxProps, Theme } from '@mui/material';

interface CRUDPagesStyles {
  gridWrapper: SxProps;
  fullWidthWrapper: SxProps;
  componentsListWrapper: SxProps;
  componentsListWrapperColumn: SxProps;
  componentWrapper: SxProps;
  errorField: SxProps;
}

// Use the correct Theme type from @mui/material
export const componentsPagesStyles = (theme: Theme): CRUDPagesStyles => ({
  gridWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(2),
  },

  fullWidthWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },

  componentsListWrapper: {
    display: 'flex',
    gap: theme.spacing(2),
  },

  componentsListWrapperColumn: {
    display: 'flex',
    gap: theme.spacing(2),
    flexDirection: 'column',
    width: '100%',
  },

  componentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(1),
    textAlign: 'center',
    width: '100%',
  },

  errorField: {
    border: `1px solid ${theme.palette.error.main}`,
  },
});
