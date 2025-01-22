import * as React from 'react';
import { DefaultizedPieValueType } from '@mui/x-charts/models';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { PieArcChartData } from '../types';
import { Box, Divider, Typography } from '@mui/material';

interface PieChartArcProps {
  data: PieArcChartData[];
  width?: number;
  height?: number;
  outerRadius?: number;
}

const CPieArcChart: React.FC<PieChartArcProps> = ({
  data,
  width = 200,
  height = 200,
  outerRadius = 80,
}) => {
  const sizing = {
    margin: { right: 5 },
    width: width,
    height: height,
    legend: { hidden: true },
  };

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;

    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      <PieChart
        series={[
          {
            outerRadius: outerRadius,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 14,
          },
        }}
        {...sizing}
      />
      <Box ml={2} sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        {data.map((item) => (
          <>
            <Typography
              key={item.label}
              variant="body2"
              style={{ color: item.color }}
            >
              {item.label}: {item.value} (
              {((item.value / TOTAL) * 100).toFixed(0)}%)
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            {/* {index < data.length - 1 && (
              
            )} */}
          </>
        ))}
      </Box>
    </>
  );
};

export default CPieArcChart;
