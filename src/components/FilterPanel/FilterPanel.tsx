import { Box, Drawer, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CSearchbar from '../UI/CSearchbar/CSearchbar';
import CSelect from '../UI/CSelect/CSelect';
import CTextField from '../UI/CTextField/CTextField';
import { SiteFilters } from '../../pages/NetworkSites/types';
import dayjs from 'dayjs';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SiteFilters;
  setFilters: (
    // eslint-disable-next-line no-unused-vars
    filters: SiteFilters | ((prev: SiteFilters) => SiteFilters),
  ) => void;
  resetFilters: () => void;
}

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
};

export const FilterPanel = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  resetFilters,
}: FilterPanelProps) => (
  <Drawer
    anchor="left"
    open={isOpen}
    onClose={onClose}
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
        <Typography sx={filterPanelStyles.filterTitle}>Code postal</Typography>
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
          Période d&apos;incident
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
