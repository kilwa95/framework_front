import React from 'react';
import { Box, Container, SxProps, Theme, useTheme } from '@mui/material';
import { cLeftSideMenuStyles } from './styles';

interface CLongtextBoxProps {
  children?: React.ReactNode;
  menuList: React.ReactNode;
  sx?: SxProps<Theme>;
}

const CLeftSideMenu: React.FC<CLongtextBoxProps> = ({
  children,
  sx,
  menuList,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        cLeftSideMenuStyles(theme).wrapper,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={cLeftSideMenuStyles(theme).card}>{menuList}</Box>
      <Container sx={cLeftSideMenuStyles(theme).children}>{children}</Container>
    </Box>
  );
};

export default CLeftSideMenu;
