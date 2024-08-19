import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import CAccordionTitleWrapper from 'src/components/UI/CAccordionTitleWrapper/CAccordionTitleWrapper';
import { LOREM } from '../../loremText';

const CAccordionTitleWrapperCard: React.FC = () => {
  const theme = useTheme();

  return (
    <CInfosTitleWrapper
      title={'CAccordiontitleWrapper'}
      documentation="https://mui.com/material-ui/react-accordion/"
    >
      <Box sx={componentsPagesStyles(theme).componentsListWrapper}>
        <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
          <CAccordionTitleWrapper title={'Lorem Ipsum'}>
            <Typography>{LOREM}</Typography>
          </CAccordionTitleWrapper>
        </Box>
      </Box>
    </CInfosTitleWrapper>
  );
};

export default CAccordionTitleWrapperCard;
