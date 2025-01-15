/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import CInfosCard from './CInfosCard';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Card/CInfosCard',
  component: CInfosCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CInfosCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    children: 'This is a basic card',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with icon
export const WithIcon: Story = {
  args: {
    children: 'Card with icon',
    icon: <PersonIcon />,
  },
  decorators: Default.decorators,
};

// Story as button
export const AsButton: Story = {
  args: {
    children: 'This is a button card',
    isButton: true,
    onClick: () => console.log('Button clicked'),
  },
  decorators: Default.decorators,
};

// Story with loading state
export const Loading: Story = {
  args: {
    children: 'Loading state',
    isButton: true,
    loading: true,
    onClick: () => console.log('Button clicked'),
  },
  decorators: Default.decorators,
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    children: 'Disabled state',
    isButton: true,
    disabled: true,
    onClick: () => console.log('Button clicked'),
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    children: 'Custom styled card',
    sx: {
      backgroundColor: '#f5f5f5',
      color: '#333',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
    },
  },
  decorators: Default.decorators,
};

// Story with button and icon
export const ButtonWithIcon: Story = {
  args: {
    children: 'Button with icon',
    isButton: true,
    icon: <PersonIcon />,
    onClick: () => console.log('Button clicked'),
  },
  decorators: Default.decorators,
};
