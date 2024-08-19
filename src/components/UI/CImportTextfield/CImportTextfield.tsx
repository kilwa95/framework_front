import React from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import CTextField from '../CTextField/CTextField';
import { LoadingButton } from '@mui/lab';
import { cImportTextfieldStyles } from './styles';

interface CImportTextfieldProps {
  id?: string;
  label?: string;
  isLoading: boolean;
  value: File | null;
  // eslint-disable-next-line no-unused-vars
  setFile: (value: File | null) => void;
  onChange?: () => void;
  accept?: string;
  importFunction: () => void;
  sx?: SxProps<Theme>;
}

const CImportTextfield: React.FC<CImportTextfieldProps> = ({
  id,
  label,
  isLoading,
  value,
  accept,
  importFunction,
  onChange,
  setFile,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        cImportTextfieldStyles(theme).wrapper,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <CTextField
        id={id}
        sx={cImportTextfieldStyles(theme).textfield}
        label={label}
        type="file"
        value={undefined}
        setFile={setFile}
        accept={accept}
        onChange={onChange}
      />
      <LoadingButton
        loading={isLoading}
        disabled={value === null}
        variant="contained"
        sx={cImportTextfieldStyles(theme).button}
        onClick={() => importFunction()}
      >
        Importer
      </LoadingButton>
    </Box>
  );
};

export default CImportTextfield;
