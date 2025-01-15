import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CAccordion from './CAccordion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const meta: Meta<typeof CAccordion> = {
  title: 'UI/Accordion/CAccordion',
  component: CAccordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CAccordion>;

// Exemple de données pour les accordéons
const sampleAccordionItems = [
  {
    id: 1,
    title: 'Section 1',
    content: <div>Contenu de la section 1</div>,
    actions: [
      {
        id: 1,
        label: 'Modifier',
        icon: <EditIcon />,
        onClick: () => console.log('Modifier section 1'),
      },
      {
        id: 2,
        label: 'Supprimer',
        icon: <DeleteIcon />,
        onClick: () => console.log('Supprimer section 1'),
      },
    ],
  },
  {
    id: 2,
    title: 'Section 2',
    content: <div>Contenu de la section 2</div>,
    actions: [
      {
        id: 1,
        label: 'Cliquez ici',
        onClick: () => console.log('Action texte cliquée'),
      },
    ],
  },
];

export const Default: Story = {
  args: {
    accordionsItems: sampleAccordionItems,
  },
};

export const WithDefaultExpanded: Story = {
  args: {
    accordionsItems: sampleAccordionItems,
    defaultExpanded: 1,
  },
};

export const CustomStyling: Story = {
  args: {
    accordionsItems: sampleAccordionItems,
    sx: {
      maxWidth: 500,
      margin: '0 auto',
      '& .MuiAccordion-root': {
        margin: '8px 0',
      },
    },
  },
};
