import { FC, useState, useMemo, useEffect } from 'react';
import { Box, CircularProgress, Alert, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { MapContainer } from '../../components/UI/CMap/MapContainer/MapContainer';
import { useSites } from '../../hooks/useSites';
import { Site } from '../../components/UI/CMap/SiteMarkers/SiteMarkers';
import dayjs from 'dayjs';
import { ComplaintDetails } from '../../components/UI/CMap/ComplaintDetails/ComplaintDetails';
import { SiteFilters } from './types';
import { SiteDetailsPanel } from '../../components/UI/SiteDetailsPanel/SiteDetailsPanel';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel';

// Constante pour la clé de stockage
const FILTER_STORAGE_KEY = 'networkSites.filters';

const filterButtonStyle = {
  position: 'absolute',
  top: 16,
  left: 16,
  zIndex: 1000,
  backgroundColor: 'background.paper',
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

const NetworkSites: FC = () => {
  const { sites, complaints, loading, error } = useSites();

  console.log('complaints', complaints[0]);
  console.log('sites', sites[0]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initialiser les filtres depuis le localStorage
  const [filters, setFilters] = useState<SiteFilters>(() => {
    const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);

    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);

      return {
        ...parsedFilters,
        incidentStartDate: parsedFilters.incidentStartDate.map(
          (date: string | null) => (date ? dayjs(date) : null)
        ),
      };
    }

    return {
      status: [],
      problemFamily: [],
      incidentStartDate: [null, null],
      postalCode: '',
      searchText: '',
    };
  });

  // Sauvegarder les filtres dans le localStorage à chaque modification
  useEffect(() => {
    const filtersToSave = {
      ...filters,
      incidentStartDate: filters.incidentStartDate.map((date) =>
        date ? date.toISOString() : null
      ),
    };

    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filtersToSave));
  }, [filters]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      status: [],
      problemFamily: [],
      incidentStartDate: [null, null],
      postalCode: '',
      searchText: '',
    });
    localStorage.removeItem(FILTER_STORAGE_KEY);
  };

  // Filtrer les sites en fonction des critères
  const filteredSites = useMemo(() => {
    if (!sites) return [];

    return sites.filter((site) => {
      if (
        filters.searchText &&
        !site.name.toLowerCase().includes(filters.searchText.toLowerCase())
      ) {
        return false;
      }

      if (filters.status.length > 0 && !filters.status.includes(site.status)) {
        return false;
      }

      if (filters.postalCode && site.postalCode !== filters.postalCode) {
        return false;
      }

      const [startDate, endDate] = filters.incidentStartDate;

      if (startDate && endDate) {
        const siteDate = dayjs(site.lastUpdate);

        if (!siteDate.isBetween(startDate, endDate, 'day', '[]')) {
          return false;
        }
      }

      return true;
    });
  }, [sites, filters]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', width: '100%', p: 2, position: 'relative' }}>
      <IconButton onClick={() => setIsFilterOpen(true)} sx={filterButtonStyle}>
        <FilterListIcon />
      </IconButton>

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />

      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        sites={filteredSites}
        complaints={complaints}
        onSiteClick={(site) => {
          setSelectedSite(site);
          setSelectedComplaint(null);
        }}
        onComplaintClick={(complaint) => {
          setSelectedComplaint(complaint);
          setSelectedSite(null);
        }}
      />

      <SiteDetailsPanel
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
      />

      <ComplaintDetails
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </Box>
  );
};

export default NetworkSites;
