/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import CDateTimePicker from './CDateTimePicker';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const meta = {
  title: 'UI/Textfield/CDateTimePicker',
  component: CDateTimePicker,
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
} satisfies Meta<typeof CDateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    value: null,
    setValue: (value) => console.log('DateTime changed:', value),
    label: 'Select Date & Time',
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
