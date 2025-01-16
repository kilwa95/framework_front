import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';

interface CMapProps {
  center: [number, number];
  zoom: number;
  children?: React.ReactNode;
  height?: string;
}

const CMap: React.FC<CMapProps> = ({
  center,
  zoom,
  children,
  height = '500px',
}) => {
  const [isSatellite, setIsSatellite] = useState(false);
  const mapRef = useRef(null);

  const mapStyles = {
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution:
        '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
    street: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  };

  const handleZoom = (type: 'in' | 'out') => {
    const map = mapRef.current;

    if (map) {
      if (type === 'in') {
        map.zoomIn();
      } else {
        map.zoomOut();
      }
    }
  };

  return (
    <div style={{ height: height, width: '100%' }}>
      <div style={{ position: 'relative', zIndex: 1000 }}>
        <button
          onClick={() => setIsSatellite(!isSatellite)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            padding: '8px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isSatellite ? 'Vue Plan' : 'Vue Satellite'}
        </button>

        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => handleZoom('in')}
            style={{
              padding: '8px',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '5px',
            }}
          >
            +
          </button>
          <button
            onClick={() => handleZoom('out')}
            style={{
              padding: '8px',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            -
          </button>
        </div>
      </div>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution={
            isSatellite
              ? mapStyles.satellite.attribution
              : mapStyles.street.attribution
          }
          url={isSatellite ? mapStyles.satellite.url : mapStyles.street.url}
        />
        <MarkerClusterGroup
          chunkedLoading
          onClick={(cluster) => {
            const map = mapRef.current;

            if (map) {
              const bounds = cluster.layer.getBounds();

              map.fitBounds(bounds);
            }
          }}
        >
          {children}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default CMap;
