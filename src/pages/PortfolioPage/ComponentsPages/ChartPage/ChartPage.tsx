import React from 'react';
import { Box, useTheme } from '@mui/material';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import CPieChartCard from './CPieChartCard';
import CLineChartCard from './CLineChartCard';
import CPieChartArcCard from './CPieChartArcCard';
import CBarChartCard from './CBarChartCard';
import CArcGaugeCard from 'src/components/UI/CArcGauge/CArcGaugeCard';

const ChartPage: React.FC = () => {
  const theme = useTheme();

  return (
    <CInfosTitleWrapper title="Chart" isBigWrapper>
      <Box sx={componentsPagesStyles(theme).gridWrapper}>
        <CPieChartCard />
        <CLineChartCard />
        <CPieChartArcCard />
        <CBarChartCard />
        <CArcGaugeCard />
      </Box>
    </CInfosTitleWrapper>
  );
};

export default ChartPage;
