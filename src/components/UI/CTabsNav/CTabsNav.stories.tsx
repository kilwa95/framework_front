import type { Meta, StoryObj } from '@storybook/react';
import CTabsNav from './CTabsNav';
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Navigation/CTabsNav',
  component: CTabsNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CTabsNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tab data
const sampleTabs = [
  {
    id: 'tab1',
    title: 'Home',
    icon: <HomeIcon />,
    children: <div>Home Content</div>,
  },
  {
    id: 'tab2',
    title: 'Profile',
    icon: <PersonIcon />,
    children: <div>Profile Content</div>,
  },
  {
    id: 'tab3',
    title: 'Settings',
    icon: <SettingsIcon />,
    children: <div>Settings Content</div>,
  },
];

// Basic story with default props
export const Default: Story = {
  args: {
    tabInfos: sampleTabs,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '600px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with notifications
export const WithNotifications: Story = {
  args: {
    tabInfos: [
      {
        ...sampleTabs[0],
        notificationsCount: 3,
      },
      {
        ...sampleTabs[1],
        notificationsCount: 1,
      },
      sampleTabs[2],
    ],
  },
  decorators: Default.decorators,
};

// Story with default tab opened
export const DefaultTabOpened: Story = {
  args: {
    tabInfos: sampleTabs,
    defaultTabOpened: 'tab2',
  },
  decorators: Default.decorators,
};

// Story with onChange handler
export const WithOnChange: Story = {
  args: {
    tabInfos: sampleTabs,
    onChange: fn(),
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    tabInfos: sampleTabs,
    sx: {
      '& .MuiTabs-root': {
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      },
      '& .MuiTab-root': {
        minHeight: '64px',
      },
    },
  },
  decorators: Default.decorators,
};
