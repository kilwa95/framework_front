import type { Meta, StoryObj } from '@storybook/react';
import ValidationPasswordSection from './ValidationPasswordSection';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Validation/ValidationPasswordSection',
  component: ValidationPasswordSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ValidationPasswordSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props (empty password)
export const Default: Story = {
  args: {
    value: '',
    confirmValue: '',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '500px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with partially valid password
export const PartiallyValid: Story = {
  args: {
    value: 'Test123',
    confirmValue: '',
  },
  decorators: Default.decorators,
};

// Story with valid password but no confirmation
export const ValidPasswordNoConfirm: Story = {
  args: {
    value: 'Test123!@#',
    confirmValue: '',
  },
  decorators: Default.decorators,
};

// Story with valid password and matching confirmation
export const AllValid: Story = {
  args: {
    value: 'Test123!@#',
    confirmValue: 'Test123!@#',
  },
  decorators: Default.decorators,
};

// Story with valid password but mismatched confirmation
export const MismatchedConfirmation: Story = {
  args: {
    value: 'Test123!@#',
    confirmValue: 'Test123!@#Different',
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    value: 'Test123!@#',
    confirmValue: 'Test123!@#',
    sx: {
      backgroundColor: '#f5f5f5',
      padding: 2,
      borderRadius: 1,
    },
  },
  decorators: Default.decorators,
}; 