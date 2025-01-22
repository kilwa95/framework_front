import type { Meta, StoryObj } from '@storybook/react';
import UserAvatar from './UserAvatar';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Icon/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample avatar image URL
const sampleImageUrl = 'https://i.pravatar.cc/300';

// Basic story with default props
export const Default: Story = {
  args: {
    src: sampleImageUrl,
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story showing all sizes
export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <UserAvatar src={sampleImageUrl} size="xs" />
      <UserAvatar src={sampleImageUrl} size="sm" />
      <UserAvatar src={sampleImageUrl} size="md" />
      <UserAvatar src={sampleImageUrl} size="lg" />
    </Box>
  ),
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    src: sampleImageUrl,
    size: 'md',
    sx: {
      '& > img': {
        border: '2px solid #1976d2',
        boxShadow: '0 0 8px rgba(0,0,0,0.2)',
      },
    },
  },
  decorators: Default.decorators,
};

// Story with broken image URL
export const BrokenImage: Story = {
  args: {
    src: 'invalid-url.jpg',
    size: 'md',
  },
  decorators: Default.decorators,
};

// Story with extra large custom size
export const CustomLargeSize: Story = {
  args: {
    src: sampleImageUrl,
    size: 'lg',
    sx: {
      '& > img': {
        width: '200px',
        height: '200px',
      },
    },
  },
  decorators: Default.decorators,
}; 