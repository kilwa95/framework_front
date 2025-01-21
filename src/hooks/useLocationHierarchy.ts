/* eslint-disable no-unused-vars */
import { useReducer } from 'react';
import {
  locationHierarchyReducer,
  initialState,
} from '../reducers/useLocationHierarchyReducer';

interface Location {
  id: string;
  name: string;
}

interface UseLocationHierarchyProps {
  initialData?: {
    regions: Location[];
    departments: { [key: string]: Location[] };
    cities: { [key: string]: Location[] };
  };
  loadData?: {
    departments?: (regionId: string) => Promise<Location[]>;
    cities?: (departmentId: string) => Promise<Location[]>;
  };
}

export const useLocationHierarchy = ({
  initialData,
  loadData,
}: UseLocationHierarchyProps) => {
  const [state, dispatch] = useReducer(locationHierarchyReducer, {
    ...initialState,
    regions: initialData?.regions || [],
  });

  const handleRegionChange = async (regionId: string) => {
    const region = state.regions.find((r) => r.id === regionId) || null;

    dispatch({ type: 'SELECT_REGION', payload: region });

    if (!region) return;

    dispatch({ type: 'SET_LOADING', resource: 'departments', payload: true });
    try {
      let newDepartments: Location[];
      if (loadData?.departments) {
        newDepartments = await loadData.departments(regionId);
      } else {
        newDepartments = initialData?.departments[regionId] || [];
      }
      dispatch({ type: 'SET_DEPARTMENTS', payload: newDepartments });
    } finally {
      dispatch({
        type: 'SET_LOADING',
        resource: 'departments',
        payload: false,
      });
    }
  };

  const handleDepartmentChange = async (departmentId: string) => {
    const department =
      state.departments.find((d) => d.id === departmentId) || null;

    dispatch({ type: 'SELECT_DEPARTMENT', payload: department });

    if (!department) return;

    dispatch({ type: 'SET_LOADING', resource: 'cities', payload: true });
    try {
      let newCities: Location[];
      if (loadData?.cities) {
        newCities = await loadData.cities(departmentId);
      } else {
        newCities = initialData?.cities[departmentId] || [];
      }
      dispatch({ type: 'SET_CITIES', payload: newCities });
    } finally {
      dispatch({ type: 'SET_LOADING', resource: 'cities', payload: false });
    }
  };

  const handleCityChange = (cityId: string) => {
    const city = state.cities.find((c) => c.id === cityId) || null;

    dispatch({ type: 'SELECT_CITY', payload: city });
  };

  return {
    ...state,
    handleRegionChange,
    handleDepartmentChange,
    handleCityChange,
  };
};
