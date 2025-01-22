/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import CIconTooltip from './CIconTooltip';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Icon/CIconTooltip',
  component: CIconTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CIconTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    icon: <PersonIcon />,
    tooltip: 'User Profile',
    onClick: () => console.log('Icon clicked'),
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with different colors
export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <CIconTooltip
        icon={<PersonIcon />}
        tooltip="Primary color"
        onClick={() => console.log('Primary clicked')}
        color="primary"
      />
      <CIconTooltip
        icon={<PersonIcon />}
        tooltip="Secondary color"
        onClick={() => console.log('Secondary clicked')}
        color="secondary"
      />
      <CIconTooltip
        icon={<PersonIcon />}
        tooltip="Error color"
        onClick={() => console.log('Error clicked')}
        color="error"
      />
      <CIconTooltip
        icon={<PersonIcon />}
        tooltip="Warning color"
        onClick={() => console.log('Warning clicked')}
        color="warning"
      />
      <CIconTooltip
        icon={<PersonIcon />}
        tooltip="Info color"
        onClick={() => console.log('Info clicked')}
        color="info"
      />
      <CIconTooltip
        icon={<PersonIcon />}
        tooltip="Success color"
        onClick={() => console.log('Success clicked')}
        color="success"
      />
    </Box>
  ),
};

// Story with different icons
export const DifferentIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <CIconTooltip
        icon={<PersonIcon />}
        tooltip="User"
        onClick={() => console.log('User clicked')}
      />
      <CIconTooltip
        icon={<EditIcon />}
        tooltip="Edit"
        onClick={() => console.log('Edit clicked')}
      />
      <CIconTooltip
        icon={<DeleteIcon />}
        tooltip="Delete"
        onClick={() => console.log('Delete clicked')}
      />
    </Box>
  ),
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    icon: <PersonIcon />,
    tooltip: 'Custom styled tooltip',
    onClick: () => console.log('Custom styled clicked'),
    sx: {
      '& .MuiIconButton-root': {
        backgroundColor: '#f5f5f5',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      },
    },
  },
};
