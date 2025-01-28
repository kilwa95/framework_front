import { FC } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Button,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Complaint } from '../../../../pages/NetworkSites/Ticket';

interface ComplaintDetailsProps {
  complaint: Complaint | null;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'error';
    case 'processing':
      return 'warning';
    case 'resolved':
      return 'success';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return 'En attente';
    case 'processing':
      return 'En cours';
    case 'resolved':
      return 'Résolu';
    default:
      return status;
  }
};

export const ComplaintDetails: FC<ComplaintDetailsProps> = ({
  complaint,
  onClose,
}) => {
  if (!complaint) return null;

  return (
    <Drawer
      anchor="right"
      open={Boolean(complaint)}
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
          <Typography variant="h6">Détails de la plainte</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Informations principales */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Ticket #{complaint.ticketId}
          </Typography>
          <Chip
            label={getStatusLabel(complaint.status)}
            color={getStatusColor(complaint.status)}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Nombre de plaintes */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Nombre de plaintes à cette position
          </Typography>
          <Typography variant="h4" color="primary">
            {complaint.count}
          </Typography>
        </Box>

        {/* Localisation */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Coordonnées
          </Typography>
          <Typography>
            Lat: {complaint.position[0].toFixed(6)}
            <br />
            Lng: {complaint.position[1].toFixed(6)}
          </Typography>
        </Box>

        {/* Lien vers le ticket */}
        <Box>
          <Link
            href={`/tickets/${complaint.ticketId}`}
            sx={{ textDecoration: 'none' }}
          >
            <Button
              variant="outlined"
              size="small"
              startIcon={<AssignmentIcon />}
              sx={{ mt: 1 }}
            >
              Voir le ticket complet
            </Button>
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
};
