import React from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import { cSelectMenuStyles } from './styles';

type CSelectWindowProps = {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

const CSelectWindow: React.FC<CSelectWindowProps> = ({ children, sx }) => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        cSelectMenuStyles(theme).menuWrapper,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default CSelectWindow;
