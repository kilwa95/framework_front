interface Ticket {
  // Identifiant unique du ticket
  TicketID: string;
  // Nombre de messages non lus
  UnreadMessages: string;
  // Date de création du ticket
  CreationDate: string;
  // Date d'attribution du ticket
  AssignmentDate: string;
  // Origine du ticket
  Origin: string;
  // Adresse email du contact
  Email: string;
  // Catégorie principale du problème
  ProblemFamily: string;
  // Sous-catégorie du problème
  ProblemSubFamily: string;
  // Identifiant du client
  Customer: string | number;
  // Informations de contact
  Contact: string | number;
  // Date de début de l'incident
  IncidentStartDate: string;
  // Code postal du site
  PostalCode: number;
  // Ville du site
  City: string;
  // Adresse du site
  StreetAddress: string;
  // Identifiant de la baie
  BayID: string;
  // Statut actuel du ticket
  Status: string;
  // Codes des sites affectés
  AffectedSiteCodes: string;
  // Contrôleurs affectés
  AffectedControllers: string | number;
  // Ticket lié
  LinkedTicket: string;
  // Type de projet
  ProjectType: string;
  // Statut de l'analyse
  AnalysisStatus: string;
  // Date de dernière vérification
  LastVerificationDate: string;
  // Date de clôture
  ClosingDate: string;
  // Responsable du ticket
  Responsible: string;
  // Cause racine du problème
  RootCause: string;
}

interface Complaint {
  id: string;
  position: [number, number];
  ticketId: string;
  status: 'pending' | 'processing' | 'resolved';
  linkedTicket: string;
  creationDate: string;
  problemFamily: string;
  problemSubFamily: string;
  customer: string | number;
  incidentStartDate: string;
  address: {
    street: string;
    postalCode: number;
    city: string;
  };
  responsible: string;
}

export type { Ticket, Complaint };
