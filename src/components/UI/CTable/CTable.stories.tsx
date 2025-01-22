import type { Meta, StoryObj } from '@storybook/react';
import CTable from './CTable';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta = {
  title: 'UI/Table/CTable',
  component: CTable,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '600px', padding: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for the stories
const basicData = [
  {
    title: 'Name',
    data: 'John Doe',
  },
  {
    title: 'Age',
    data: '30',
  },
  {
    title: 'Email',
    data: 'john.doe@example.com',
  },
];

const longTextData = [
  {
    title: 'Description',
    data: 'This is a very long text that should be truncated because it exceeds the character limit set in the component. When truncated, it should show an ellipsis and display a tooltip on hover.',
  },
  {
    title: 'Short Text',
    data: 'This is a shorter text.',
  },
];

const booleanData = [
  {
    title: 'Is Active',
    data: true,
  },
  {
    title: 'Is Admin',
    data: false,
  },
];

const arrayData = [
  {
    title: 'Skills',
    data: ['JavaScript', 'React', 'TypeScript'],
  },
  {
    title: 'Languages',
    data: ['English', 'French', 'Spanish'],
  },
];

// Basic story with default data
export const Default: Story = {
  args: {
    data: basicData,
  },
};

// Story with long text that gets truncated
export const WithLongText: Story = {
  args: {
    data: longTextData,
  },
};

// Story with boolean values
export const WithBooleans: Story = {
  args: {
    data: booleanData,
  },
};

// Story with array values
export const WithArrays: Story = {
  args: {
    data: arrayData,
  },
};

// Story with mixed data types
export const MixedTypes: Story = {
  args: {
    data: [...basicData, ...booleanData, ...arrayData],
  },
}; 