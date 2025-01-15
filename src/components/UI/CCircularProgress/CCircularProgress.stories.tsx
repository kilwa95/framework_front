import type { Meta, StoryObj } from '@storybook/react';
import CCircularProgress from './CCircularProgress';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Feedback/CCircularProgress',
  component: CCircularProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CCircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', height: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with modal mode
export const Modal: Story = {
  args: {
    isModal: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', height: '100px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    sx: {
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      padding: '16px',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', height: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};
