import { FC, useEffect } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { Complaint } from '../../../../pages/NetworkSites/Ticket';

interface ComplaintMarkersProps {
  complaints: Complaint[];
  onComplaintClick?: (complaint: Complaint) => void;
}

export const ComplaintMarkers: FC<ComplaintMarkersProps> = ({
  complaints,
  onComplaintClick,
}) => {
  useEffect(() => {
    const style = document.createElement('style');

    style.textContent = `
      .complaint-marker {
        background: none;
        border: none;
      }

      .complaint-circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        border: 2px solid white;
        transition: transform 0.3s ease;
      }

      .complaint-circle:hover {
        transform: scale(1.2);
        cursor: pointer;
      }

      .complaint-circle.pending { 
        background-color: #f44336;
      }

      .complaint-circle.processing { 
        background-color: #ff9800;
      }

      .complaint-circle.resolved { 
        background-color: #4caf50;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {complaints.map((complaint) => (
        <Marker
          key={complaint.id}
          position={complaint.position}
          icon={L.divIcon({
            className: 'complaint-marker',
            html: `<div class="complaint-circle ${complaint.status}">${complaint.count}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })}
          eventHandlers={{
            click: () => onComplaintClick?.(complaint),
          }}
        />
      ))}
    </>
  );
};
