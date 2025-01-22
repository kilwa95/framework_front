import type { Meta, StoryObj } from '@storybook/react';
import CLoadingIconButton from './CLoadingIconButton';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI/Icon/CLoadingIconButton',
  component: CLoadingIconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CLoadingIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    icon: <PersonIcon />,
    isLoading: false,
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  decorators: Default.decorators,
};

// Story with success state
export const Success: Story = {
  args: {
    ...Default.args,
    isSuccess: true,
  },
  decorators: Default.decorators,
};

// Story with different colors
export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <CLoadingIconButton
        icon={<PersonIcon />}
        isLoading={false}
        onClick={fn()}
        color="primary"
      />
      <CLoadingIconButton
        icon={<PersonIcon />}
        isLoading={false}
        onClick={fn()}
        color="secondary"
      />
      <CLoadingIconButton
        icon={<PersonIcon />}
        isLoading={false}
        onClick={fn()}
        color="error"
      />
      <CLoadingIconButton
        icon={<PersonIcon />}
        isLoading={false}
        onClick={fn()}
        color="warning"
      />
      <CLoadingIconButton
        icon={<PersonIcon />}
        isLoading={false}
        onClick={fn()}
        color="info"
      />
      <CLoadingIconButton
        icon={<PersonIcon />}
        isLoading={false}
        onClick={fn()}
        color="success"
      />
    </Box>
  ),
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    sx: {
      '& .MuiIconButton-root': {
        backgroundColor: '#f5f5f5',
        '&:hover': {
          backgroundColor: '#e0e0e0',
        },
      },
    },
  },
  decorators: Default.decorators,
};
