import React from 'react';

import CModal from 'src/components/UI/CModal/CModal';
import { Grid } from '@mui/material';
import { BTN_SUBMIT } from '../Configs/consts';
import CRender from './CRender';

interface CModalProps {
  dataProps: any;
  isOpen: boolean;
  onClose: () => void;
  error?: string;
  errorMessage?: string;
}

const CAddEdit: React.FC<CModalProps> = ({ dataProps, isOpen, onClose }) => {
  // here we get the main object state
  const { vObject } = dataProps.state;
  const { setter } = dataProps.state;

  const handleSubmit = async () => {
    // work in progress...
    // Async function under development....
  };

  return (
    <CModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={
        dataProps.action
          ? dataProps.MConfig.buttons.add
          : dataProps.MConfig.buttons.update
      }
      error={false}
      errorMessage={''}
      buttonOnClick={() => handleSubmit()}
      hasSubmitButton
      buttonTitle={BTN_SUBMIT}
    >
      <Grid container spacing={2}>
        <CRender
          MConfig={dataProps.MConfig}
          vObject={vObject}
          setter={setter}
        />
      </Grid>
    </CModal>
  );
};

export default CAddEdit;
