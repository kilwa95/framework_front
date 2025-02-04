import { Site } from '../components/UI/CMap/SiteMarkers/SiteMarkers';
import { Ticket } from '../pages/NetworkSites/Ticket';
import { Complaint } from '../pages/NetworkSites/Ticket';

export const transformTicketToSite = async (
  ticket: Ticket
): Promise<{ site: Site; complaint: Complaint }> => {
  // Centre approximatif de la France

  const position = await geocodeSite(ticket);

  const site = {
    id: ticket.AffectedSiteCodes,
    position: position,
    name: `Site ${ticket.AffectedSiteCodes}`,
    status: determineStatus(ticket),
    coverage: {
      angle: 360,
      radius: 5,
    },
    lastUpdate: ticket.LastVerificationDate || ticket.AssignmentDate,
    address: {
      street: ticket.StreetAddress,
      postalCode: ticket.PostalCode,
      city: ticket.City,
    },
    ticket: {
      id: ticket.TicketID,
      problemFamily: ticket.ProblemFamily,
      problemSubFamily: ticket.ProblemSubFamily,
      responsible: ticket.Responsible,
      creationDate: ticket.CreationDate,
      status: ticket.Status,
    },
  };

  const complaint = {
    id: `complaint-${ticket.TicketID}`,
    position: position,
    ticketId: ticket.TicketID,
    status: determineComplaintStatus(ticket.Status),
    linkedTicket: ticket.LinkedTicket,
    creationDate: ticket.CreationDate,
    problemFamily: ticket.ProblemFamily,
    problemSubFamily: ticket.ProblemSubFamily,
    customer: ticket.Customer,
    incidentStartDate: ticket.IncidentStartDate,
    address: {
      street: ticket.StreetAddress,
      postalCode: ticket.PostalCode,
      city: ticket.City,
    },
    responsible: ticket.Responsible,
  };

  return { site, complaint };
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

const determineComplaintStatus = (
  status: string
): 'pending' | 'processing' | 'resolved' => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'pending';
    case 'to analyze':
    case 'to process':
      return 'processing';
    default:
      return 'resolved';
  }
};

export const geocodeSite = async (
  ticket: Ticket
): Promise<[number, number]> => {
  const defaultPosition: [number, number] = [46.603354, 1.888334]; // Centre de la France

  try {
    const address = `${ticket.StreetAddress}, ${ticket.PostalCode} ${ticket.City}, France`;

    // Utilisation de l'API Photon qui est basée sur OpenStreetMap
    const response = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`
    );

    if (!response.ok) {
      throw new Error('Erreur lors du géocodage');
    }

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const { coordinates } = data.features[0].geometry;

      // Photon renvoie les coordonnées dans l'ordre [lon, lat], nous devons les inverser
      return [coordinates[1], coordinates[0]];
    }

    return defaultPosition;
  } catch (error) {
    console.error('Erreur de géocodage:', error);

    return defaultPosition;
  }
};
