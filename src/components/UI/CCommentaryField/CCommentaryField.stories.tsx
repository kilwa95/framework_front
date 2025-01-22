/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import CCommentaryField from './CCommentaryField';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Textfield/CCommentaryField',
  component: CCommentaryField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CCommentaryField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    value: '',
    label: 'Commentary',
    onChange: (event) => console.log('Value changed:', event.target.value),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '500px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with character limits
export const WithCharacterLimits: Story = {
  args: {
    value: '',
    label: 'Commentary with limits',
    minValue: 10,
    maxValue: 100,
    onChange: (event) => console.log('Value changed:', event.target.value),
    helperText: 'Enter between 10 and 100 characters',
  },
  decorators: Default.decorators,
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    value: 'This field is disabled',
    label: 'Disabled Commentary',
    disabled: true,
    onChange: (event) => console.log('Value changed:', event.target.value),
  },
  decorators: Default.decorators,
};

// Story with placeholder
export const WithPlaceholder: Story = {
  args: {
    value: '',
    label: 'Commentary',
    placeholder: 'Enter your comments here...',
    onChange: (event) => console.log('Value changed:', event.target.value),
  },
  decorators: Default.decorators,
};

// Story with required field
export const Required: Story = {
  args: {
    value: '',
    label: 'Required Commentary',
    required: true,
    onChange: (event) => console.log('Value changed:', event.target.value),
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    value: '',
    label: 'Custom Styled Commentary',
    onChange: (event) => console.log('Value changed:', event.target.value),
    sx: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#f5f5f5',
      },
    },
  },
  decorators: Default.decorators,
};
