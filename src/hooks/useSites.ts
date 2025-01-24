import { useState, useEffect } from 'react';
import { Site } from '../components/UI/CMap/SiteMarkers/SiteMarkers';
import { Ticket } from '../pages/NetworkSites/Ticket';
import { transformTicketToSite } from '../services/siteService';

export const useSites = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_JSON_SERVER_URL}/tickets`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const transformedSites = data
          .filter((ticket: Ticket) => ticket.AffectedSiteCodes)
          .map(transformTicketToSite);

        setSites(transformedSites);
      } catch (err) {
        console.log('err', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Erreur lors du chargement des sites'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return { sites, loading, error };
};
