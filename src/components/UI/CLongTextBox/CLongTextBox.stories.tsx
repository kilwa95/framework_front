import type { Meta, StoryObj } from '@storybook/react';
import CLongTextBox from './CLongTextBox';
import { Box, Typography } from '@mui/material';

const meta = {
  title: 'UI/Box/CLongTextBox',
  component: CLongTextBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CLongTextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const LOREM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

// Basic story with default props
export const Default: Story = {
  args: {
    children: <Typography>{LOREM_TEXT}</Typography>,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '500px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with line count limit
export const WithLineCount: Story = {
  args: {
    maxLineCount: 3,
    children: <Typography>{LOREM_TEXT}</Typography>,
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    children: <Typography>{LOREM_TEXT}</Typography>,
    sx: {
      backgroundColor: '#f5f5f5',
      border: '1px solid #e0e0e0',
    },
  },
  decorators: Default.decorators,
};

// Story with different content types
export const DifferentContent: Story = {
  args: {
    maxLineCount: 4,
    children: (
      <>
        <Typography variant="h6">Title</Typography>
        <Typography variant="body2">{LOREM_TEXT}</Typography>
      </>
    ),
  },
  decorators: Default.decorators,
};

// Story with long text and scrolling
export const LongText: Story = {
  args: {
    maxLineCount: 5,
    children: <Typography>{Array(5).fill(LOREM_TEXT).join(' ')}</Typography>,
  },
  decorators: Default.decorators,
};
