import type { Meta, StoryObj } from '@storybook/react';
import CSelect from './CSelect';
import { Box } from '@mui/material';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Textfield/CSelect',
  component: CSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample menu items for the stories
const sampleMenuItems = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
];

// Basic story with default props
export const Default: Story = {
  args: {
    menuItems: sampleMenuItems,
    label: 'Select an option',
    labelId: 'basic-select',
    value: '',
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    value: 'Option 1',
    fetchStatus: ReduxStatus.Loading,
  },
  decorators: Default.decorators,
};

// Story with success state
export const Success: Story = {
  args: {
    ...Default.args,
    value: 'Option 2',
    fetchStatus: ReduxStatus.Succeeded,
  },
  decorators: Default.decorators,
};

// Story with error state
export const Error: Story = {
  args: {
    ...Default.args,
    value: 'Option 3',
    fetchStatus: ReduxStatus.Failed,
    errorMessage: 'An error occurred while fetching data',
  },
  decorators: Default.decorators,
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'Option 1',
  },
  decorators: Default.decorators,
};

// Story with small size
export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    sx: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#f5f5f5',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      },
    },
  },
  decorators: Default.decorators,
};

// Story with default value
export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: 'Option 1',
  },
  decorators: Default.decorators,
}; 