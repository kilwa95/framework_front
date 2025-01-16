import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';
import { Box, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GridCellParams } from '@mui/x-data-grid';
import CStatusPill from '../CStatusPill/CStatusPill';

const theme = createTheme();

const meta = {
  title: 'UI/Table/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '900px', padding: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Smith',
    age: 40,
    jobTitle: 'Developer',
    status: true,
  },
  {
    id: 2,
    firstname: 'Mary',
    lastname: 'Johnson',
    age: 35,
    jobTitle: 'Designer',
    status: false,
  },
  {
    id: 3,
    firstname: 'James',
    lastname: 'Williams',
    age: 45,
    jobTitle: 'Manager',
    status: true,
  },
];

// Basic columns configuration
const basicColumns = [
  {
    field: 'firstname',
    headerName: 'First Name',
    type: 'string',
    flex: 1,
  },
  {
    field: 'lastname',
    headerName: 'Last Name',
    type: 'string',
    flex: 1,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    flex: 1,
  },
  {
    field: 'jobTitle',
    headerName: 'Job Title',
    type: 'string',
    flex: 1,
  },
];

// Columns with custom rendering
const customColumns = [
  ...basicColumns,
  {
    field: 'status',
    headerName: 'Status',
    type: 'boolean',
    flex: 1,
    renderCell: (params: GridCellParams) => (
      <CStatusPill severity={params.row.status ? 'success' : 'error'}>
        {params.row.status ? 'Active' : 'Inactive'}
      </CStatusPill>
    ),
  },
];

// Basic story
export const Default: Story = {
  args: {
    columns: basicColumns,
    rows: sampleData,
  },
};

// Story with custom rendering
export const WithCustomRendering: Story = {
  args: {
    columns: customColumns,
    rows: sampleData,
  },
};

// Story with loading state
export const Loading: Story = {
  args: {
    columns: basicColumns,
    rows: sampleData,
    loading: true,
  },
};

// Story with title
export const WithTitle: Story = {
  args: {
    columns: basicColumns,
    rows: sampleData,
    title: 'Employee List',
  },
};

// Story with pagination
export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    rows: [...sampleData, ...sampleData, ...sampleData], // Duplicate data for pagination
    pageSize: 5,
    rowsPerPageOptions: [5, 10, 15],
  },
};

// Story with selection
export const WithSelection: Story = {
  args: {
    columns: basicColumns,
    rows: sampleData,
    hasCheckboxSelection: true,
    isRowSelectable: () => true,
  },
};

// Story without toolbar options
export const WithoutToolbarOptions: Story = {
  args: {
    columns: basicColumns,
    rows: sampleData,
    hasExport: false,
    hasFilter: false,
  },
};

// Story with custom toolbar
export const WithCustomToolbar: Story = {
  args: {
    columns: basicColumns,
    rows: sampleData,
    toolbarButtons: (
      <>
        <Button color="primary" variant="contained">
          Add New
        </Button>
        <Button color="secondary" variant="outlined">
          Archive
        </Button>
      </>
    ),
  },
};

// Story with no data
export const NoData: Story = {
  args: {
    columns: basicColumns,
    rows: [],
  },
};
