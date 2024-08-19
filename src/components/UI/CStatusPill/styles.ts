import { SxProps, Theme } from '@mui/material';

interface CLongtextBoxStyles {
  pill: (
    // eslint-disable-next-line no-unused-vars
    severity:
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'warning'
      | 'success'
      | 'neutral',
  ) => SxProps;
}

export const cStatusPillStyles = (theme: Theme): CLongtextBoxStyles => ({
  pill: (severity) => ({
    alignItems: 'center',
    backgroundColor:
      severity === 'neutral'
        ? theme.palette.mode === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[800]
        : theme.palette[severity].lightest,
    borderRadius: 12,
    color:
      severity === 'neutral'
        ? theme.palette.mode === 'light'
          ? theme.palette.grey[500]
          : theme.palette.grey[300]
        : theme.palette[severity].main,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  }),
});
