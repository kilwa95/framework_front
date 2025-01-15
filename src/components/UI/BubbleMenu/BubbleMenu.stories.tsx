import type { Meta, StoryObj } from '@storybook/react';
import BubbleMenu from './BubbleMenu';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/BubbleMenu',
  component: BubbleMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BubbleMenu>;

export default meta;
type Story = StoryObj<typeof BubbleMenu>;

export const Default: Story = {
  args: {
    title: 'Menu Options',
    icon: <AddIcon />,
    children: (
      <Box sx={{ p: 2 }}>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </Box>
    ),
  },
};

export const WithCustomContent: Story = {
  args: {
    title: 'Actions',
    icon: <AddIcon />,
    children: (
      <Box sx={{ p: 2, minWidth: '200px' }}>
        <div>Cliquez sur une action</div>
        <div>✨ Action spéciale</div>
        <div>📝 Éditer</div>
        <div>🗑️ Supprimer</div>
      </Box>
    ),
  },
};
