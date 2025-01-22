import type { Meta, StoryObj } from '@storybook/react';
import CAccordionTitleWrapper from './CAccordionTitleWrapper';
import { Typography } from '@mui/material';

const meta = {
  title: 'UI/Accordion/CAccordionTitleWrapper',
  component: CAccordionTitleWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CAccordionTitleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    title: 'Default Accordion',
    children: (
      <Typography>
        This is the default accordion content with standard styling.
      </Typography>
    ),
  },
};

// Story showing expanded state
export const DefaultExpanded: Story = {
  args: {
    title: 'Pre-expanded Accordion',
    defaultExpanded: true,
    children: (
      <Typography>
        This accordion is expanded by default when it first renders.
      </Typography>
    ),
  },
};

// Story showing big wrapper variant
export const BigWrapper: Story = {
  args: {
    title: 'Big Wrapper Accordion',
    isBigWrapper: true,
    children: (
      <Typography>
        This accordion uses a larger title size for more emphasis.
      </Typography>
    ),
  },
};

// Story showing colored title
export const ColoredTitle: Story = {
  args: {
    title: 'Colored Title Accordion',
    coloredTitle: true,
    children: (
      <Typography>
        This accordion has a colored title using the primary theme color.
      </Typography>
    ),
  },
};

// Story showing custom styling
export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Accordion',
    sx: {
      maxWidth: 500,
      margin: '0 auto',
      '& .MuiAccordionDetails-root': {
        backgroundColor: '#f5f5f5',
      },
    },
    children: (
      <Typography>
        This accordion has custom styling applied through the sx prop.
      </Typography>
    ),
  },
};

// Story showing all features combined
export const AllFeaturesCombined: Story = {
  args: {
    title: 'All Features Accordion',
    defaultExpanded: true,
    isBigWrapper: true,
    coloredTitle: true,
    sx: {
      maxWidth: 600,
      '& .MuiAccordionDetails-root': {
        backgroundColor: '#f5f5f5',
      },
    },
    children: (
      <Typography>
        This accordion combines all available features: default expanded state,
        big wrapper, colored title, and custom styling.
      </Typography>
    ),
  },
};
