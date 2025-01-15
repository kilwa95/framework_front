import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CAutocomplete from './CAutocomplete';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Textfield/CAutocomplete',
  component: CAutocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for the stories
const options = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Bob Johnson' },
  { id: 4, name: 'Alice Brown' },
];

// Basic story with default props
export const Default: Story = {
  args: {
    items: options,
    labelInput: 'Select a person',
    name: 'person',
    inputValue: '',
    getOptionLabel: (option: any) =>
      typeof option === 'object' ? option.name : option,
    onInputChange: fn(),
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
    isLoading: true,
  },
  decorators: Default.decorators,
};

// Story with error state
export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
  },
  decorators: Default.decorators,
};

// Story with multiple selection
export const MultipleSelection: Story = {
  args: {
    ...Default.args,
    multiple: true,
    defaultValue: [options[0]],
  },
  decorators: Default.decorators,
};

// Story with freeSolo mode
export const FreeSolo: Story = {
  args: {
    ...Default.args,
    freeSolo: true,
  },
  decorators: Default.decorators,
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: options[0],
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
      },
    },
  },
  decorators: Default.decorators,
};
