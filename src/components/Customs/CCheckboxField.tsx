import React from 'react';
import {
  SxProps,
  Theme,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { at, rest } from 'lodash';

import { useField } from 'formik';

interface CCheckBoxProps {
  id?: string;
  sx?: SxProps<Theme>;
  label: string;
  name: string;
}

const CCheckboxField: React.FC<CCheckBoxProps> = (props: CCheckBoxProps) => {
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');

    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function _onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        control={<Checkbox {...field} onChange={_onChange} />}
        label={props.label}
      />
      {_renderHelperText()}
    </FormControl>
  );
};

export default CCheckboxField;
