import type { Meta, StoryObj } from '@storybook/react';
import CMap from './CMap';

const meta: Meta<typeof CMap> = {
  title: 'UI/Maps/CMap',
  component: CMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CMap>;

export const Default: Story = {
  args: {
    center: [48.8566, 2.3522], // Paris coordinates
    zoom: 13,
  },
};

export const ZoomedOut: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 5,
  },
};

export const DifferentLocation: Story = {
  args: {
    center: [40.7128, -74.006], // New York coordinates
    zoom: 12,
  },
};
