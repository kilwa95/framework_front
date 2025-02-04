import React from 'react';
import CStackedBarChartCard from './CStackedBarChartCard';
import { Box } from '@mui/material';
import CTinyBarChartCard from './CTinyBarChartCard';

const ChartPage = () => (
  <Box sx={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
    <CStackedBarChartCard />
    <CTinyBarChartCard />
  </Box>
);

export default ChartPage;
