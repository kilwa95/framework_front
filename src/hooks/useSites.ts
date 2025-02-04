import { useState, useEffect } from 'react';
import { Site } from '../components/UI/CMap/SiteMarkers/SiteMarkers';
import { Ticket, Complaint } from '../pages/NetworkSites/Ticket';
import { transformTicketToSite } from '../services/siteService';

export const useSites = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_JSON_SERVER_URL}/tickets`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const transformedData = await Promise.all(
          data
            .filter((ticket: Ticket) => ticket.AffectedSiteCodes)
            .map(transformTicketToSite),
        );

        // Séparer les sites et les plaintes
        const sitesData = transformedData.map((item) => item.site);
        const complaintsData = transformedData.map((item) => item.complaint);

        // Regrouper les plaintes par position
        const groupedComplaints = complaintsData.reduce(
          (acc, complaint) => {
            const key = `${complaint.position[0]},${complaint.position[1]}`;

            if (!acc[key]) {
              acc[key] = {
                ...complaint,
                count: 1,
              };
            } else {
              acc[key].count += 1;
            }

            return acc;
          },
          {} as Record<string, Complaint & { count: number }>,
        );

        setSites(sitesData);
        setComplaints(Object.values(groupedComplaints));
      } catch (err) {
        console.error('Error fetching sites:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Erreur lors du chargement des sites',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return { sites, complaints, loading, error };
};
