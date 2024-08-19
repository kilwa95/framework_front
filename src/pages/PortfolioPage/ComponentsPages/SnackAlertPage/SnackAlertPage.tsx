import React from 'react';
import { Box, useTheme } from '@mui/material';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import SnackAlertCard from './SnackAlertCard';

const SnackAlertPage: React.FC = () => {
  const theme = useTheme();

  return (
    <CInfosTitleWrapper title="SnackAlert" isBigWrapper>
      <Box sx={componentsPagesStyles(theme).fullWidthWrapper}>
        <SnackAlertCard />
      </Box>
    </CInfosTitleWrapper>
  );
};

export default SnackAlertPage;
