import { SxProps, Theme } from '@mui/material';

interface CAccordionTitleWrapperStyles {
  // eslint-disable-next-line no-unused-vars
  wrapper: SxProps;
  contentWrapper: SxProps;
}

export const cAccordionTitleWrapperStyles = (
  theme: Theme,
): CAccordionTitleWrapperStyles => ({
  wrapper: {
    borderRadius: '9px',
    marginBlock: `${theme.spacing(2)}!important`,
    '&:before': {
      display: 'none',
    },
  },

  contentWrapper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderTop: '0px',
    borderBottomLeftRadius: '9px',
    borderBottomRightRadius: '9px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
});
