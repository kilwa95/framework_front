import type { Meta, StoryObj } from '@storybook/react';
import { MapLegend } from './MapLegend';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta = {
  title: 'UI/Map/MapLegend',
  component: MapLegend,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: '400px',
            width: '600px',
            position: 'relative',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof MapLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state with sites section active
export const Default: Story = {
  args: {},
};

// Story showing coverage section
export const CoverageSection: Story = {
  render: () => (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <MapLegend />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const coverageTab = canvasElement.querySelector(
      'typography:contains("Couverture")',
    );

    if (coverageTab) {
      await coverageTab.click();
    }
  },
};

// Story with collapsed state
export const Collapsed: Story = {
  render: () => (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <MapLegend />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const collapseButton = canvasElement.querySelector('button');

    if (collapseButton) {
      await collapseButton.click();
    }
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: '400px',
            width: '600px',
            position: 'relative',
            backgroundColor: '#2c3e50',
            '& .MuiPaper-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(8px)',
            },
          }}
        >
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
};
