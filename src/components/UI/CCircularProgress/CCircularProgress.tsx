import { Box, CircularProgress, useTheme } from '@mui/material';
import React from 'react';
import { cCircularProgressStyles } from './styles';
import { SxProps, Theme } from '@mui/material';

interface CCircularProgressProps {
  sx?: SxProps<Theme>;
  isModal?: boolean;
}

const CCircularProgress = ({ isModal = false, sx }: CCircularProgressProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        cCircularProgressStyles(theme).loaderContainer(isModal),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <CircularProgress sx={cCircularProgressStyles(theme).loader} />
    </Box>
  );
};

export default CCircularProgress;
