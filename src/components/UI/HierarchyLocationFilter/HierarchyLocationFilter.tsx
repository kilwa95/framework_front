/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useLocationHierarchy } from '../../../hooks/useLocationHierarchy';
import { LocationSelect } from './LocationSelect/LocationSelect';
import { Box } from '@mui/material';

interface Location {
  id: string;
  coordinates: [number, number];
  name: string;
  data?: Record<string, unknown>;
}

export interface LocationItem {
  id: string;
  name: string;
}

interface HierarchyData {
  regions: LocationItem[];
  departments: Record<string, LocationItem[]>;
  cities: Record<string, LocationItem[]>;
}

interface HierarchyLocationFilterProps {
  onChange: (selection: {
    region: LocationItem | null;
    department: LocationItem | null;
    city: LocationItem | null;
  }) => void;
  initialData?: HierarchyData;
  loadData?: {
    departments?: (regionId: string) => Promise<Location[]>;
    cities?: (departmentId: string) => Promise<Location[]>;
  };
  labels?: {
    region?: string;
    department?: string;
    city?: string;
  };
  placeholders?: {
    region?: string;
    department?: string;
    city?: string;
  };
  className?: string;
}

export const HierarchyLocationFilter = ({
  onChange,
  initialData,
  loadData,
  labels = {
    region: 'Region',
    department: 'Department',
    city: 'City',
  },
  placeholders = {
    region: 'Select a region',
    department: 'Select a department',
    city: 'Select a city',
  },
  className = '',
}: HierarchyLocationFilterProps) => {
  const {
    regions,
    departments,
    cities,
    selectedRegion,
    selectedDepartment,
    selectedCity,
    isLoading,
    handleRegionChange,
    handleDepartmentChange,
    handleCityChange,
  } = useLocationHierarchy({ initialData, loadData });

  useEffect(() => {
    onChange({
      region: selectedRegion,
      department: selectedDepartment,
      city: selectedCity,
    });
  }, [selectedRegion, selectedDepartment, selectedCity, onChange]);

  return (
    <Box
      className={className}
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <LocationSelect
          id="region-select"
          label={labels.region}
          placeholder={placeholders.region}
          options={regions}
          value={selectedRegion?.id}
          onChange={handleRegionChange}
          isDisabled={false}
          isLoading={isLoading.departments}
        />

        <LocationSelect
          id="department-select"
          label={labels.department}
          placeholder={placeholders.department}
          options={departments}
          value={selectedDepartment?.id}
          onChange={handleDepartmentChange}
          isDisabled={!selectedRegion}
          isLoading={isLoading.departments}
        />

        <LocationSelect
          id="city-select"
          label={labels.city}
          placeholder={placeholders.city}
          options={cities}
          value={selectedCity?.id}
          onChange={handleCityChange}
          isDisabled={!selectedDepartment}
          isLoading={isLoading.cities}
        />
      </Box>
    </Box>
  );
};
