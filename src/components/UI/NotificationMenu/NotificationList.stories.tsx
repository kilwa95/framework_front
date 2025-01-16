import type { Meta, StoryObj } from '@storybook/react';
import NotificationList from './NotificationList';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    actor_content_type: 1,
    actor_object_id: '1',
    verb: 'New message received',
    description: 'You have received a new message from John Doe',
    target_content_type: 1,
    target_object_id: '1',
    timestamp: '2024-03-20T10:30:00Z',
    unread: true,
  },
  {
    id: 2,
    actor_content_type: 1,
    actor_object_id: '2',
    verb: 'Task assigned',
    description: 'A new task has been assigned to you',
    target_content_type: 1,
    target_object_id: '2',
    timestamp: '2024-03-20T09:15:00Z',
    unread: false,
  },
  {
    id: 3,
    actor_content_type: 1,
    actor_object_id: '3',
    verb: 'Meeting reminder',
    description: 'Upcoming team meeting in 30 minutes',
    target_content_type: 1,
    target_object_id: '3',
    timestamp: '2024-03-20T08:00:00Z',
    unread: true,
  },
];

const meta = {
  title: 'UI/Notification/NotificationList',
  component: NotificationList,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '400px', height: '500px', position: 'relative' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with notifications
export const Default: Story = {
  args: {
    handleClose: () => console.log('Close clicked'),
    notificationsList: sampleNotifications,
  },
};

// Story with empty notifications list
export const EmptyList: Story = {
  args: {
    handleClose: () => console.log('Close clicked'),
    notificationsList: [],
  },
};

// Story with many notifications
export const ManyNotifications: Story = {
  args: {
    handleClose: () => console.log('Close clicked'),
    notificationsList: Array(10)
      .fill(null)
      .map((_, index) => ({
        ...sampleNotifications[index % 3],
        id: index + 1,
        timestamp: new Date(
          Date.now() - index * 3600000
        ).toISOString(),
      })),
  },
};

// Story with custom positioning
export const CustomPosition: Story = {
  args: {
    handleClose: () => console.log('Close clicked'),
    notificationsList: sampleNotifications,
    sx: {
      left: '50px',
      top: '20px',
    },
  },
}; 