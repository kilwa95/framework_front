import { Box, useTheme } from '@mui/material';
import React from 'react';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';

import CrudPage from 'src/components/Customs/CRUD/CrudPage';

const CRUDCard: React.FC = () => {
  const theme = useTheme();

  return (
    <CInfosTitleWrapper
      title={'CRUD'}
      documentation="https://mui.com/material-ui/react-table/"
    >
      <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <CrudPage model="user" />
        </Box>
      </Box>
    </CInfosTitleWrapper>
  );
};

export default CRUDCard;
