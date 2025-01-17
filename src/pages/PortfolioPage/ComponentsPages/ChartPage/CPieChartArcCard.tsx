import { Box, useTheme } from '@mui/material';
import React from 'react';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import { PieArcChartData } from 'src/components/UI/types';
import CPieArcChart from 'src/components/UI/CPieChart/CPieArcChart';

const CPieChartArcCard: React.FC = () => {
  const theme = useTheme();

  const pieArcChartData: PieArcChartData[] = [
    { label: 'Paris', value: 400, color: '#0088FE' },
    { label: 'Lyon', value: 300, color: '#00C49F' },
    { label: 'Nantes', value: 300, color: '#FFBB28' },
    { label: 'Toulouse', value: 200, color: '#FF8042' },
  ];

  return (
    <CInfosTitleWrapper
      title={'CPieArcChart'}
      documentation="https://mui.com/x/react-charts/pie-demo/"
    >
      <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <CPieArcChart
            data={pieArcChartData}
            width={300}
            height={300}
            outerRadius={90}
          />
        </Box>
      </Box>
    </CInfosTitleWrapper>
  );
};

export default CPieChartArcCard;
