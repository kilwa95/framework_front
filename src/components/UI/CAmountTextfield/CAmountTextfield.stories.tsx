/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import CAmountTextfield from './CAmountTextfield';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Textfield/CAmountTextfield',
  component: CAmountTextfield,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CAmountTextfield>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    id: 'amount-1',
    label: 'Amount',
    currency: '€',
    value: '',
    setValue: (value) => console.log('New value:', value),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with min and max values
export const WithMinMax: Story = {
  args: {
    id: 'amount-2',
    label: 'Amount with limits',
    currency: '€',
    value: '50',
    minValue: 0,
    maxValue: 100,
    setValue: (value) => console.log('New value:', value),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    id: 'amount-3',
    label: 'Disabled Amount',
    currency: '€',
    value: '25',
    disabled: true,
    setValue: (value) => console.log('New value:', value),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with full width
export const FullWidth: Story = {
  args: {
    id: 'amount-4',
    label: 'Full Width Amount',
    currency: '$',
    value: '75',
    fullWidth: true,
    setValue: (value) => console.log('New value:', value),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '100%', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    id: 'amount-5',
    label: 'Custom Styled Amount',
    currency: '£',
    value: '100',
    setValue: (value) => console.log('New value:', value),
    sx: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#f5f5f5',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};
