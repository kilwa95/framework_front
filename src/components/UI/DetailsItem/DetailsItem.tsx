import { Box, Typography } from '@mui/material';
import { detailsItemStyles } from './styles';

const DetailsItem = ({
  title,
  data,
}: {
  title: string;
  data: string | number;
}): JSX.Element => (
  <Typography>
    {title}
    <Box component="span" sx={detailsItemStyles().detailsValue}>
      {data}
    </Box>
  </Typography>
);

export default DetailsItem;
