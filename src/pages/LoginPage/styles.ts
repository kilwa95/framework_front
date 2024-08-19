import { SxProps, Theme } from '@mui/material';

interface LoginPageStyles {
  logoTablet: SxProps;
  appName: SxProps;
  textColor: SxProps;
  versionWrapper: SxProps;
}

export const loginPageStyles = (theme: Theme): LoginPageStyles => ({
  logoTablet: {
    paddingInline: '25%',
    marginBottom: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    '& > svg': {
      width: '100%',
    },
  },

  appName: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(5),
    textAlign: 'center',
  },

  textColor: {
    color: theme.palette.grey[400],
  },

  versionWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'end',
  },
});
