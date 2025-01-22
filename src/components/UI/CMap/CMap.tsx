import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet.heat';

interface MarkerData {
  position: [number, number];
  title: string;
  description: string;
  isMobileStation?: boolean;
  problemType?: 'low' | 'medium' | 'high';
  color?: string;
}

interface CMapProps {
  center: [number, number];
  zoom: number;
  markers?: MarkerData[];
  height?: string;
  showHeatmap?: boolean;
  heatmapData?: Array<[number, number, number]>; // [lat, lng, intensity]
}

const triangleIcon = L.divIcon({
  html: '▲',
  className: 'triangle-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 20],
});

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const createProblemIcon = (color: string) =>
  L.divIcon({
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
    className: 'problem-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

const getMarkerIcon = (marker: MarkerData) => {
  if (marker.problemType) {
    const colors = {
      low: '#FFC107', // Jaune
      medium: '#FF9800', // Orange
      high: '#F44336', // Rouge
    };

    return createProblemIcon(marker.color || colors[marker.problemType]);
  }

  return marker.isMobileStation ? triangleIcon : defaultIcon;
};

const CMap: React.FC<CMapProps> = ({
  center,
  zoom,
  markers = [],
  height = '500px',
  showHeatmap = false,
  heatmapData = [],
}) => {
  const [isSatellite, setIsSatellite] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
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

  useEffect(() => {
    if (showHeatmap && heatmapData.length > 0 && mapRef.current) {
      const map = mapRef.current;
      const heat = L.heatLayer(heatmapData, {
        radius: 25,
        blur: 15,
        maxZoom: zoom,
        max: 1.0,
        gradient: {
          0.4: 'blue',
          0.6: 'lime',
          0.8: 'yellow',
          1.0: 'red',
        },
      }).addTo(map);

      return () => {
        map.removeLayer(heat);
      };
    }
  }, [showHeatmap, heatmapData, zoom]);

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
        <MarkerClusterGroup chunkedLoading>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={getMarkerIcon(marker)}
              eventHandlers={{
                click: () => setSelectedMarker(marker),
              }}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {selectedMarker && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
          }}
        >
          <h3>{selectedMarker.title}</h3>
          <p>{selectedMarker.description}</p>
          <button
            onClick={() => setSelectedMarker(null)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default CMap;
