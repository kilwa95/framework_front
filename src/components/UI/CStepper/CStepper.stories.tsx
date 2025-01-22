import type { Meta, StoryObj } from '@storybook/react';
import CStepper from './CStepper';
import { Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { CStepsProps } from '../types';

const meta = {
  title: 'UI/Navigation/CStepper',
  component: CStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample steps data
const basicSteps: CStepsProps[] = [
  {
    id: 1,
    active: false,
    completed: true,
  },
  {
    id: 2,
    active: true,
    completed: false,
  },
  {
    id: 3,
    active: false,
    completed: false,
  },
];

const stepsWithLabels: CStepsProps[] = [
  {
    id: 1,
    label: 'Step 1',
    active: false,
    completed: true,
  },
  {
    id: 2,
    label: 'Step 2',
    active: true,
    completed: false,
  },
  {
    id: 3,
    label: 'Step 3',
    active: false,
    completed: false,
  },
];

const stepsWithIcons: CStepsProps[] = [
  {
    id: 1,
    active: false,
    completed: true,
    icon: <AccessibilityIcon />,
  },
  {
    id: 2,
    active: true,
    completed: false,
    icon: <GroupAddIcon />,
  },
  {
    id: 3,
    active: false,
    completed: false,
    icon: <SettingsIcon />,
  },
];

// Basic story with default props
export const Default: Story = {
  args: {
    steps: basicSteps,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '600px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with labels
export const WithLabels: Story = {
  args: {
    steps: stepsWithLabels,
  },
  decorators: Default.decorators,
};

// Story with icons
export const WithIcons: Story = {
  args: {
    steps: stepsWithIcons,
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    steps: stepsWithLabels,
    sx: {
      '& .MuiStepLabel-root': {
        color: 'primary.main',
      },
      '& .MuiStepConnector-line': {
        borderColor: 'secondary.main',
      },
    },
  },
  decorators: Default.decorators,
};