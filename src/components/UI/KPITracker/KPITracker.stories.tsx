import type { Meta, StoryObj } from '@storybook/react';
import { KPITracker } from './KPITracker';
import { Box } from '@mui/material';
import { useState } from 'react';

const meta = {
  title: 'UI/Data Display/KPITracker',
  component: KPITracker,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof KPITracker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with static value
export const Default: Story = {
  args: {
    title: 'Active Users',
    value: 1234,
  },
};

// Story with custom formatter
export const WithFormatter: Story = {
  args: {
    title: 'Revenue',
    value: 15000,
    formatter: (value) => `$${value.toLocaleString()}`,
  },
};

// Story with loading state
export const Loading: Story = {
  args: {
    title: 'Processing',
    value: 0,
    loading: true,
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    title: 'Custom Style',
    value: 789,
    className: 'custom-kpi',
  },
};

// Story with auto-refresh functionality
export const Story = {
  render: () => {
    const [count, setCount] = useState(1000);

    const handleRefresh = async () => {
      // Simulate API call that returns a random number
      await new Promise((resolve) => setTimeout(resolve, 500));

      return Math.floor(Math.random() * 2000);
    };

    return (
      <KPITracker
        title="Auto Refresh KPI"
        value={count}
        refreshInterval={3000}
        onRefresh={handleRefresh}
      />
    );
  },
};

// Story with percentage formatter
export const PercentageKPI: Story = {
  args: {
    title: 'Completion Rate',
    value: 85.5,
    formatter: (value) => `${value}%`,
  },
};
// Story with error simulation
export const ErrorSimulation: Story = {
  render: () => {
    const [errorCount] = useState(0);

    const handleRefresh = async () => {
      // Simulate API call that occasionally fails
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (Math.random() < 0.3) {
        throw new Error('Failed to fetch data');
      }

      return Math.floor(Math.random() * 100);
    };

    return (
      <KPITracker
        title="Error Handling Demo"
        value={errorCount}
        refreshInterval={2000}
        onRefresh={handleRefresh}
      />
    );
  },
};

// Story with large numbers
export const LargeNumbers: Story = {
  args: {
    title: 'Total Views',
    value: 1234567,
    formatter: (value) => value.toLocaleString(),
  },
};

// Story with multiple instances
export const MultipleTrackers: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
      <KPITracker title="Users" value={1234} />
      <KPITracker
        title="Revenue"
        value={50000}
        formatter={(value) => `$${value.toLocaleString()}`}
      />
      <KPITracker
        title="Conversion"
        value={23.5}
        formatter={(value) => `${value}%`}
      />
    </Box>
  ),
  decorators: [
    (Story) => (
      <Box sx={{ width: '800px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};
