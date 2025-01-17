import type { Meta, StoryObj } from '@storybook/react';
import { MapControls } from './MapControls';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Map/MapControls',
  component: MapControls,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          position: 'relative',
          height: '400px',
          width: '600px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Story />
      </Box>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof MapControls>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with all controls
export const Default: Story = {
  args: {
    mapType: 'standard',
    onMapTypeChange: fn(),
    onZoomIn: fn(),
    onZoomOut: fn(),
    onCenter: fn(),
  },
};

// Story showing satellite view selected
export const SatelliteView: Story = {
  args: {
    ...Default.args,
    mapType: 'satellite',
  },
};

// Story without zoom controls
export const WithoutZoomControls: Story = {
  args: {
    mapType: 'standard',
    onMapTypeChange: fn(),
    onCenter: fn(),
  },
};

// Story without center control
export const WithoutCenterControl: Story = {
  args: {
    mapType: 'standard',
    onMapTypeChange: fn(),
    onZoomIn: fn(),
    onZoomOut: fn(),
  },
};

// Story with custom positioning
export const CustomPosition: Story = {
  args: {
    ...Default.args,
    className: 'absolute top-2 left-2',
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    className: 'custom-controls',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          position: 'relative',
          height: '400px',
          width: '600px',
          backgroundColor: '#2c3e50',
          '& .custom-controls': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
