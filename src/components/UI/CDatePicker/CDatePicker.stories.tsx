/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import CDatePicker from './CDatePicker';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const meta = {
  title: 'UI/Textfield/CDatePicker',
  component: CDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ width: '300px', padding: 2 }}>
          <Story />
        </Box>
      </LocalizationProvider>
    ),
  ],
} satisfies Meta<typeof CDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    value: null,
    setValue: (value) => console.log('Date changed:', value),
    label: 'Select Date',
  },
};

// Story with today button
export const WithTodayButton: Story = {
  args: {
    ...Default.args,
    hasTodayButton: true,
  },
};

// Story with tomorrow button
export const WithTomorrowButton: Story = {
  args: {
    ...Default.args,
    hasTomorrowButton: true,
  },
};

// Story with both today and tomorrow buttons
export const WithBothButtons: Story = {
  args: {
    ...Default.args,
    hasTodayButton: true,
    hasTomorrowButton: true,
  },
};

// Story with min date
export const WithMinDate: Story = {
  args: {
    ...Default.args,
    minDate: dayjs(),
    value: dayjs(),
  },
};

// Story with max date
export const WithMaxDate: Story = {
  args: {
    ...Default.args,
    maxDate: dayjs().add(7, 'day'),
    value: dayjs(),
  },
};

// Story with navigation
export const WithNavigation: Story = {
  args: {
    ...Default.args,
    hasNavigation: true,
    value: dayjs(),
    minDate: dayjs().subtract(7, 'day'),
    maxDate: dayjs().add(7, 'day'),
  },
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: dayjs(),
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    value: dayjs(),
    sx: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#f5f5f5',
      },
    },
  },
};
