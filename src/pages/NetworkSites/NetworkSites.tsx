import { FC, useState } from 'react';
import { Box, CircularProgress, Alert, Paper } from '@mui/material';
import { MapContainer } from '../../components/UI/CMap/MapContainer/MapContainer';
import { useSites } from '../../hooks/useSites';
import { Site } from '../../components/UI/CMap/SiteMarkers/SiteMarkers';

const NetworkSites: FC = () => {
  const { sites, loading, error } = useSites();
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  console.log('sites', sites);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', width: '100%', p: 2, position: 'relative' }}>
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        sites={sites}
        onSiteClick={(site) => {
          console.log('Site sélectionné:', site);
          setSelectedSite(site);
        }}
      />

      {selectedSite && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            p: 2,
            maxWidth: 300,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 1000,
          }}
        >
          <Box>
            <strong>{selectedSite.name}</strong>
            <p>Status: {selectedSite.status}</p>
            <p>Couverture: {selectedSite.coverage.radius}km</p>
            <p>
              Dernière mise à jour:
              {new Date(selectedSite.lastUpdate).toLocaleString()}
            </p>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default NetworkSites;
