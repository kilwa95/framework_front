// src/components/map/MapContainer/index.tsx

import { FC, useState } from 'react';
import { Paper, useTheme } from '@mui/material';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { styles } from './styles';

// Types
interface MapContainerProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
}

// Constantes
const DEFAULT_CENTER: [number, number] = [46.227638, 2.213749]; // Centre de la France
const DEFAULT_ZOOM = 6;
const TILE_LAYER = {
  STANDARD: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  SATELLITE:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

export const MapContainer: FC<MapContainerProps> = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className = '',
}) => {
  // États
  const theme = useTheme();
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');

  return (
    <Paper
      elevation={3}
      className={`relative ${className}`}
      sx={styles(theme).mapContainer}
    >
      <button
        onClick={() =>
          setMapType((prev) => (prev === 'standard' ? 'satellite' : 'standard'))
        }
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          padding: '8px',
          backgroundColor: 'white',
          border: '2px solid rgba(0,0,0,0.2)',
          borderRadius: '4px',
        }}
      >
        {mapType === 'standard' ? 'Vue Satellite' : 'Vue Standard'}
      </button>
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        style={styles(theme).map}
      >
        {/* Fond de carte */}
        <TileLayer
          url={
            mapType === 'standard' ? TILE_LAYER.STANDARD : TILE_LAYER.SATELLITE
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Contrôle de zoom */}
        <ZoomControl position="topright" />

        {/* Emplacement pour les futurs composants */}
        {/* <Clusters /> */}
        {/* <SiteMarkers /> */}
        {/* <MapControls onMapTypeChange={setMapType} /> */}
        {/* <MapLegend /> */}
      </LeafletMapContainer>
    </Paper>
  );
};

// Styles pour corriger les icônes Leaflet
// À ajouter dans votre fichier CSS global
/*
.leaflet-default-icon-path {
  background-image: url(https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png);
}
*/
