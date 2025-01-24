import { Site } from '../components/UI/CMap/SiteMarkers/SiteMarkers';
import { Ticket } from '../pages/NetworkSites/Ticket';

export const transformTicketToSite = (ticket: Ticket): Site => {
  // Centre approximatif de la France
  const defaultPosition: [number, number] = [46.603354, 1.888334]; // Centre de la France

  return {
    id: ticket.TicketID,
    position: defaultPosition,
    name: `Site ${ticket.AffectedSiteCodes}`,
    status: determineStatus(ticket),
    coverage: {
      angle: 360,
      radius: 5,
    },
    lastUpdate: ticket.LastVerificationDate || ticket.AssignmentDate,
  };
};

const determineStatus = (ticket: Ticket): Site['status'] => {
  switch (ticket.Status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'to analyze':
    case 'to process':
      return 'error';
    default:
      return 'active';
  }
};
