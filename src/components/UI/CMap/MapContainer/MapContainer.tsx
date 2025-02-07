/* eslint-disable no-unused-vars */
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
import { MapLegend } from '../MapLegend/MapLegend';
import { SiteMarkers } from '../SiteMarkers/SiteMarkers';
import { Clusters } from '../Clusters/Clusters';
import type { Site } from '../SiteMarkers/SiteMarkers';
import { ComplaintMarkers } from '../ComplaintMarkers/ComplaintMarkers';
import { Complaint } from 'src/pages/NetworkSites/Ticket';

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
  complaints?: Complaint[];
  incidents?: Incident[];
  onSiteClick?: (site: Site) => void;
  onComplaintClick?: (complaint: Complaint) => void;
  onClusterClick?: (incidents: Incident[]) => void;
  onIncidentClick?: (incident: Incident) => void;
}

interface ClusterItem {
  id: string;
  position: [number, number];
  type: 'site' | 'complaint';
  status: string;
  data: Site | Complaint;
}

interface ClustersProps {
  sites: Site[];
  complaints: Complaint[];
  onSiteClick?: (site: Site) => void;
  onComplaintClick?: (complaint: Complaint) => void;
  onClusterClick?: (items: ClusterItem[]) => void;
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
  complaints = [],
  incidents = [],
  onSiteClick,
  onComplaintClick,
  onClusterClick,
  onIncidentClick,
}) => {
  // États
  const theme = useTheme();
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const mapRef = useRef(null);

  return (
    <Paper
      elevation={3}
      className={`relative ${className}`}
      sx={styles(theme).mapContainer}
    >
      {/* Légende de la carte */}
      <MapLegend />

      {/* Conteneur de la carte */}
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
        {(sites.length > 0 || complaints.length > 0) && (
          <Clusters
            sites={sites}
            complaints={complaints}
            onSiteClick={onSiteClick}
            onComplaintClick={onComplaintClick}
            // onClusterClick={(items) => {
            //   const sitesInCluster = items
            //     .filter(
            //       (item): item is ClusterItem & { data: Site } =>
            //         item.type === 'site'
            //     )
            //     .map((item) => item.data);

            //   const complaintsInCluster = items
            //     .filter(
            //       (item): item is ClusterItem & { data: Complaint } =>
            //         item.type === 'complaint'
            //     )
            //     .map((item) => item.data);

            //   // Appeler le handler approprié selon le contenu du cluster
            //   if (sitesInCluster.length > 0 && onSiteClick) {
            //     sitesInCluster.forEach(onSiteClick);
            //   }
            //   if (complaintsInCluster.length > 0 && onComplaintClick) {
            //     complaintsInCluster.forEach(onComplaintClick);
            //   }
            //   if (onClusterClick) {
            //     onClusterClick([...sitesInCluster, ...complaintsInCluster]);
            //   }
            // }}
          />
        )}

        {/* Marqueurs de sites */}
        <SiteMarkers sites={sites} onSiteClick={onSiteClick} />

        {/* Marqueurs de plaintes */}
        <ComplaintMarkers
          complaints={complaints}
          onComplaintClick={onComplaintClick}
        />
      </LeafletMapContainer>
    </Paper>
  );
};
