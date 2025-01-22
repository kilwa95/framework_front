import type { Meta, StoryObj } from '@storybook/react';
import Notificationitem from './NotificationItem';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

const theme = createTheme();

const meta = {
  title: 'UI/Notification/NotificationItem',
  component: Notificationitem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ width: '400px', padding: '16px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Notificationitem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample notification data
const sampleNotification = {
  id: 1,
  actor_content_type: 1,
  actor_object_id: '123',
  verb: 'New message received',
  description: 'You have received a new message from John Doe',
  target_content_type: 1,
  target_object_id: '456',
  timestamp: '2024-03-20T10:30:00Z',
  unread: true,
};

// Basic story with unread notification
export const Unread: Story = {
  args: {
    key: 'notification-1',
    notification: sampleNotification,
  },
};

// Story with read notification
export const Read: Story = {
  args: {
    key: 'notification-2',
    notification: {
      ...sampleNotification,
      unread: false,
    },
  },
};

// Story with long content
export const LongContent: Story = {
  args: {
    key: 'notification-3',
    notification: {
      ...sampleNotification,
      verb: 'This is a very long notification title that might need to wrap to multiple lines',
      description:
        'This is a very long notification description that contains a lot of text and might need to wrap to multiple lines to display properly in the notification item component.',
    },
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    key: 'notification-4',
    notification: sampleNotification,
    sx: {
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      '& .MuiTypography-root': {
        color: '#333',
      },
    },
  },
}; 