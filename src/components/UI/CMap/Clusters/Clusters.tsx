// src/components/map/Clusters/index.tsx

import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import './Clusters.css';
import { Site } from '../SiteMarkers/SiteMarkers';
import { Complaint } from 'src/pages/NetworkSites/Ticket';

// Types
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

// Styles pour les clusters
const getClusterColor = (items: ClusterItem[]): string => {
  const hasError = items.some(
    (item) => item.status === 'error' || item.status === 'pending'
  );
  const hasWarning = items.some(
    (item) => item.status === 'warning' || item.status === 'processing'
  );

  if (hasError) return '#f44336';
  if (hasWarning) return '#ff9800';
  return '#4caf50';
};

export const Clusters: FC<ClustersProps> = ({
  sites,
  complaints,
  onSiteClick,
  onComplaintClick,
  onClusterClick,
}) => {
  const map = useMap();

  useEffect(() => {
    const markerClusterGroup = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        const clusterItems = cluster
          .getAllChildMarkers()
          .map((marker) => marker.options.itemData);
        const color = getClusterColor(clusterItems);
        const count = cluster.getChildCount();

        return L.divIcon({
          html: `
            <div class="cluster-marker" style="background-color: ${color}">
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

    // Ajouter les marqueurs de sites
    sites.forEach((site) => {
      const itemData: ClusterItem = {
        id: site.id,
        position: site.position,
        type: 'site',
        status: site.status,
        data: site,
      };

      const marker = L.marker(site.position, {
        icon: L.divIcon({
          html: `<div class="site-marker ${site.status}"></div>`,
          className: 'custom-site-icon',
          iconSize: L.point(25, 25),
        }),
        itemData,
      });

      marker.on('click', () => onSiteClick?.(site));
      markerClusterGroup.addLayer(marker);
    });

    // Ajouter les marqueurs de plaintes
    complaints.forEach((complaint) => {
      const itemData: ClusterItem = {
        id: complaint.id,
        position: complaint.position,
        type: 'complaint',
        status: complaint.status,
        data: complaint,
      };

      const marker = L.marker(complaint.position, {
        icon: L.divIcon({
          html: `<div class="complaint-marker ${complaint.status}"></div>`,
          className: 'custom-complaint-icon',
          iconSize: L.point(20, 20),
        }),
        itemData,
      });

      marker.on('click', () => onComplaintClick?.(complaint));
      markerClusterGroup.addLayer(marker);
    });

    // Gestion du clic sur un cluster
    markerClusterGroup.on('clusterclick', (event) => {
      const clusterItems = event.layer
        .getAllChildMarkers()
        .map((marker) => marker.options.itemData);

      onClusterClick?.(clusterItems);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [sites, complaints, map, onSiteClick, onComplaintClick, onClusterClick]);

  return null;
};
