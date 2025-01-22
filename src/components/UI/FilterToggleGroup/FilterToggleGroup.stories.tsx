import type { Meta, StoryObj } from '@storybook/react';
import { FilterToggleGroup } from './FilterToggleGroup';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Filters/FilterToggleGroup',
  component: FilterToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample toggle options
const sampleOptions = [
  {
    id: 'option1',
    label: 'Option 1',
    value: false,
  },
  {
    id: 'option2',
    label: 'Option 2',
    value: false,
  },
  {
    id: 'option3',
    label: 'Option 3',
    value: false,
  },
];

// Basic story with default props
export const Default: Story = {
  args: {
    options: sampleOptions,
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '400px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with initial values
export const WithInitialValues: Story = {
  args: {
    options: sampleOptions,
    onChange: fn(),
    initialValues: {
      option1: true,
      option2: false,
      option3: true,
    },
  },
  decorators: Default.decorators,
};

// Story with many options
export const ManyOptions: Story = {
  args: {
    options: [
      ...sampleOptions,
      {
        id: 'option4',
        label: 'Option 4',
        value: false,
      },
      {
        id: 'option5',
        label: 'Option 5',
        value: false,
      },
      {
        id: 'option6',
        label: 'Option 6',
        value: false,
      },
    ],
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '600px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    options: sampleOptions,
    onChange: fn(),
    className: 'custom-toggle-group',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: '400px',
          padding: 2,
          '& .custom-toggle-group': {
            backgroundColor: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            '& .options-grid': {
              gap: '16px',
            },
            '& .reset-button': {
              marginTop: '16px',
              backgroundColor: '#1ea97c',
              color: 'white',
              '&:hover': {
                backgroundColor: '#167d5c',
              },
            },
          },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

// Story demonstrating reset functionality
export const WithReset: Story = {
  args: {
    options: sampleOptions,
    onChange: fn(),
    initialValues: {
      option1: true,
      option2: true,
      option3: true,
    },
  },
  decorators: Default.decorators,
};
