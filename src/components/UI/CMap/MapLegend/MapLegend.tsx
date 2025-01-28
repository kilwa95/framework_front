import { FC, useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Divider,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Circle as CircleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Build as BuildIcon,
  SignalCellular4Bar as SignalIcon,
} from '@mui/icons-material';

interface LegendItem {
  label: string;
  color: string;
  icon?: JSX.Element;
  description?: string;
}

const SITE_STATUSES: LegendItem[] = [
  {
    label: 'Site actif',
    color: '#4caf50',
    icon: <CheckCircleIcon sx={{ color: '#4caf50' }} />,
    description: 'Site mobile fonctionnant normalement',
  },
  {
    label: 'Site en alerte',
    color: '#ff9800',
    icon: <WarningIcon sx={{ color: '#ff9800' }} />,
    description: 'Site présentant des anomalies',
  },
  {
    label: 'Site en panne',
    color: '#f44336',
    icon: <CircleIcon sx={{ color: '#f44336' }} />,
    description: 'Site non fonctionnel',
  },
  {
    label: 'Maintenance',
    color: '#9e9e9e',
    icon: <BuildIcon sx={{ color: '#9e9e9e' }} />,
    description: 'Site en maintenance programmée',
  },
];

const COVERAGE_LEVELS: LegendItem[] = [
  { label: 'Optimal', color: '#ff0000' },
  { label: 'Très bon', color: '#ff9800' },
  { label: 'Passable', color: '#ffeb3b' },
  { label: 'Mauvais', color: '#4caf50' },
  { label: 'Très mauvais', color: '#2196f3' },
];

const COMPLAINT_STATUSES: LegendItem[] = [
  {
    label: 'Plainte en attente',
    color: '#f44336',
    icon: <CircleIcon sx={{ color: '#f44336' }} />,
    description: 'Plainte non traitée',
  },
  {
    label: 'Plainte en cours',
    color: '#ff9800',
    icon: <CircleIcon sx={{ color: '#ff9800' }} />,
    description: 'Plainte en cours de traitement',
  },
  {
    label: 'Plainte résolue',
    color: '#4caf50',
    icon: <CircleIcon sx={{ color: '#4caf50' }} />,
    description: 'Plainte traitée et résolue',
  },
];

export const MapLegend: FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Paper
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        minWidth: 200,
      }}
    >
      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1">Légende</Typography>
        <IconButton size="small" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Divider />
        <List dense>
          {/* Sites */}
          <ListItem>
            <Typography variant="subtitle2">Sites mobiles</Typography>
          </ListItem>
          {SITE_STATUSES.map((item) => (
            <ListItem key={item.label}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} secondary={item.description} />
            </ListItem>
          ))}

          {/* Plaintes */}
          <ListItem>
            <Typography variant="subtitle2">Plaintes</Typography>
          </ListItem>
          {COMPLAINT_STATUSES.map((item) => (
            <ListItem key={item.label}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} secondary={item.description} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
};
