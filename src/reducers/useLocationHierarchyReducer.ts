export interface Location {
  id: string;
  name: string;
  code?: string;
}

export interface State {
  regions: Location[];
  departments: Location[];
  cities: Location[];
  selectedRegion: Location | null;
  selectedDepartment: Location | null;
  selectedCity: Location | null;
  isLoading: {
    departments: boolean;
    cities: boolean;
  };
}

export type Action =
  | { type: 'SET_REGIONS'; payload: Location[] }
  | { type: 'SET_DEPARTMENTS'; payload: Location[] }
  | { type: 'SET_CITIES'; payload: Location[] }
  | { type: 'SELECT_REGION'; payload: Location | null }
  | { type: 'SELECT_DEPARTMENT'; payload: Location | null }
  | { type: 'SELECT_CITY'; payload: Location | null }
  | {
      type: 'SET_LOADING';
      resource: 'departments' | 'cities';
      payload: boolean;
    };

export const initialState: State = {
  regions: [],
  departments: [],
  cities: [],
  selectedRegion: null,
  selectedDepartment: null,
  selectedCity: null,
  isLoading: {
    departments: false,
    cities: false,
  },
};

export function locationHierarchyReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_REGIONS':
      return { ...state, regions: action.payload };

    case 'SET_DEPARTMENTS':
      return { ...state, departments: action.payload };

    case 'SET_CITIES':
      return { ...state, cities: action.payload };

    case 'SELECT_REGION':
      return {
        ...state,
        selectedRegion: action.payload,
        selectedDepartment: null,
        selectedCity: null,
        departments: [],
        cities: [],
      };

    case 'SELECT_DEPARTMENT':
      return {
        ...state,
        selectedDepartment: action.payload,
        selectedCity: null,
        cities: [],
      };

    case 'SELECT_CITY':
      return { ...state, selectedCity: action.payload };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.resource]: action.payload,
        },
      };

    default:
      return state;
  }
}
