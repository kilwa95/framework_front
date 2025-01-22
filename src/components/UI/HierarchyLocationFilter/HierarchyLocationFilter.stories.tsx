import type { Meta, StoryObj } from '@storybook/react';
import { HierarchyLocationFilter } from './HierarchyLocationFilter';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Filters/HierarchyLocationFilter',
  component: HierarchyLocationFilter,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '800px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof HierarchyLocationFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for the stories
const sampleHierarchyData = {
  regions: [
    { id: 'r1', name: 'North Region' },
    { id: 'r2', name: 'South Region' },
    { id: 'r3', name: 'East Region' },
  ],
  departments: {
    r1: [
      { id: 'd1', name: 'Department A' },
      { id: 'd2', name: 'Department B' },
    ],
    r2: [
      { id: 'd3', name: 'Department C' },
      { id: 'd4', name: 'Department D' },
    ],
  },
  cities: {
    d1: [
      { id: 'c1', name: 'City X' },
      { id: 'c2', name: 'City Y' },
    ],
    d2: [
      { id: 'c3', name: 'City Z' },
      { id: 'c4', name: 'City W' },
    ],
  },
};

// Mock load functions
const mockLoadDepartments = async (regionId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return sampleHierarchyData.departments[regionId].map((dept) => ({
    id: dept.id,
    coordinates: [0, 0],
    name: dept.name,
  }));
};

const mockLoadCities = async (departmentId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return sampleHierarchyData.cities[departmentId].map((city) => ({
    id: city.id,
    coordinates: [0, 0],
    name: city.name,
  }));
};

// Basic story with initial data
export const Default: Story = {
  args: {
    onChange: fn(),
    initialData: sampleHierarchyData,
  },
};

// Story with custom labels and placeholders
export const CustomLabels: Story = {
  args: {
    onChange: fn(),
    initialData: sampleHierarchyData,
    labels: {
      region: 'Territory',
      department: 'District',
      city: 'Location',
    },
    placeholders: {
      region: 'Choose a territory',
      department: 'Choose a district',
      city: 'Choose a location',
    },
  },
};

// Story with dynamic loading
export const DynamicLoading: Story = {
  args: {
    onChange: fn(),
    initialData: {
      regions: sampleHierarchyData.regions,
      departments: {},
      cities: {},
    },
    loadData: {
      departments: mockLoadDepartments,
      cities: mockLoadCities,
    },
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    onChange: fn(),
    initialData: sampleHierarchyData,
    className: 'custom-filter',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: '800px',
          padding: 2,
          '& .custom-filter': {
            backgroundColor: '#f5f5f5',
            '& .location-select': {
              backgroundColor: 'white',
            },
          },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

// Story with empty state
export const EmptyState: Story = {
  args: {
    onChange: fn(),
    initialData: {
      regions: [],
      departments: {},
      cities: {},
    },
  },
};

// Story with pre-selected values
export const PreSelected: Story = {
  args: {
    onChange: fn(),
    initialData: {
      ...sampleHierarchyData,
      selectedRegion: sampleHierarchyData.regions[0],
      selectedDepartment: sampleHierarchyData.departments.r1[0],
      selectedCity: sampleHierarchyData.cities.d1[0],
    },
  },
};
