import type { Meta, StoryObj } from '@storybook/react';
import CTextField from './CTextField';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const meta = {
  title: 'UI/Textfield/CTextField',
  component: CTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    id: 'text-1',
    label: 'Basic TextField',
    value: '',
    onChange: (event) => console.log('Value changed:', event.target.value),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    label: 'With Placeholder',
    placeholder: 'Enter your text here...',
  },
  decorators: Default.decorators,
};

// Story with end adornment
export const WithEndAdornment: Story = {
  args: {
    ...Default.args,
    label: 'With Icon',
    endAdornment: <SearchIcon />,
  },
  decorators: Default.decorators,
};

// Story with multiline support
export const Multiline: Story = {
  args: {
    ...Default.args,
    label: 'Multiline TextField',
    multiline: true,
    maxRows: 4,
    placeholder: 'Enter multiple lines of text...',
  },
  decorators: Default.decorators,
};

// Story with number type and limits
export const NumberWithLimits: Story = {
  args: {
    ...Default.args,
    label: 'Number Input',
    type: 'number',
    minValue: 0,
    maxValue: 100,
    placeholder: 'Enter a number between 0 and 100',
  },
  decorators: Default.decorators,
};

// Story with file input
export const FileInput: Story = {
  args: {
    ...Default.args,
    label: 'File Upload',
    type: 'file',
    accept: '.pdf,.doc,.docx',
    setFile: (file) => console.log('File selected:', file),
  },
  decorators: Default.decorators,
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Disabled TextField',
    value: 'This field is disabled',
    disabled: true,
  },
  decorators: Default.decorators,
};

// Story with required field
export const Required: Story = {
  args: {
    ...Default.args,
    label: 'Required Field',
    required: true,
    helperText: 'This field is required',
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    label: 'Custom Styled',
    sx: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#f5f5f5',
        '&:hover fieldset': {
          borderColor: 'primary.main',
        },
      },
    },
  },
  decorators: Default.decorators,
};

// Story with full width
export const FullWidth: Story = {
  args: {
    ...Default.args,
    label: 'Full Width TextField',
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