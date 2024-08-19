import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { Dispatch, useState } from 'react';
import CCommentaryField from 'src/components/UI/CCommentaryField/CCommentaryField';
import CDatePicker from 'src/components/UI/CDatePicker/CDatePicker';
import CTextField from 'src/components/UI/CTextField/CTextField';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { dataAttrOptions, handleFieldChange } from '../Functions/base';
import { componentsPagesStyles } from './style';

import { v4 as uuidv4 } from 'uuid';

interface Props {
  MConfig: any;
  vObject: any;
  setter: Dispatch<any>;
}

const CRender: React.FC<Props> = ({ MConfig, vObject, setter }) => {
  const theme = useTheme();

  dayjs.extend(customParseFormat);

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        {MConfig.fields.map((fieldSet: any, index: number) => {
          if (
            ['id', 'reference', 'created_at', 'updated_at'].includes(
              fieldSet?.field,
            ) ||
            !fieldSet?.editable
          ) {
            return null;
          }

          const renderTextField = () => {
            const key = `${uuidv4}`;

            return (
              <>
                <Grid item key={key} xs={6}>
                  <CTextField
                    value={vObject[fieldSet.field]}
                    onChange={(event: any) =>
                      handleFieldChange(
                        fieldSet?.field,
                        event.target.value,
                        setter,
                      )
                    }
                    label={fieldSet.headerName}
                    fullWidth
                    required={fieldSet.required}
                  />
                </Grid>
              </>
            );
          };

          const renderDatePicker = () => {
            const key = `${uuidv4}`;

            return (
              <>
                <Grid item key={key} xs={6}>
                  <CDatePicker
                    value={dayjs(vObject[fieldSet.field])}
                    label={fieldSet.headerName}
                    setValue={(date) =>
                      date &&
                      handleFieldChange(
                        fieldSet.field,
                        date.format('YYYY-MM-DD'),
                        setter,
                      )
                    }
                  />
                </Grid>
              </>
            );
          };

          const renderCommentaryField = () => {
            const [helperText, setHelperText] = useState('');
            const key = `${uuidv4}`;

            return (
              <>
                <Grid item key={key} xs={12}>
                  <CCommentaryField
                    value={vObject[fieldSet.field]}
                    label={fieldSet.headerName}
                    placeholder={fieldSet.placeholder}
                    helperText={helperText}
                    minValue={fieldSet?.minLength}
                    maxValue={fieldSet?.maxLength}
                    onChange={(event) => {
                      const inputValue = event.target.value;

                      let errorMessage = '';

                      if (inputValue.length < fieldSet.minLength) {
                        errorMessage = `Limite de caractères non respectée ${inputValue.length}/${fieldSet.minLength}`;
                      } else if (inputValue.length > fieldSet.maxLength) {
                        errorMessage = `Limite de caractères est dépassée ${inputValue.length}/${fieldSet.maxLength}`;
                      } else {
                        errorMessage = `Limite de caractères est de ${inputValue.length}/${fieldSet.minLength}`;
                      }

                      setHelperText(errorMessage);
                      handleFieldChange(fieldSet?.field, inputValue, setter);
                    }}
                  />
                </Grid>
              </>
            );
          };

          const renderCheckbox = () => {
            const key = `${uuidv4}`;

            return (
              <>
                <Grid
                  item
                  key={key}
                  xs={6}
                  style={{
                    color: theme.palette.grey[600],
                  }}
                >
                  <Typography>
                    {fieldSet.headerName}
                    <Checkbox
                      aria-label={fieldSet.headerName}
                      checked={vObject[fieldSet.field] as boolean}
                      onChange={(event) =>
                        handleFieldChange(
                          fieldSet.field,
                          event.target.checked,
                          setter,
                        )
                      }
                      sx={{
                        color: theme.palette.error.darkest,
                        '&.Mui-checked': {
                          color: theme.palette.error.darkest,
                        },
                      }}
                    />
                  </Typography>
                </Grid>
              </>
            );
          };

          const renderSelectField = () => {
            const liste: dataAttrOptions[] = fieldSet.data() || [];
            const key = `${uuidv4}`;

            return (
              <>
                <Grid item key={key} xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id={`id-select-label-${fieldSet.field}`}>
                      {fieldSet.headerName}
                    </InputLabel>
                    <Select
                      labelId={`select-label-${fieldSet.field}`}
                      id={`id-select-${fieldSet.field}`}
                      value={
                        vObject[fieldSet.field]?.value ||
                        vObject[fieldSet.field]
                      }
                      label="Sélectionner une Option"
                      onChange={(event) =>
                        handleFieldChange(
                          fieldSet.field,
                          event.target.value,
                          setter,
                        )
                      }
                    >
                      {liste.map((state: any) => (
                        <MenuItem key={state.value} value={state.value}>
                          {state.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            );
          };

          const renderMultiSelectField = () => {
            const params: any[] = []; // add custom extra params
            const liste: dataAttrOptions[] = fieldSet.data(params) || [];
            const key = `${uuidv4}`;

            return (
              <Grid item key={key} xs={6}>
                <Box sx={componentsPagesStyles(theme).componentWrapper}>
                  <Autocomplete
                    disablePortal
                    multiple={fieldSet.multiple}
                    fullWidth
                    id={`id-${fieldSet.field}-${index}`}
                    options={liste || []}
                    value={vObject[fieldSet.field] || []}
                    onChange={(event: any, newValue: any) => {
                      handleFieldChange(fieldSet.field, newValue, setter);
                    }}
                    filterOptions={(options, { inputValue }) =>
                      options.filter((option) => {
                        const label =
                          typeof option === 'object'
                            ? option?.label || ''
                            : String(option);

                        return label
                          .toLowerCase()
                          .includes(inputValue.toLowerCase());
                      })
                    }
                    renderInput={(pram) => (
                      <TextField {...pram} label={fieldSet.headerName} />
                    )}
                  />
                </Box>
              </Grid>
            );
          };

          return (
            <>
              {fieldSet.typefield === 'string' && renderTextField()}
              {fieldSet.typefield === 'date' && renderDatePicker()}
              {fieldSet.typefield === 'text' && renderCommentaryField()}
              {fieldSet.typefield === 'checkbox' && renderCheckbox()}
              {fieldSet.typefield === 'select' && renderSelectField()}
              {fieldSet.typefield === 'multiSelect' && renderMultiSelectField()}
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default CRender;
