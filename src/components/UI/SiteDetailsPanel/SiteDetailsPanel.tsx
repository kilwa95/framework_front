import { FC } from 'react';
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Divider,
  Chip,
  Button,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Site } from '../CMap/SiteMarkers/SiteMarkers';

interface SiteDetailsPanelProps {
  site: Site | null;
  onClose: () => void;
}

export const SiteDetailsPanel: FC<SiteDetailsPanelProps> = ({
  site,
  onClose,
}) => {
  if (!site) return null;

  return (
    <Drawer
      anchor="right"
      open={Boolean(site)}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          padding: 3,
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Détails du site</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Informations principales */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {site.name}
          </Typography>
          <Chip
            label={site.status}
            color={
              site.status === 'active'
                ? 'success'
                : site.status === 'warning'
                  ? 'warning'
                  : 'error'
            }
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Localisation */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Localisation
          </Typography>
          <Typography>
            {site.address?.street}
            <br />
            {site.address?.postalCode} {site.address?.city}
          </Typography>
        </Box>

        {/* Couverture */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Couverture
          </Typography>
          <Typography>Rayon: {site.coverage.radius} km</Typography>
          <Typography>Angle: {site.coverage.angle}°</Typography>
        </Box>

        {/* Ticket associé */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Ticket associé
          </Typography>
          <Link
            href={`/tickets/${site.ticket?.id}`}
            sx={{ textDecoration: 'none' }}
          >
            <Button
              variant="outlined"
              size="small"
              startIcon={<AssignmentIcon />}
              sx={{ mt: 1 }}
            >
              Voir le ticket #{site.ticket?.id}
            </Button>
          </Link>
        </Box>

        {/* Dernière mise à jour */}
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            Dernière mise à jour: {new Date(site.lastUpdate).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};
