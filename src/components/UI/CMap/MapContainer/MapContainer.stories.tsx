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

// Story demonstrating map controls
export const WithMapControls: Story = {
  args: {},
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ height: '600px', width: '100%', padding: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `Cette vue démontre les contrôles de carte intégrés :
        - Basculement entre vue standard et satellite
        - Contrôles de zoom
        - Bouton de recentrage`,
      },
    },
  },
};

// Exemple de données de sites
const sampleSites = [
  {
    id: '1',
    position: [48.8566, 2.3522], // Paris
    name: 'Site Paris Centre',
    status: 'active',
    coverage: { angle: 45, radius: 10 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '2',
    position: [48.85, 2.4], // Paris Est
    name: 'Site Paris Est',
    status: 'warning',
    coverage: { angle: 180, radius: 5 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '3',
    position: [48.86, 2.3], // Paris Nord
    name: 'Site Paris Nord',
    status: 'error',
    coverage: { angle: 270, radius: 8 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '4',
    position: [48.84, 2.35], // Paris Sud
    name: 'Site Maintenance',
    status: 'maintenance',
    coverage: { angle: 90, radius: 15 },
    lastUpdate: new Date().toISOString(),
  },
] as const;

// Story avec des sites
export const WithSites: Story = {
  args: {
    center: [48.8566, 2.3522], // Paris
    zoom: 12,
    sites: sampleSites,
  },
  parameters: {
    docs: {
      description: {
        story: `Cette vue montre la carte avec des marqueurs de sites :
        - Sites avec différents statuts (actif, avertissement, erreur, maintenance)
        - Différentes orientations des marqueurs
        - Popups avec informations détaillées`,
      },
    },
  },
};

// Story avec un seul site
export const SingleSite: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 14,
    sites: [sampleSites[0]],
  },
};

// Story avec gestion des clics
export const WithClickHandling: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 12,
    sites: sampleSites,
    onSiteClick: (site) => {
      console.log('Site cliqué:', site);
      alert(`Site cliqué: ${site.name}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cette vue démontre la gestion des clics sur les marqueurs de sites. Cliquez sur un marqueur pour voir l'action.",
      },
    },
  },
};
