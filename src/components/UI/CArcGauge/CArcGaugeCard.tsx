import React from 'react';
import CArcGauge from './CArcGauge';
import { Box, useTheme } from '@mui/material';
import CInfosTitleWrapper from '../CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from 'src/pages/PortfolioPage/ComponentsPages/styles';

const CArcGaugeCard: React.FC = () => {
  const theme = useTheme(); // Properly placed inside the component

  return (
    <div>
      <CInfosTitleWrapper
        title={'CArcGauge'}
        documentation="https://mui.com/x/react-charts/gauge/"
      >
        <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <CArcGauge value={80} color={theme.palette.success.main} />
          </Box>
        </Box>
      </CInfosTitleWrapper>
    </div>
  );
};

export default CArcGaugeCard;
