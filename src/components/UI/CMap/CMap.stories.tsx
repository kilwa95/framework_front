import type { Meta, StoryObj } from '@storybook/react';
import CMap from './CMap';

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
    markers: [
      {
        position: [48.8566, 2.3522],
        title: 'Tour Eiffel',
        description: 'Monument iconique de Paris, construit en 1889.',
      },
      {
        position: [48.8606, 2.3376],
        title: 'Arc de Triomphe',
        description:
          'Monument historique situé sur la place Charles de Gaulle.',
      },
    ],
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
    markers: [
      {
        position: [48.8566, 2.3522],
        title: 'Tour Eiffel',
        description: 'Monument iconique de Paris, construit en 1889.',
      },
      {
        position: [48.8606, 2.3376],
        title: 'Arc de Triomphe',
        description:
          'Monument historique situé sur la place Charles de Gaulle.',
      },
      {
        position: [48.8656, 2.3412],
        title: 'Parc Monceau',
        description: 'Magnifique parc public du 8ème arrondissement.',
      },

      {
        position: [48.8619, 2.3532],
        title: 'Centre Pompidou',
        description: "Musée national d'art moderne au cœur de Paris.",
      },
    ],
  },
};

export const WithMixedMarkers: Story = {
  args: {
    ...Default.args,
    zoom: 12,
    markers: [
      {
        position: [48.8566, 2.3522],
        title: 'Tour Eiffel',
        description: 'Monument iconique de Paris, construit en 1889.',
        isMobileStation: false,
      },
      {
        position: [48.8606, 2.3376],
        title: 'Station Mobile 1',
        description: 'Station mobile près de l\'Arc de Triomphe',
        isMobileStation: true,
      },
      {
        position: [48.8656, 2.3412],
        title: 'Station Mobile 2',
        description: 'Station mobile à Parc Monceau',
        isMobileStation: true,
      },
      {
        position: [48.8619, 2.3532],
        title: 'Centre Pompidou',
        description: "Musée national d'art moderne au cœur de Paris.",
        isMobileStation: false,
      },
    ],
  },
};
