import { SxProps } from '@mui/system';

interface DetailsBoxStyles {
  detailsValue: SxProps;
}

export const detailsItemStyles = (): DetailsBoxStyles => ({
  detailsValue: {
    fontWeight: 300,
  },
});
