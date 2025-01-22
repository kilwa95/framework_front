import { Box, useTheme, Typography } from '@mui/material';
import React from 'react';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import CBarChart from 'src/components/UI/CBarChart/CBarChart';

const CPieChartArcCard: React.FC = () => {
  const theme = useTheme();

  const xAxisLabels = ['IDF', "Côte d'Azur", 'Alpes Maritimes'];
  const seriesData = [
    { label: 'Abonné', data: [400, 300, 300], color: '#0088FE' },
    { label: 'Non Abonné', data: [200, 500, 100], color: '#00C49F' },
  ];

  return (
    <CInfosTitleWrapper
      title={'CBarChart'}
      documentation="https://mui.com/x/react-charts/bars/"
    >
      <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <CBarChart
            xAxisData={xAxisLabels}
            seriesData={seriesData.map((series) => series.data)} // Passing series data for the chart
            width={500}
            height={300}
          />
        </Box>

        {/* Legend for the Bar Chart */}
        <Box display="flex" justifyContent="flex-start" mt={2}>
          {seriesData.map((series, index) => (
            <Box key={index} display="flex" alignItems="center" mx={2}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: series.color, // Use the color from the series
                  marginRight: 1,
                }}
              />
              <Typography variant="body2">{series.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </CInfosTitleWrapper>
  );
};

export default CPieChartArcCard;
