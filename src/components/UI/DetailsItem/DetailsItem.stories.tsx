import type { Meta, StoryObj } from '@storybook/react';
import DetailsItem from './DetailsItem';
import { Box } from '@mui/material';

const meta = {
  title: 'UI/Data Display/DetailsItem',
  component: DetailsItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DetailsItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default props
export const Default: Story = {
  args: {
    title: 'User Name:',
    data: 'John Doe',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

// Story with number data
export const WithNumber: Story = {
  args: {
    title: 'Age:',
    data: 25,
  },
  decorators: Default.decorators,
};

// Story with long text
export const WithLongText: Story = {
  args: {
    title: 'Description:',
    data: 'This is a very long text that demonstrates how the component handles lengthy content in a single line.',
  },
  decorators: Default.decorators,
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    title: 'Custom Style:',
    data: 'Styled Content',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', padding: 2 }}>
        <div style={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
          <Story />
        </div>
      </Box>
    ),
  ],
};

// Story with multiple items
export const MultipleItems: Story = {
  render: () => (
    <Box sx={{ width: '300px', padding: 2 }}>
      <DetailsItem title="Name:" data="John Doe" />
      <DetailsItem title="Age:" data={25} />
      <DetailsItem title="Email:" data="john.doe@example.com" />
      <DetailsItem title="Location:" data="New York" />
    </Box>
  ),
}; 