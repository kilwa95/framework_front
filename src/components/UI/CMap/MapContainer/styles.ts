
import { Theme } from '@mui/material';

export const styles = (theme: Theme) => ({
  mapContainer: {
    height: '700px',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    position: 'relative' as const,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
