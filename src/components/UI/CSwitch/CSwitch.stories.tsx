import type { Meta, StoryObj } from '@storybook/react';
import CSwitch from './CSwitch';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';
import { useState } from 'react';

const meta = {
  title: 'UI/Button/CSwitch',
  component: CSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <Box sx={{ padding: 2 }}>
        <CSwitch
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          color="primary"
        />
      </Box>
    );
  },
};

// Story with different colors
export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <CSwitch checked={true} onChange={fn()} color="primary" />
      <CSwitch checked={true} onChange={fn()} color="secondary" />
      <CSwitch checked={true} onChange={fn()} color="success" />
      <CSwitch checked={true} onChange={fn()} color="error" />
      <CSwitch checked={true} onChange={fn()} color="warning" />
      <CSwitch checked={true} onChange={fn()} color="info" />
      <CSwitch checked={true} onChange={fn()} color="default" />
    </Box>
  ),
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    checked: false,
    onChange: fn(),
    disabled: true,
  },
  decorators: Default.decorators,
};

// Story with disabled checked state
export const DisabledChecked: Story = {
  args: {
    checked: true,
    onChange: fn(),
    disabled: true,
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    checked: false,
    onChange: fn(),
    sx: {
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#1ea97c',
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#1ea97c',
      },
    },
  },
  decorators: Default.decorators,
};
