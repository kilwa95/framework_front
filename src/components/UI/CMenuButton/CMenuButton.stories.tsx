import type { Meta, StoryObj } from '@storybook/react';
import CMenuButton from './CMenuButton';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const meta = {
  title: 'UI/Button/CMenuButton',
  component: CMenuButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    icon: <PersonIcon />,
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with custom rotation
export const CustomRotation: Story = {
  args: {
    icon: <PersonIcon />,
    rotate: 180,
  },
  decorators: Default.decorators,
};

// Story with different severities
export const Severities: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <CMenuButton icon={<PersonIcon />} severity="primary" />
      <CMenuButton icon={<EditIcon />} severity="secondary" />
      <CMenuButton icon={<DeleteIcon />} severity="error" />
      <CMenuButton icon={<PersonIcon />} severity="info" />
      <CMenuButton icon={<PersonIcon />} severity="warning" />
      <CMenuButton icon={<PersonIcon />} severity="success" />
    </Box>
  ),
};

// Story with onClick handler
export const WithClickHandler: Story = {
  args: {
    icon: <PersonIcon />,
    onClick: () => alert('Button clicked!'),
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    icon: <PersonIcon />,
    sx: {
      '& .MuiIconButton-root': {
        backgroundColor: '#f5f5f5',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      },
    },
  },
  decorators: Default.decorators,
};
