import { FC, useState, useMemo, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
  Drawer,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { MapContainer } from '../../components/UI/CMap/MapContainer/MapContainer';
import { useSites } from '../../hooks/useSites';
import { Site } from '../../components/UI/CMap/SiteMarkers/SiteMarkers';
import CSearchbar from '../../components/UI/CSearchbar/CSearchbar';
import CSelect from '../../components/UI/CSelect/CSelect';
import FilterListIcon from '@mui/icons-material/FilterList';
import CTextField from '../../components/UI/CTextField/CTextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ComplaintDetails } from '../../components/UI/CMap/ComplaintDetails/ComplaintDetails';
import { SiteFilters } from './types';
import { SiteDetailsPanel } from '../../components/UI/SiteDetailsPanel/SiteDetailsPanel';

// Styles pour le panneau de filtres
const filterPanelStyles = {
  filterDrawer: {
    '& .MuiDrawer-paper': {
      width: 320,
      padding: 3,
      backgroundColor: 'background.paper',
      borderRight: '1px solid',
      borderColor: 'divider',
    },
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 2,
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  filterTitle: {
    fontWeight: 'bold',
    color: 'text.primary',
    mb: 1,
  },
  filterButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1000,
    backgroundColor: 'background.paper',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
};

// Constante pour la clé de stockage
const FILTER_STORAGE_KEY = 'networkSites.filters';

const NetworkSites: FC = () => {
  const { sites, complaints, loading, error } = useSites();
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null,
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initialiser les filtres depuis le localStorage
  const [filters, setFilters] = useState<SiteFilters>(() => {
    const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);

    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);

      // Convertir les dates string en objets Date
      return {
        ...parsedFilters,
        incidentStartDate: parsedFilters.incidentStartDate.map(
          (date: string | null) => (date ? dayjs(date) : null),
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
        date ? date.toISOString() : null,
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
      // Filtre par texte de recherche
      if (
        filters.searchText &&
        !site.name.toLowerCase().includes(filters.searchText.toLowerCase())
      ) {
        return false;
      }

      // Filtre par statut
      if (filters.status.length > 0 && !filters.status.includes(site.status)) {
        return false;
      }

      // Filtre par code postal
      if (filters.postalCode && site.postalCode !== filters.postalCode) {
        return false;
      }

      // Filtre par dates
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

  const FilterPanel = () => (
    <Drawer
      anchor="left"
      open={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      sx={filterPanelStyles.filterDrawer}
    >
      <Box sx={filterPanelStyles.filterContainer}>
        <Box sx={filterPanelStyles.filterSection}>
          <Typography sx={filterPanelStyles.filterTitle}>
            Rechercher un site
          </Typography>
          <CSearchbar
            id="site-search"
            value={filters.searchText}
            setValue={(value) =>
              setFilters((prev) => ({ ...prev, searchText: value }))
            }
            onChange={() => {}}
            fullWidth
          />
        </Box>

        <Box sx={filterPanelStyles.filterSection}>
          <Typography sx={filterPanelStyles.filterTitle}>
            Filtrer par statut
          </Typography>
          <CSelect
            labelId="status-filter"
            label="Statut"
            menuItems={[
              { value: 'active', label: 'Actif' },
              { value: 'warning', label: 'Avertissement' },
              { value: 'error', label: 'Erreur' },
            ]}
            value={filters.status}
            setValue={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
            fullWidth
          />
        </Box>

        <Box sx={filterPanelStyles.filterSection}>
          <Typography sx={filterPanelStyles.filterTitle}>
            Code postal
          </Typography>
          <CTextField
            id="postal-code"
            value={filters.postalCode}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, postalCode: e.target.value }))
            }
            placeholder="Ex: 75001"
            fullWidth
          />
        </Box>

        <Box sx={filterPanelStyles.filterSection}>
          <Typography sx={filterPanelStyles.filterTitle}>
            Période d'incident
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DatePicker
                label="Date de début"
                value={filters.incidentStartDate[0]}
                onChange={(newValue) =>
                  setFilters((prev) => ({
                    ...prev,
                    incidentStartDate: [newValue, prev.incidentStartDate[1]],
                  }))
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
              <DatePicker
                label="Date de fin"
                value={filters.incidentStartDate[1]}
                onChange={(newValue) =>
                  setFilters((prev) => ({
                    ...prev,
                    incidentStartDate: [prev.incidentStartDate[0], newValue],
                  }))
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
                minDate={dayjs(filters.incidentStartDate[0])}
              />
            </Box>
          </LocalizationProvider>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={resetFilters}
            startIcon={<RestartAltIcon />}
          >
            Réinitialiser les filtres
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

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
      <IconButton
        onClick={() => setIsFilterOpen(true)}
        sx={filterPanelStyles.filterButton}
      >
        <FilterListIcon />
      </IconButton>

      <FilterPanel />

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
