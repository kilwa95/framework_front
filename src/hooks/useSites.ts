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
        const response = await fetch('http://localhost:3001/tickets');
        const data = await response.json();
        const { tickets } = data;

        const transformedSites = tickets
          .filter((ticket: Ticket) => ticket.AffectedSiteCodes)
          .map(transformTicketToSite);

        setSites(transformedSites);
      } catch (err) {
        setError('Erreur lors du chargement des sites');
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return { sites, loading, error };
};
