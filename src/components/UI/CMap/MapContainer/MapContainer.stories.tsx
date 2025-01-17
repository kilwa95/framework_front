import type { Meta, StoryObj } from '@storybook/react';
import { MapContainer } from './MapContainer';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta = {
  title: 'UI/Map/MapContainer',
  component: MapContainer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ height: '100vh', width: '100%' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof MapContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing France center
export const Default: Story = {
  args: {},
};

// Story with custom center and zoom
export const CustomLocation: Story = {
  args: {
    center: [48.8566, 2.3522], // Paris coordinates
    zoom: 12,
  },
};

// Story with custom height through className
export const CustomHeight: Story = {
  args: {
    className: 'h-[400px]',
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    className: 'rounded-xl shadow-lg',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ height: '500px', width: '100%', padding: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
};

// Story showing map in a constrained container
export const ConstrainedContainer: Story = {
  args: {},
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box
          sx={{ height: '400px', width: '600px', margin: 'auto', padding: 2 }}
        >
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
};
