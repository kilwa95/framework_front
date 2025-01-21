import type { Meta, StoryObj } from '@storybook/react';
import { EligibilityFilter } from './EligibilityFilter';

const meta = {
  title: 'UI/Filter/EligibilityFilter',
  component: EligibilityFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EligibilityFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: (selections) => console.log('Selections changed:', selections),
  },
};

export const WithInitialValues: Story = {
  args: {
    onChange: (selections) => console.log('Selections changed:', selections),
    initialValues: {
      can_subscribe: true,
      is_ztd: true,
      found_coverage: false,
      sector_capacity: true,
      active_4g: false,
      active_5g: true,
    },
  },
};

export const DarkMode: Story = {
  args: {
    onChange: (selections) => console.log('Selections changed:', selections),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <div className="dark" style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomClassName: Story = {
  args: {
    onChange: (selections) => console.log('Selections changed:', selections),
    className: 'custom-class',
  },
};
