import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface CMapProps {
  center: [number, number];
  zoom: number;
  children?: React.ReactNode;
}

const CMap: React.FC<CMapProps> = ({ center, zoom, children }) => {
  const [isSatellite, setIsSatellite] = useState(false);

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

  return (
    <div style={{ height: '500px', width: '100%' }}>
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
      </div>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution={
            isSatellite
              ? mapStyles.satellite.attribution
              : mapStyles.street.attribution
          }
          url={isSatellite ? mapStyles.satellite.url : mapStyles.street.url}
        />
        {children}
      </MapContainer>
    </div>
  );
};

export default CMap;
