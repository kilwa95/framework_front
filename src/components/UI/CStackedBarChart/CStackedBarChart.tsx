import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { SxProps } from '@mui/material';

interface CStackedBarChartProps {
  seriesData: { data: number[]; label: string; id: string; stack: string }[];
  xLabels: string[];
  width?: number;
  height?: number;
  sx?: SxProps;
  layout?: 'horizontal' | 'vertical';
}

const CStackedBarChart: React.FC<CStackedBarChartProps> = ({
  seriesData,
  xLabels,
  sx,
  layout,
  width = 800,
  height = 600,
}) => (
  <BarChart
    width={width}
    height={height}
    series={seriesData}
    layout={layout}
    sx={sx}
    xAxis={[{ data: xLabels, scaleType: 'band' }]}
  />
);

export default CStackedBarChart;
