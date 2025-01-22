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

// Exemple de données de sites avec statuts correspondant à la légende
const sampleSites = [
  {
    id: '1',
    position: [48.8566, 2.3522],
    name: 'Site Paris Centre',
    status: 'active',
    coverage: { angle: 45, radius: 10 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '2',
    position: [48.85, 2.4],
    name: 'Site Paris Est',
    status: 'warning',
    coverage: { angle: 180, radius: 5 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '3',
    position: [48.86, 2.3],
    name: 'Site Paris Nord',
    status: 'error',
    coverage: { angle: 270, radius: 8 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '4',
    position: [48.87, 2.35],
    name: 'Site Paris Maintenance',
    status: 'maintenance',
    coverage: { angle: 90, radius: 6 },
    lastUpdate: new Date().toISOString(),
  },
] as const;

// Story avec légende et sites
export const WithLegendAndSites: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 12,
    sites: sampleSites,
  },
  parameters: {
    docs: {
      description: {
        story: `Carte avec légende interactive et sites :
        - Légende détaillée des statuts de sites
        - Sites avec différents statuts correspondant à la légende
        - Possibilité de basculer entre les vues "Sites" et "Couverture"
        - Informations détaillées au survol des éléments de légende`,
      },
    },
  },
};

// Story avec légende et couverture
export const WithLegendAndCoverage: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 12,
    sites: sampleSites.map((site) => ({
      ...site,
      coverage: {
        ...site.coverage,
        quality:
          site.status === 'active'
            ? 'Optimal'
            : site.status === 'warning'
              ? 'Passable'
              : site.status === 'error'
                ? 'Très mauvais'
                : 'Mauvais',
      },
    })),
  },
  parameters: {
    docs: {
      description: {
        story: `Carte avec légende de couverture :
        - Visualisation des niveaux de couverture
        - Correspondance entre statuts et qualité de couverture
        - Légende interactive avec indicateurs de niveau`,
      },
    },
  },
};

// Story complète avec toutes les fonctionnalités
export const FullFeaturedWithLegend: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 12,
    sites: sampleSites,
    incidents: [
      {
        id: '1',
        position: [48.8566, 2.3522],
        type: 'call',
        status: 'new',
        timestamp: new Date().toISOString(),
        description: 'Perte de connexion',
      },
      {
        id: '2',
        position: [48.85, 2.4],
        type: 'data',
        status: 'processing',
        timestamp: new Date().toISOString(),
        description: 'Problème de débit',
      },
    ],
    onSiteClick: (site) => {
      console.log('Site cliqué:', site);
      alert(
        `Site: ${site.name} (${site.status})\nCouverture: ${site.coverage.radius}km`,
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Démonstration complète avec légende interactive :
        - Légende complète avec statuts et couverture
        - Sites avec différents statuts et rayons de couverture
        - Incidents géolocalisés
        - Interactions sur les sites et la légende
        - Informations détaillées dans les popups et tooltips`,
      },
    },
  },
};
