/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import CImportTextfield from './CImportTextfield';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Textfield/CImportTextfield',
  component: CImportTextfield,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CImportTextfield>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    label: 'Import File',
    isLoading: false,
    value: null,
    setFile: fn(),
    importFunction: () => console.log('Import clicked'),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '500px', padding: 2 }}>
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
    value: new File([''], 'test.txt'),
  },
  decorators: Default.decorators,
};

// Story with file selected
export const WithFileSelected: Story = {
  args: {
    ...Default.args,
    value: new File([''], 'document.pdf'),
  },
  decorators: Default.decorators,
};

// Story with specific file type acceptance
export const WithFileTypeRestriction: Story = {
  args: {
    ...Default.args,
    label: 'Import PDF',
    accept: '.pdf',
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

// Story with disabled state (when no file is selected)
export const NoFileSelected: Story = {
  args: {
    ...Default.args,
    label: 'Select a file to import',
    value: null,
  },
  decorators: Default.decorators,
};
