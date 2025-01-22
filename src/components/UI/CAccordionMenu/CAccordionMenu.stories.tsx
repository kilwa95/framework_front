import type { Meta, StoryObj } from '@storybook/react';
import CAccordionMenu from './CAccordionMenu';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme(); // Use default MUI theme
// Mock user data for the store
const mockUser = {
  role: 'DR',
  username: 'Test User',
};

const meta = {
  title: 'UI/Accordion/CAccordionMenu',
  component: CAccordionMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div
              style={{ width: '300px', minHeight: '400px', padding: '20px' }}
            >
              <Story />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CAccordionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default state
export const Default: Story = {
  args: {},
};

// Story showing expanded state
export const Expanded: Story = {
  args: {},
  parameters: {
    initialState: {
      auth: {
        login: {
          user: mockUser,
        },
      },
      nav: {
        leftMenuOpened: true,
      },
    },
  },
};

// Story showing menu with different user role
export const DifferentRole: Story = {
  args: {},
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
