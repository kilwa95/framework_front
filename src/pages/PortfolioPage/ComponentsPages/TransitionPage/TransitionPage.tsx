import React from 'react';
import { Box, useTheme } from '@mui/material';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import TransitionCard from './TransitionCard';

const TransitionPage: React.FC = () => {
  const theme = useTheme();

  return (
    <CInfosTitleWrapper title="Transition" isBigWrapper>
      <Box sx={componentsPagesStyles(theme).fullWidthWrapper}>
        <TransitionCard />
      </Box>
    </CInfosTitleWrapper>
  );
};

export default TransitionPage;
