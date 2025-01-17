// src/components/map/MapContainer/index.tsx

import { FC, useState, useRef } from 'react';
import { Paper, useTheme } from '@mui/material';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { styles } from './styles';
import { MapControls } from '../MapControls/MapControls';

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
  const mapRef = useRef(null);

  // Gestionnaires d'événements pour les contrôles
  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleCenter = () => {
    mapRef.current?.setView(center, zoom);
  };

  return (
    <Paper
      elevation={3}
      className={`relative ${className}`}
      sx={styles(theme).mapContainer}
    >
      <MapControls
        mapType={mapType}
        onMapTypeChange={setMapType}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onCenter={handleCenter}
      />
      <LeafletMapContainer
        ref={mapRef}
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
