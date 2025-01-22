import type { Meta, StoryObj } from '@storybook/react';
import CStatusPill from './CStatusPill';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Feedback/CStatusPill',
  component: CStatusPill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CStatusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    severity: 'primary',
    children: 'Primary Status',
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with all severity variants
export const AllSeverities: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <CStatusPill severity="primary">Primary</CStatusPill>
      <CStatusPill severity="secondary">Secondary</CStatusPill>
      <CStatusPill severity="error">Error</CStatusPill>
      <CStatusPill severity="info">Info</CStatusPill>
      <CStatusPill severity="warning">Warning</CStatusPill>
      <CStatusPill severity="success">Success</CStatusPill>
      <CStatusPill severity="neutral">Neutral</CStatusPill>
    </Box>
  ),
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    severity: 'primary',
    children: 'Custom Styled',
    sx: {
      padding: '8px 16px',
      fontSize: '1rem',
    },
  },
  decorators: Default.decorators,
};

// Story with long text
export const LongText: Story = {
  args: {
    severity: 'info',
    children: 'This is a very long status message that might wrap',
  },
  decorators: Default.decorators,
};
