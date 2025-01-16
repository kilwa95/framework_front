import type { Meta, StoryObj } from '@storybook/react';
import CMap from './CMap';
import { Marker } from 'react-leaflet';

const meta: Meta<typeof CMap> = {
  title: 'Components/CMap',
  component: CMap,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CMap>;

export const Default: Story = {
  args: {
    center: [48.8566, 2.3522], // Paris coordinates
    zoom: 13,
    height: '500px',
  },
};

export const WithMarkers: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        <Marker position={[48.8566, 2.3522]} />
        <Marker position={[48.8606, 2.3376]} />
      </>
    ),
  },
};

export const Tall: Story = {
  args: {
    ...Default.args,
    height: '800px',
  },
};

export const WithClusteredMarkers: Story = {
  args: {
    ...Default.args,
    zoom: 12,
    children: (
      <>
        <Marker position={[48.8566, 2.3522]} />
        <Marker position={[48.8606, 2.3376]} />
        <Marker position={[48.8656, 2.3412]} />
        <Marker position={[48.8546, 2.3489]} />
        <Marker position={[48.8589, 2.3469]} />
        {/* Add more markers close to each other to test clustering */}
      </>
    ),
  },
};
