import type { Meta, StoryObj } from '@storybook/react';
import CSearchbar from './CSearchbar';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Textfield/CSearchbar',
  component: CSearchbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CSearchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options for select
const sampleOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

// Basic story with default props
export const Default: Story = {
  args: {
    id: 'search-1',
    value: '',
    setValue: fn(),
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '500px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with select options
export const WithSelect: Story = {
  args: {
    ...Default.args,
    options: sampleOptions,
    optionValue: 'option1',
    setOptionValue: fn(),
  },
  decorators: Default.decorators,
};

// Story with default value
export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: 'Default search term',
    value: 'Default search term',
  },
  decorators: Default.decorators,
};

// Story with full width
export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
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
    ...Default.args,
    sx: {
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: 'primary.main',
        },
      },
    },
  },
  decorators: Default.decorators,
};
