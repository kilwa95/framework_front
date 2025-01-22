import type { Meta, StoryObj } from '@storybook/react';
import CInfosTitleWrapper from './CInfosTitleWrapper';
import { Typography } from '@mui/material';

const meta = {
  title: 'UI/Wrapper/CInfosTitleWrapper',
  component: CInfosTitleWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CInfosTitleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    title: 'Default Title',
    children: (
      <Typography>
        This is the default wrapper content with standard styling.
      </Typography>
    ),
  },
};

// Story with big wrapper variant
export const BigWrapper: Story = {
  args: {
    title: 'Big Wrapper Title',
    isBigWrapper: true,
    children: (
      <Typography>
        This wrapper uses a larger title size (h4) for more emphasis.
      </Typography>
    ),
  },
};

// Story with documentation link
export const WithDocumentation: Story = {
  args: {
    title: 'With Documentation',
    documentation: 'https://mui.com/material-ui/react-box/',
    children: (
      <Typography>
        This wrapper includes a documentation link icon that opens in a new tab.
      </Typography>
    ),
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Wrapper',
    sx: {
      '& .MuiBox-root': {
        backgroundColor: '#f5f5f5',
      },
    },
    children: (
      <Typography>
        This wrapper has custom styling applied through the sx prop.
      </Typography>
    ),
  },
};

// Story with all features combined
export const AllFeaturesCombined: Story = {
  args: {
    title: 'All Features Combined',
    isBigWrapper: true,
    documentation: 'https://mui.com/material-ui/react-box/',
    sx: {
      '& .MuiBox-root': {
        backgroundColor: '#f5f5f5',
      },
    },
    children: (
      <Typography>
        This wrapper combines all available features: big wrapper, documentation
        link, and custom styling.
      </Typography>
    ),
  },
};
