export interface SiteFilters {
  status: string[];
  problemFamily: string[];
  incidentStartDate: [Date | null, Date | null];
  postalCode: string;
  searchText: string;
}
