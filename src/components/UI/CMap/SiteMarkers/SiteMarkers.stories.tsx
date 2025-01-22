import type { Meta, StoryObj } from '@storybook/react';
import { SiteMarkers } from './SiteMarkers';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Map/SiteMarkers',
  component: SiteMarkers,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '500px', width: '100%' }}>
        <MapContainer
          center={[48.8566, 2.3522]} // Paris coordinates
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Story />
        </MapContainer>
      </Box>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SiteMarkers>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample sites data
const sampleSites = [
  {
    id: '1',
    position: [48.8566, 2.3522], // Paris center
    name: 'Site Paris Centre',
    status: 'active',
    coverage: { angle: 45, radius: 10 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '2',
    position: [48.85, 2.4], // Paris East
    name: 'Site Paris Est',
    status: 'warning',
    coverage: { angle: 180, radius: 5 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '3',
    position: [48.86, 2.3], // Paris North
    name: 'Site Paris Nord',
    status: 'error',
    coverage: { angle: 270, radius: 8 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '4',
    position: [48.84, 2.35], // Paris South
    name: 'Site Maintenance',
    status: 'maintenance',
    coverage: { angle: 90, radius: 15 },
    lastUpdate: new Date().toISOString(),
  },
] as const;

// Default story with all site types
export const Default: Story = {
  args: {
    sites: sampleSites,
    onSiteClick: fn(),
  },
};

// Story with single site
export const SingleSite: Story = {
  args: {
    sites: [sampleSites[0]],
    onSiteClick: fn(),
  },
};

// Story with click handling
export const WithClickHandling: Story = {
  args: {
    sites: sampleSites,
    onSiteClick: (site) => {
      console.log('Site clicked:', site);
      alert(`Clicked on site: ${site.name}`);
    },
  },
};

// Story showing different status types
export const DifferentStatuses: Story = {
  args: {
    sites: [
      {
        id: '1',
        position: [48.86, 2.34],
        name: 'Active Site',
        status: 'active',
        coverage: { angle: 45, radius: 10 },
        lastUpdate: new Date().toISOString(),
      },
      {
        id: '2',
        position: [48.85, 2.34],
        name: 'Warning Site',
        status: 'warning',
        coverage: { angle: 45, radius: 10 },
        lastUpdate: new Date().toISOString(),
      },
      {
        id: '3',
        position: [48.84, 2.34],
        name: 'Error Site',
        status: 'error',
        coverage: { angle: 45, radius: 10 },
        lastUpdate: new Date().toISOString(),
      },
      {
        id: '4',
        position: [48.83, 2.34],
        name: 'Maintenance Site',
        status: 'maintenance',
        coverage: { angle: 45, radius: 10 },
        lastUpdate: new Date().toISOString(),
      },
    ],
    onSiteClick: fn(),
  },
};
