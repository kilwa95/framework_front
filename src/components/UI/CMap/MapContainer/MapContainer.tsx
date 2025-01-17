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
import { SiteMarkers } from '../SiteMarkers/SiteMarkers';
import { Clusters } from '../Clusters/Clusters';
import type { Site } from '../SiteMarkers/SiteMarkers';

// Types
interface Incident {
  id: string;
  position: [number, number];
  type: 'call' | 'data' | 'sms' | 'other';
  status: 'new' | 'processing' | 'resolved';
  timestamp: string;
  description: string;
}

interface MapContainerProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  sites?: Site[];
  incidents?: Incident[];
  // eslint-disable-next-line no-unused-vars
  onSiteClick?: (site: Site) => void;
  // eslint-disable-next-line no-unused-vars
  onIncidentClick?: (incident: Incident) => void;
  // eslint-disable-next-line no-unused-vars
  onClusterClick?: (incidents: Incident[]) => void;
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
  sites = [],
  incidents = [],
  onSiteClick,
  onIncidentClick,
  onClusterClick,
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

        {/* Clusters d'incidents */}
        <Clusters
          incidents={incidents}
          onClusterClick={onClusterClick}
          onIncidentClick={onIncidentClick}
        />

        {/* Marqueurs de sites */}
        <SiteMarkers sites={sites} onSiteClick={onSiteClick} />
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
