import { FC } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Map as MapIcon,
  Satellite as SatelliteIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  MyLocation as CenterIcon,
} from '@mui/icons-material';

interface MapControlsProps {
  mapType: 'standard' | 'satellite';
  // eslint-disable-next-line no-unused-vars
  onMapTypeChange: (type: 'standard' | 'satellite') => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onCenter?: () => void;
  className?: string;
}

export const MapControls: FC<MapControlsProps> = ({
  mapType,
  onMapTypeChange,
  onZoomIn,
  onZoomOut,
  onCenter,
  className = '',
}) => (
  <Paper
    elevation={3}
    className={`absolute top-4 right-4 z-[1000] ${className}`}
    sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(4px)',
    }}
  >
    {/* Contrôles de type de carte */}
    <Box p={1}>
      <ToggleButtonGroup
        value={mapType}
        exclusive
        onChange={(_, value) => value && onMapTypeChange(value)}
        size="small"
      >
        <ToggleButton value="standard">
          <Tooltip title="Vue standard">
            <MapIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="satellite">
          <Tooltip title="Vue satellite">
            <SatelliteIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>

    {/* Séparateur */}
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    />

    {/* Contrôles de zoom et centrage */}
    <Box p={1} display="flex" flexDirection="column" gap={1}>
      <Tooltip title="Zoom avant">
        <IconButton size="small" onClick={onZoomIn}>
          <ZoomInIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Zoom arrière">
        <IconButton size="small" onClick={onZoomOut}>
          <ZoomOutIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Centrer la carte">
        <IconButton size="small" onClick={onCenter}>
          <CenterIcon />
        </IconButton>
      </Tooltip>
    </Box>
  </Paper>
);
