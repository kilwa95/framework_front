import { FC } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { MapContainer } from '../../components/UI/CMap/MapContainer/MapContainer';
import { useSites } from '../../hooks/useSites';

const NetworkSites: FC = () => {
  const { sites, loading, error } = useSites();

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
    <Box sx={{ height: '100vh', width: '100%', p: 2 }}>
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        sites={sites}
        onSiteClick={(site) => {
          console.log('Site sélectionné:', site);
          // TODO: Implémenter l'action au clic sur un site
        }}
      />
    </Box>
  );
};

export default NetworkSites;
