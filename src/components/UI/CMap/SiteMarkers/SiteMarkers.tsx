// src/components/map/SiteMarkers/index.tsx

import { FC, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Box, Typography, Chip } from '@mui/material';

// Types
export interface Site {
  id: string;
  position: [number, number];
  name: string;
  status: 'active' | 'warning' | 'error' | 'maintenance';
  coverage: {
    angle: number;
    radius: number;
  };
  lastUpdate: string;
}

interface SiteMarkersProps {
  sites: Site[];
  // eslint-disable-next-line no-unused-vars
  onSiteClick?: (site: Site) => void;
}

// Création de l'icône personnalisée pour les sites
const createSiteIcon = (status: Site['status'], angle: number) =>
  L.divIcon({
    className: 'site-marker',
    html: `
      <div 
        class="site-triangle ${status}"
        style="transform: rotate(${angle}deg)"
      ></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

export const SiteMarkers: FC<SiteMarkersProps> = ({ sites, onSiteClick }) => {
  // Styles pour les triangles (à ajouter dans votre CSS)
  useEffect(() => {
    const style = document.createElement('style');

    style.textContent = `
      .site-marker {
        width: 20px;
        height: 20px;
        position: relative;
      }

      .site-triangle {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 17.3px solid #666;
        transition: transform 0.3s ease;
      }

      .site-triangle:hover {
        transform: scale(1.2) !important;
      }

      .site-triangle.active { 
        border-bottom-color: #4caf50;
      }

      .site-triangle.warning { 
        border-bottom-color: #ff9800;
      }

      .site-triangle.error { 
        border-bottom-color: #f44336;
      }

      .site-triangle.maintenance { 
        border-bottom-color: #9e9e9e;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={site.position}
          icon={createSiteIcon(site.status, site.coverage.angle)}
          eventHandlers={{
            click: () => onSiteClick?.(site),
          }}
        >
          <Popup>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {site.name}
              </Typography>

              <Box mt={1}>
                <Chip
                  size="small"
                  label={site.status.toUpperCase()}
                  color={
                    site.status === 'active'
                      ? 'success'
                      : site.status === 'warning'
                        ? 'warning'
                        : site.status === 'error'
                          ? 'error'
                          : 'default'
                  }
                />
              </Box>

              <Box mt={1}>
                <Typography variant="body2">
                  Couverture: {site.coverage.radius}km
                </Typography>
                <Typography variant="body2">
                  Dernière mise à jour:{' '}
                  {new Date(site.lastUpdate).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Popup>
        </Marker>
      ))}
    </>
  );
};
