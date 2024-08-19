import React from 'react';
import { cDatePickerStyles } from './styles';
import { Box, IconButton, Link, SxProps, Theme, useTheme } from '@mui/material';
import useIsTabletPortait from 'src/hooks/useIsTablet';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface CDatePickerProps {
  value: Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  setValue: (arg: Dayjs | null) => void;
  onChange?: () => void;
  hasTodayButton?: boolean;
  hasTomorrowButton?: boolean;
  label?: string;
  minDate?: dayjs.Dayjs | undefined;
  maxDate?: dayjs.Dayjs | undefined;
  disabled?: boolean;
  hasNavigation?: boolean;
  sx?: SxProps<Theme>;
}

const CDatePicker: React.FC<CDatePickerProps> = ({
  value,
  setValue,
  onChange,
  hasTodayButton,
  hasTomorrowButton,
  label,
  minDate,
  maxDate,
  disabled = false,
  hasNavigation = false,
  sx,
}) => {
  const isTablet = useIsTabletPortait();
  const theme = useTheme();

  const handleNavigateBefore = () => {
    if (value) {
      const newValue = value.subtract(1, 'day');

      if (!minDate || !value.isSame(minDate, 'day')) {
        setValue(newValue);
        if (onChange) {
          onChange();
        }
      }
    }
  };

  const handleNavigateNext = () => {
    if (value) {
      const newValue = value.add(1, 'day');

      if (!maxDate || !value.isSame(maxDate, 'day')) {
        setValue(newValue);
        if (onChange) {
          onChange();
        }
      }
    }
  };

  return (
    <Box
      sx={[
        cDatePickerStyles(theme).container,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={cDatePickerStyles(theme).navigateWrapper}>
        {hasNavigation && (
          <IconButton
            disabled={
              value === null || (minDate && minDate.isSame(value, 'day'))
            }
            onClick={handleNavigateBefore}
          >
            <NavigateBeforeIcon />
          </IconButton>
        )}
        {isTablet ? (
          <MobileDatePicker
            label={label}
            value={value}
            onChange={(newValue: Dayjs | null) => {
              setValue(newValue);
              if (onChange) {
                onChange();
              }
            }}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            sx={cDatePickerStyles(theme).datePicker}
          />
        ) : (
          <DatePicker
            label={label}
            value={value}
            onChange={(newValue: Dayjs | null) => {
              setValue(newValue);
              if (onChange) {
                onChange();
              }
            }}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            sx={cDatePickerStyles(theme).datePicker}
          />
        )}
        {hasNavigation && (
          <IconButton
            disabled={
              value === null || (maxDate && maxDate.isSame(value, 'day'))
            }
            onClick={handleNavigateNext}
          >
            <NavigateNextIcon />
          </IconButton>
        )}
      </Box>
      {hasTodayButton && (
        <Box>
          <Link
            sx={cDatePickerStyles(theme).link}
            onClick={() => setValue(dayjs())}
          >
            {"Aujourd'hui"}
          </Link>
        </Box>
      )}
      {hasTomorrowButton && (
        <Box>
          <Link
            sx={cDatePickerStyles(theme).link}
            onClick={() => setValue(dayjs().add(1, 'day'))}
          >
            {'Demain'}
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default CDatePicker;
