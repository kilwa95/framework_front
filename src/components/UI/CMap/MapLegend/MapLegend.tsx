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

export const MapLegend: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState<'sites' | 'coverage'>(
    'sites',
  );

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        zIndex: 1000,
        maxWidth: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        py={1}
      >
        <Typography variant="subtitle2" fontWeight="bold">
          Légende
        </Typography>
        <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* Content */}
      <Collapse in={isExpanded}>
        <Box p={2}>
          {/* Tabs */}
          <Box display="flex" gap={1} mb={2}>
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                fontWeight: activeSection === 'sites' ? 'bold' : 'normal',
                textDecoration:
                  activeSection === 'sites' ? 'underline' : 'none',
              }}
              onClick={() => setActiveSection('sites')}
            >
              Sites mobiles
            </Typography>
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                fontWeight: activeSection === 'coverage' ? 'bold' : 'normal',
                textDecoration:
                  activeSection === 'coverage' ? 'underline' : 'none',
              }}
              onClick={() => setActiveSection('coverage')}
            >
              Couverture
            </Typography>
          </Box>

          {/* Sites Legend */}
          {activeSection === 'sites' && (
            <List dense>
              {SITE_STATUSES.map((item) => (
                <Tooltip
                  key={item.label}
                  title={item.description || ''}
                  placement="right"
                >
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          )}

          {/* Coverage Legend */}
          {activeSection === 'coverage' && (
            <List dense>
              {COVERAGE_LEVELS.map((item) => (
                <ListItem key={item.label}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <SignalIcon sx={{ color: item.color }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};
