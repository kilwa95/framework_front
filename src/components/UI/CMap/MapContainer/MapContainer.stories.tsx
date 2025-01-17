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

// Exemple de données de sites
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
] as const;

// Exemple de données d'incidents groupés
const sampleIncidents = [
  // Groupe 1 : Incidents proches dans Paris Centre
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
    position: [48.8568, 2.3524],
    type: 'data',
    status: 'processing',
    timestamp: new Date().toISOString(),
    description: 'Débit réduit',
  },
  {
    id: '3',
    position: [48.8565, 2.3520],
    type: 'sms',
    status: 'new',
    timestamp: new Date().toISOString(),
    description: 'Échec d\'envoi SMS',
  },
  // Groupe 2 : Incidents dans Paris Est
  {
    id: '4',
    position: [48.85, 2.4],
    type: 'call',
    status: 'resolved',
    timestamp: new Date().toISOString(),
    description: 'Appels interrompus',
  },
  {
    id: '5',
    position: [48.851, 2.401],
    type: 'data',
    status: 'processing',
    timestamp: new Date().toISOString(),
    description: 'Latence réseau',
  },
  // Incidents isolés
  {
    id: '6',
    position: [48.86, 2.3],
    type: 'other',
    status: 'new',
    timestamp: new Date().toISOString(),
    description: 'Problème technique',
  },
] as const;

// Story de base
export const Default: Story = {
  args: {},
};

// Story avec localisation personnalisée
export const CustomLocation: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 12,
  },
};

// Story avec sites
export const WithSites: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 12,
    sites: sampleSites,
  },
  parameters: {
    docs: {
      description: {
        story: `Carte avec marqueurs de sites :
        - Différents statuts (actif, avertissement, erreur)
        - Orientations variables des marqueurs
        - Popups d'information détaillée`,
      },
    },
  },
};

// Story avec clustering d'incidents
export const WithIncidentClusters: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 13,
    incidents: sampleIncidents,
    onIncidentClick: (incident) => {
      console.log('Incident cliqué:', incident);
      alert(`Incident: ${incident.description} (${incident.type})`);
    },
    onClusterClick: (incidents) => {
      console.log('Cluster cliqué:', incidents);
      alert(`Groupe de ${incidents.length} incidents dans cette zone`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Carte avec clustering d'incidents :
        - Regroupement automatique des incidents proches
        - Différenciation visuelle par nombre d'incidents (couleurs)
        - Types variés d'incidents (appel, données, SMS)
        - États différents (nouveau, en cours, résolu)
        - Gestion des clics sur incidents et clusters`,
      },
    },
  },
};

// Story complète
export const FullFeatured: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 12,
    sites: sampleSites,
    incidents: sampleIncidents,
    onSiteClick: (site) => {
      console.log('Site cliqué:', site);
      alert(`Site: ${site.name} (${site.status})`);
    },
    onIncidentClick: (incident) => {
      console.log('Incident cliqué:', incident);
      alert(`Incident: ${incident.description} (${incident.type})`);
    },
    onClusterClick: (incidents) => {
      console.log('Cluster cliqué:', incidents);
      alert(`Groupe de ${incidents.length} incidents dans cette zone`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Démonstration complète :
        - Sites avec différents statuts et couvertures
        - Clustering d'incidents
        - Gestion des clics sur sites, incidents et clusters
        - Contrôles de carte (zoom, type de vue)
        - Popups d'information détaillée`,
      },
    },
  },
};
