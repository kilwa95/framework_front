interface Ticket {
  TicketID: string;
  UnreadMessages: string;
  CreationDate: string;
  AssignmentDate: string;
  Origin: string;
  Email: string;
  ProblemFamily: string;
  ProblemSubFamily: string;
  Customer: string | number;
  Contact: string | number;
  IncidentStartDate: string;
  PostalCode: number;
  City: string;
  StreetAddress: string;
  BayID: string;
  Status: string;
  AffectedSiteCodes: string;
  AffectedControllers: string | number;
  LinkedTicket: string;
  ProjectType: string;
  AnalysisStatus: string;
  LastVerificationDate: string;
  ClosingDate: string;
  Responsible: string;
  RootCause: string;
}

export type { Ticket };
