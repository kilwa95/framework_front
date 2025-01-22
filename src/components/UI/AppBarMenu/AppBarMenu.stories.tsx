/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import AppBarMenu from './AppBarMenu';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

const theme = createTheme();

// Mock user data for the store
const mockUser = {
  role: 'DR',
  username: 'Test User',
};

const meta = {
  title: 'UI/Menu/AppBarMenu',
  component: AppBarMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Box sx={{ padding: 2, backgroundColor: 'primary.main' }}>
              <Story />
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof AppBarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock menu items
const menuItems = [
  {
    id: 1,
    name: 'Option 1',
    url: 'option1',
    accessRoles: ['DR'],
  },
  {
    id: 2,
    name: 'Option 2',
    url: 'option2',
    accessRoles: ['DR'],
  },
  {
    id: 3,
    name: 'External Link',
    url: 'https://example.com',
    redirect: true,
    accessRoles: ['DR'],
  },
];

export const Default: Story = {
  args: {
    menuName: 'Menu',
    url: 'menu',
    menuItems: menuItems,
    anchorEl: null,
    onOpen: () => console.log('Menu opened'),
    onClose: () => console.log('Menu closed'),
  },
  parameters: {
    initialState: {
      auth: {
        login: {
          user: mockUser,
        },
      },
    },
  },
};

export const WithIconButton: Story = {
  args: {
    menuName: 'User Menu',
    url: 'user',
    menuItems: menuItems,
    anchorEl: null,
    onOpen: () => console.log('Menu opened'),
    onClose: () => console.log('Menu closed'),
    useIconButton: true,
  },
  parameters: {
    initialState: {
      auth: {
        login: {
          user: mockUser,
        },
      },
    },
  },
};

export const DifferentRole: Story = {
  args: {
    menuName: 'Menu',
    url: 'menu',
    menuItems: menuItems,
    anchorEl: null,
    onOpen: () => console.log('Menu opened'),
    onClose: () => console.log('Menu closed'),
  },
  parameters: {
    initialState: {
      auth: {
        login: {
          user: {
            ...mockUser,
            role: 'MG',
          },
        },
      },
    },
  },
};

export const EmptyMenu: Story = {
  args: {
    menuName: 'Empty Menu',
    url: 'empty',
    menuItems: [],
    anchorEl: null,
    onOpen: () => console.log('Menu opened'),
    onClose: () => console.log('Menu closed'),
  },
};
