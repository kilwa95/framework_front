import type { Meta, StoryObj } from '@storybook/react';
import ValidationItem from './ValidationItem';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta = {
  title: 'UI/Validation/ValidationItem',
  component: ValidationItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '300px', padding: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ValidationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with validated state
export const Validated: Story = {
  args: {
    validated: true,
    conditionMessage: 'Minimum 8 caractères.',
  },
};

// Story with non-validated state
export const NotValidated: Story = {
  args: {
    validated: false,
    conditionMessage: 'Minimum une minuscule.',
  },
};

// Story with long message
export const LongMessage: Story = {
  args: {
    validated: true,
    conditionMessage:
      'This is a very long validation message that might need to wrap to multiple lines.',
  },
};

// Story showing multiple validation items
export const MultipleValidationItems: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <ValidationItem
        validated={true}
        conditionMessage="Minimum 8 caractères."
      />
      <ValidationItem
        validated={false}
        conditionMessage="Minimum une minuscule."
      />
      <ValidationItem
        validated={true}
        conditionMessage="Minimum une majuscule."
      />
      <ValidationItem
        validated={false}
        conditionMessage="Minimum un chiffre."
      />
      <ValidationItem
        validated={true}
        conditionMessage="Minimum un caractère spécial."
      />
    </Box>
  ),
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    validated: true,
    conditionMessage: 'Custom styled validation item',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: '300px',
          padding: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
