// src/components/map/Clusters/index.tsx

import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import './Clusters.css';

// Types
interface Incident {
  id: string;
  position: [number, number];
  type: 'call' | 'data' | 'sms' | 'other';
  status: 'new' | 'processing' | 'resolved';
  timestamp: string;
  description: string;
}

interface ClustersProps {
  incidents: Incident[];
  onClusterClick?: (incidents: Incident[]) => void;
  onIncidentClick?: (incident: Incident) => void;
}

// Styles pour les clusters
const getClusterColor = (count: number): string => {
  if (count < 10) return '#2196f3'; // Bleu
  if (count < 50) return '#ff9800'; // Orange

  return '#f44336'; // Rouge
};

export const Clusters: FC<ClustersProps> = ({
  incidents,
  onClusterClick,
  onIncidentClick,
}) => {
  const map = useMap();

  useEffect(() => {
    // Création du groupe de clusters
    const markerClusterGroup = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        const color = getClusterColor(count);

        return L.divIcon({
          html: `
            <div 
              class="cluster-marker" 
              style="background-color: ${color}"
            >
              ${count}
            </div>
          `,
          className: 'custom-cluster-icon',
          iconSize: L.point(40, 40),
        });
      },
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    // Ajout des marqueurs d'incidents
    incidents.forEach((incident) => {
      const marker = L.marker(incident.position, {
        icon: L.divIcon({
          html: `
            <div class="incident-marker ${incident.status}">
              <div class="incident-dot"></div>
            </div>
          `,
          className: 'custom-incident-icon',
          iconSize: L.point(20, 20),
        }),
      });

      // Gestion des événements de clic
      marker.on('click', () => {
        onIncidentClick?.(incident);
      });

      markerClusterGroup.addLayer(marker);
    });

    // Gestion du clic sur un cluster
    markerClusterGroup.on('clusterclick', (event) => {
      const clusterMarkers = event.layer.getAllChildMarkers();
      const clusterIncidents = clusterMarkers
        .map((marker) => {
          const position = marker.getLatLng();

          return incidents.find(
            (incident) =>
              incident.position[0] === position.lat &&
              incident.position[1] === position.lng,
          );
        })
        .filter((incident): incident is Incident => incident !== undefined);

      onClusterClick?.(clusterIncidents);
    });

    // Ajout du groupe de clusters à la carte
    map.addLayer(markerClusterGroup);

    // Nettoyage lors du démontage
    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [incidents, map, onClusterClick, onIncidentClick]);

  return null;
};
