import type { Meta, StoryObj } from '@storybook/react';
import CPieChart from './CPieChart';
import { Box } from '@mui/material';
import { PieChartData } from '../types';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta = {
  title: 'UI/Chart/CPieChart',
  component: CPieChart,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '600px', padding: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CPieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for the stories
const sampleData: PieChartData[] = [
  {
    label: 'Category A',
    value: 25,
  },
  {
    label: 'Category B',
    value: 13,
  },
  {
    label: 'Category C',
    value: 48,
  },
  {
    label: 'Category D',
    value: 30,
  },
  {
    label: 'Category E',
    value: 15,
  },
];

// Basic story with default props
export const Default: Story = {
  args: {
    data: sampleData,
  },
};

// Story with total display
export const WithTotal: Story = {
  args: {
    data: sampleData,
    hasTotal: true,
  },
};

// Story with animation
export const WithAnimation: Story = {
  args: {
    data: sampleData,
    hasTotal: true,
    animation: true,
  },
};

// Story with custom colors
export const CustomColors: Story = {
  render: () => {
    const customColors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEEAD',
    ];

    return <CPieChart data={sampleData} colors={customColors} hasTotal />;
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    data: sampleData,
    sx: {
      backgroundColor: '#f5f5f5',
      padding: 2,
      borderRadius: 2,
    },
  },
};

// Story with minimal data
export const MinimalData: Story = {
  args: {
    data: sampleData.slice(0, 2),
    hasTotal: true,
  },
};
