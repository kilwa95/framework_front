import type { Meta, StoryObj } from '@storybook/react';
import CModal from './CModal';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Modal/CModal',
  component: CModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
    modalTitle: 'Basic Modal',
    error: false,
    errorMessage: '',
    children: <Box sx={{ p: 2 }}>This is a basic modal content.</Box>,
  },
};

// Story with error state
export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    errorMessage: 'This is an error message',
  },
};

// Story with submit button
export const WithSubmitButton: Story = {
  args: {
    ...Default.args,
    hasSubmitButton: true,
    buttonTitle: 'Submit',
    buttonOnClick: fn(),
  },
};

// Story with loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    hasSubmitButton: true,
    buttonTitle: 'Submit',
    buttonOnClick: fn(),
    buttonIsLoading: true,
  },
};

// Story with disabled button
export const DisabledButton: Story = {
  args: {
    ...Default.args,
    hasSubmitButton: true,
    buttonTitle: 'Submit',
    buttonOnClick: fn(),
    buttonIsDisabled: true,
  },
};

// Story without cancel button
export const WithoutCancelButton: Story = {
  args: {
    ...Default.args,
    hasCancelButton: false,
    hasSubmitButton: true,
    buttonTitle: 'Confirm',
    buttonOnClick: fn(),
  },
};

// Story with custom size
export const CustomSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    children: (
      <Box sx={{ p: 2, minWidth: '600px' }}>
        This is a large modal with custom content.
      </Box>
    ),
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    sx: {
      '& .MuiDialog-paper': {
        backgroundColor: '#f5f5f5',
        borderRadius: '16px',
      },
    },
    children: <Box sx={{ p: 2 }}>Modal with custom styling.</Box>,
  },
};
