import type { Meta, StoryObj } from '@storybook/react';
import NetworkSites from './NetworkSites';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';

const theme = createTheme();

// Sample site data
const sampleSites = [
  {
    id: '1',
    name: 'Site Paris Centre',
    status: 'active',
    position: [48.8566, 2.3522],
    coverage: { angle: 45, radius: 10 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Site Paris Est',
    status: 'warning',
    position: [48.85, 2.4],
    coverage: { angle: 180, radius: 5 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Site Paris Nord',
    status: 'error',
    position: [48.86, 2.3],
    coverage: { angle: 270, radius: 8 },
    lastUpdate: new Date().toISOString(),
  },
] as const;

const meta = {
  title: 'Pages/NetworkSites',
  component: NetworkSites,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Box sx={{ height: '100vh', width: '100%' }}>
              <Story />
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof NetworkSites>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default view
export const Default: Story = {
  args: {},
};

// View with loading state
export const Loading: Story = {
  args: {},
  parameters: {
    mockData: {
      loading: true,
    },
  },
};

// View with error state
export const WithError: Story = {
  args: {},
  parameters: {
    mockData: {
      error: 'Failed to load network sites',
    },
  },
};

// View with filtered sites
export const FilteredSites: Story = {
  args: {
    sites: sampleSites.filter((site) => site.status === 'active'),
    activeFilters: {
      status: ['active'],
    },
  },
};

// View with map focused on specific site
export const FocusedSite: Story = {
  args: {
    sites: sampleSites,
    focusedSiteId: '1',
    center: [48.8566, 2.3522],
    zoom: 14,
  },
};

// View with network coverage overlay
export const WithCoverageOverlay: Story = {
  args: {
    sites: sampleSites,
    showCoverage: true,
    coverageData: [
      [48.8566, 2.3522, 0.8],
      [48.85, 2.4, 0.6],
      [48.86, 2.3, 0.4],
    ],
  },
};
