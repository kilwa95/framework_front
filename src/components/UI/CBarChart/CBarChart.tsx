import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface BarChartProps {
  xAxisData: string[];
  seriesData: number[][];
  width?: number;
  height?: number;
}

const CBarChart: React.FC<BarChartProps> = ({
  xAxisData,
  seriesData,
  width = 500,
  height = 300,
}) => {
  // Prepare series in the required format
  const series = seriesData.map((data) => ({ data }));

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={series}
      width={width}
      height={height}
    />
  );
};

export default CBarChart;
