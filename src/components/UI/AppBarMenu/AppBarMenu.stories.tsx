import type { Meta, StoryObj } from '@storybook/react';
import AppBarMenu from './AppBarMenu';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';

const meta = {
  title: 'UI/AppBarMenu',
  component: AppBarMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Box sx={{ padding: 2, backgroundColor: 'primary.main' }}>
            <Story />
          </Box>
        </BrowserRouter>
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
    accessRoles: ['USER'],
  },
  {
    id: 2,
    name: 'Option 2',
    url: 'option2',
    accessRoles: ['USER'],
  },
  {
    id: 3,
    name: 'External Link',
    url: 'https://example.com',
    redirect: true,
    accessRoles: ['USER'],
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
